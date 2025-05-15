import { renderHook, act } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import useCalculator from './useCalculator'

describe('useCalculator Hook', () => {
  test('initializes with display 0', () => {
    const { result } = renderHook(() => useCalculator())
    expect(result.current.display).toBe('0')
  })

  test('handles number input correctly', () => {
    const { result } = renderHook(() => useCalculator())
    
    act(() => result.current.handleNumber('5'))
    expect(result.current.display).toBe('5')
    
    act(() => result.current.handleNumber('3'))
    expect(result.current.display).toBe('53')
  })

  test('limits input to 9 digits', () => {
    const { result } = renderHook(() => useCalculator())

    const numbers = ['1','2','3','4','5','6','7','8','9','0']
    for (const num of numbers) {
      act(() => result.current.handleNumber(num))
    }
    
    expect(result.current.display).toBe('123456789')
  })

  test('handles decimal point correctly', () => {
    const { result } = renderHook(() => useCalculator())
    
    act(() => result.current.handleNumber('5'))
    act(() => result.current.handleDecimal())
    act(() => result.current.handleNumber('3'))
    
    expect(result.current.display).toBe('5.3')
    
    act(() => result.current.handleDecimal())
    expect(result.current.display).toBe('5.3')
  })

  test('performs addition correctly', () => {
    const { result } = renderHook(() => useCalculator())
    
    act(() => result.current.handleNumber('5'))
    act(() => result.current.handleOperation('+'))
    act(() => result.current.handleNumber('3'))
    act(() => result.current.handleOperation('='))
    
    expect(result.current.display).toBe('8')
  })

  test('performs subtraction correctly', () => {
    const { result } = renderHook(() => useCalculator())
    
    act(() => result.current.handleNumber('5'))
    act(() => result.current.handleOperation('-'))
    act(() => result.current.handleNumber('3'))
    act(() => result.current.handleOperation('='))
    
    expect(result.current.display).toBe('2')
  })

  test('performs multiplication correctly', () => {
    const { result } = renderHook(() => useCalculator())
    
    act(() => result.current.handleNumber('5'))
    act(() => result.current.handleOperation('*'))
    act(() => result.current.handleNumber('3'))
    act(() => result.current.handleOperation('='))
    
    expect(result.current.display).toBe('15')
  })

  test('performs division correctly', () => {
    const { result } = renderHook(() => useCalculator())
    
    act(() => result.current.handleNumber('6'))
    act(() => result.current.handleOperation('/'))
    act(() => result.current.handleNumber('3'))
    act(() => result.current.handleOperation('='))
    
    expect(result.current.display).toBe('2')
  })

  test('handles division by zero', () => {
    const { result } = renderHook(() => useCalculator())
    
    act(() => result.current.handleNumber('5'))
    act(() => result.current.handleOperation('/'))
    act(() => result.current.handleNumber('0'))
    act(() => result.current.handleOperation('='))
    
    expect(result.current.display).toBe('ERROR')
  })

  test('handles percentage operation correctly', () => {
    const { result } = renderHook(() => useCalculator())
    
    act(() => result.current.handleNumber('1'))
    act(() => result.current.handleNumber('0'))
    act(() => result.current.handleOperation('%'))
    act(() => result.current.handleNumber('3'))
    act(() => result.current.handleOperation('='))
    
    expect(result.current.display).toBe('1')
  })

  test('clears display with AC', () => {
    const { result } = renderHook(() => useCalculator())
    
    act(() => result.current.handleNumber('5'))
    act(() => result.current.handleOperation('+'))
    act(() => result.current.handleNumber('3'))
    act(() => result.current.handleOperation('AC'))
    
    expect(result.current.display).toBe('0')
  })

  test('toggles sign with +/-', () => {
    const { result } = renderHook(() => useCalculator())
    
    act(() => result.current.handleNumber('5'))
    act(() => result.current.handleOperation('+/-'))
    
    expect(result.current.display).toBe('-5')
    
    act(() => result.current.handleOperation('+/-'))
    
    expect(result.current.display).toBe('5')
  })

  test('handles backspace correctly', () => {
    const { result } = renderHook(() => useCalculator())
    
    act(() => result.current.handleNumber('5'))
    act(() => result.current.handleNumber('3'))
    act(() => result.current.handleBackspace())
    
    expect(result.current.display).toBe('5')
    
    act(() => result.current.handleBackspace())
    
    expect(result.current.display).toBe('0')
  })

  test('validates result to 9 digits', () => {
    const { result } = renderHook(() => useCalculator())

    for (const num of ['9','9','9','9','9','9','9','9','9']) {
      act(() => result.current.handleNumber(num))
    }
    
    act(() => result.current.handleOperation('*'))
    act(() => result.current.handleNumber('9'))
    act(() => result.current.handleNumber('9'))
    act(() => result.current.handleOperation('='))
    
    expect(result.current.display).toBe('ERROR')
  })

  test('handles negative results correctly', () => {
    const { result } = renderHook(() => useCalculator())
    
    act(() => result.current.handleNumber('5'))
    act(() => result.current.handleOperation('-'))
    act(() => result.current.handleNumber('1'))
    act(() => result.current.handleNumber('0'))
    act(() => result.current.handleOperation('='))
    
    expect(result.current.display).toBe('ERROR')
  })

  test('resets after ERROR', () => {
    const { result } = renderHook(() => useCalculator())
    
    act(() => result.current.handleNumber('5'))
    act(() => result.current.handleOperation('/'))
    act(() => result.current.handleNumber('0'))
    act(() => result.current.handleOperation('='))
    
    expect(result.current.display).toBe('ERROR')
    
    act(() => result.current.handleNumber('3'))
    
    expect(result.current.display).toBe('3')
  })

  test('handles keyboard input', async () => {
    const { result } = renderHook(() => useCalculator())
  
    await act(async () => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: '5' }))
    })
    await act(async () => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: '+' }))
    })
    await act(async () => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: '3' }))
    })
    await act(async () => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
    })
  
    expect(result.current.display).toBe('8')
  })  
})
