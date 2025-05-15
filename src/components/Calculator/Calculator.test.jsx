import { render, screen, fireEvent } from '@testing-library/react'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import Calculator from './Calculator'
import useCalculator from '../../hooks/useCalculator'

vi.mock('../../hooks/useCalculator')

describe('Calculator Component', () => {
  beforeEach(() => {
    useCalculator.mockReturnValue({
      display: '0',
      handleNumber: vi.fn(),
      handleOperation: vi.fn(),
      handleBackspace: vi.fn()
    })
  })

  test('renders all buttons', () => {
    render(<Calculator />)
    expect(screen.getByText('AC')).toBeInTheDocument()
    expect(screen.getByText('7')).toBeInTheDocument()
    expect(screen.getByText('+')).toBeInTheDocument()
    expect(screen.getByText('=')).toBeInTheDocument()
  })

  test('calls handleNumber when number button is clicked', () => {
    const mockHandleNumber = vi.fn()
    useCalculator.mockReturnValue({
      display: '0',
      handleNumber: mockHandleNumber,
      handleOperation: vi.fn(),
      handleBackspace: vi.fn()
    })

    render(<Calculator />)
    fireEvent.click(screen.getByText('5'))
    expect(mockHandleNumber).toHaveBeenCalledWith('5')
  })

  test('calls handleOperation when operation button is clicked', () => {
    const mockHandleOperation = vi.fn()
    useCalculator.mockReturnValue({
      display: '0',
      handleNumber: vi.fn(),
      handleOperation: mockHandleOperation,
      handleBackspace: vi.fn()
    })

    render(<Calculator />)
    fireEvent.click(screen.getByText('+'))
    expect(mockHandleOperation).toHaveBeenCalledWith('+')
  })
})