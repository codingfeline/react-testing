import { render, screen } from '@testing-library/react'
import OrderStatusSelector from '../../src/components/OrderStatusSelector'
import { Theme } from '@radix-ui/themes'
import userEvent from '@testing-library/user-event'

describe('OrderStatusSelector', () => {
  const renderComponent = () => {
    render(
      <Theme>
        <OrderStatusSelector onChange={vi.fn()} />
      </Theme>
    )
    // vi.fn is a mock function
    // ? OrderStausSelecor uses RadixUI
    // ? Error: `useThemeContext` must be used within a `Theme`

    return {
      trigger: screen.getByRole('combobox'),
    }
  }

  it('should render New as the default value', () => {
    const { trigger } = renderComponent()

    // ? ReferenceError: ResizeObserver is not defined - a browser API that is not available in Node environment and JSDOM doesn't provide this at this minute. package needed is resize-observer-polyfill and configured in setup.ts

    expect(trigger).toHaveTextContent(/new/i)
  })

  it('should render correct statuses', async () => {
    render(
      <Theme>
        <OrderStatusSelector onChange={vi.fn()} />
      </Theme>
    )

    const button = screen.getByRole('combobox')
    const user = userEvent.setup()
    await user.click(button)

    const options = await screen.findAllByRole('option')
    expect(options).toHaveLength(3)
    const labels = options.map(option => option.textContent)
    expect(labels).toEqual(['New', 'Processed', 'Fulfilled'])
  })
})

// ? [TypeError: target.hasPointerCapture is not a function
