import { render, screen, fireEvent } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'
import Button from './Button'

describe('Button Component', () => {
  test('renders button with correct value', () => {
    render(<Button value="5" />)
    const button = screen.getByText('5')
    expect(button).toBeInTheDocument()
  })

  test('applies correct class based on type', () => {
    render(<Button value="+" type="operation" />)
    const button = screen.getByText('+')
    expect(button).toHaveClass('calculator-button operation')
  })

  test('calls onClick handler with correct value', () => {
    const onClick = vi.fn()
    render(<Button value="3" onClick={onClick} />)
    const button = screen.getByText('3')
    fireEvent.click(button)
    expect(onClick).toHaveBeenCalledWith('3')
  })
})