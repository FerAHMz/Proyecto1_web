import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import Display from './Display'

describe('Display Component', () => {
  test('renders the display with the correct value', () => {
    render(<Display value="123" />)
    const display = screen.getByTestId('calculator-display')
    expect(display).toHaveTextContent('123')
  })

  test('renders empty by default', () => {
    render(<Display value="" />)
    const display = screen.getByTestId('calculator-display')
    expect(display).toHaveTextContent('')
  })

  test('handles long numbers', () => {
    render(<Display value="123456789" />)
    const display = screen.getByTestId('calculator-display')
    expect(display).toHaveTextContent('123456789')
  })
})