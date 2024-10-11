import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from './Button'

describe('Button', () => {
  it('renders with default text', () => {
    render(<Button />)
    expect(screen.getByText('Save changes')).toBeInTheDocument()
  })

  it('applies the correct CSS classes', () => {
    render(<Button />)
    const button = screen.getByRole('button')
    expect(button).toHaveClass(
      'inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10'
    )
  })

  it('can be clicked', async () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick} />)
    const button = screen.getByRole('button')
    await userEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('changes style on hover', async () => {
    render(<Button />)
    const button = screen.getByRole('button')
    await userEvent.hover(button)
    expect(button).toHaveClass('data-[hover]:bg-gray-600')
  })

  it('changes style on focus', () => {
    render(<Button />)
    const button = screen.getByRole('button')
    button.focus()
    expect(button).toHaveClass(
      'data-[focus]:outline-1 data-[focus]:outline-white'
    )
  })
})
