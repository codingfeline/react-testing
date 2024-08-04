import { render, screen } from '@testing-library/react'
import OrderStatusSelector from '../../src/components/OrderStatusSelector'
import { Theme } from '@radix-ui/themes'
import userEvent from '@testing-library/user-event'

describe('OrderStatusSelector', () => {
  const renderComponent = () => {
    const onChange = vi.fn()
    render(
      <Theme>
        <OrderStatusSelector onChange={onChange} />
      </Theme>
    )
    // vi.fn is a mock function
    // ? OrderStausSelecor uses RadixUI
    // ? Error: `useThemeContext` must be used within a `Theme`

    return {
      trigger: screen.getByRole('combobox'),
      getOptions: () => screen.findAllByRole('option'),
      user: userEvent.setup(),
      onChange,
      getOption: (label: RegExp) => screen.findByRole('option', { name: label }),
    }
  }

  it('should render New as the default value', () => {
    const { trigger } = renderComponent()

    // ? ReferenceError: ResizeObserver is not defined - a browser API that is not available in Node environment and JSDOM doesn't provide this at this minute. package needed is resize-observer-polyfill and configured in setup.ts

    expect(trigger).toHaveTextContent(/new/i)
  })

  it('should render correct statuses', async () => {
    const { trigger, getOptions, user } = renderComponent()

    await user.click(trigger)

    const options = await getOptions()
    expect(options).toHaveLength(3)
    const labels = options.map(option => option.textContent)
    expect(labels).toEqual(['New', 'Processed', 'Fulfilled'])
  })
  // ? [TypeError: target.hasPointerCapture is not a function

  it.each([
    { label: /processed/i, value: 'processed' },
    { label: /fulfilled/i, value: 'fulfilled' },
  ])(
    'should call onChange with $value when the $label option is clicked',
    async ({ label, value }) => {
      const { trigger, user, onChange, getOption } = renderComponent()
      await user.click(trigger)

      const option = await getOption(label)
      await user.click(option)

      expect(onChange).toHaveBeenCalledWith(value)
    }
  )

  it("should call onChange with 'new' when the New option is clicked", async () => {
    const { trigger, user, onChange, getOption } = renderComponent()
    await user.click(trigger)

    const processedOption = await getOption(/processed/i)
    await user.click(processedOption)

    await user.click(trigger)
    const newOption = await getOption(/new/i)
    await user.click(newOption)

    expect(onChange).toHaveBeenCalledWith('new')
  })
})
