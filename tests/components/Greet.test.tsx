import { render, screen } from '@testing-library/react'
import Greet from '../../src/components/Greet'

describe('Greet', () => {
  it('should render Hello with the name when the name is provided', () => {
    render(<Greet name="Naz" />)

    const heading = screen.getByRole('heading')
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent(/naz/i)
  })
  it('should render the login button when name is not provided', () => {
    render(<Greet />)

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent(/login/i)
  })
})
