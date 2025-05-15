import { useState, useCallback, useEffect } from 'react'

const useCalculator = () => {
  const [display, setDisplay] = useState('0')
  const [storedValue, setStoredValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const handleNumber = useCallback((number) => {
    if (display === 'ERROR') {
      setDisplay(number)
      setWaitingForOperand(false)
      return
    }

    if (waitingForOperand) {
      setDisplay(number)
      setWaitingForOperand(false)
    } else {
      const newDisplay = display === '0' ? number : display + number
      if (newDisplay.replace('-', '').length <= 9) {
        setDisplay(newDisplay)
      }
    }
  }, [display, waitingForOperand])

  const handleDecimal = useCallback(() => {
    if (waitingForOperand) {
      setDisplay('0.')
      setWaitingForOperand(false)
      return
    }

    if (!display.includes('.')) {
      const newDisplay = display + '.'
      if (newDisplay.replace('-', '').length <= 9) {
        setDisplay(newDisplay)
      }
    }
  }, [display, waitingForOperand])

  const handleClear = useCallback(() => {
    setDisplay('0')
    setStoredValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }, [])

  const handleToggleSign = useCallback(() => {
    if (display === '0' || display === 'ERROR') return
    
    if (display.startsWith('-')) {
      const newValue = display.substring(1)
      setDisplay(newValue)
    } else {
      if (display.length < 9) {
        setDisplay('-' + display)
      }
    }
  }, [display])

  const handleBackspace = useCallback(() => {
    if (display === 'ERROR') {
      setDisplay('0')
      return
    }
    
    if (display.length === 1 || (display.length === 2 && display.startsWith('-'))) {
      setDisplay('0')
    } else {
      setDisplay(display.slice(0, -1))
    }
  }, [display])

  const calculateResult = useCallback((a, b, op) => {
    let result
    switch (op) {
      case '+': result = a + b; break
      case '-': result = a - b; break
      case '*': result = a * b; break
      case '/': 
        if (b === 0) return null
        result = a / b
        const resultStr = result.toString()
        const [intPart, decPart] = resultStr.split('.')
        if (decPart) {
          const maxDecLength = 8 - intPart.length
          result = parseFloat(intPart + '.' + decPart.slice(0, maxDecLength))
        }
        return result
      case '%': return b === 0 ? null : a % b
      default: return b
    }
    return result
  }, [])

  const handleOperation = useCallback((op) => {
    if (display === 'ERROR' && op !== 'AC') return

    const inputValue = parseFloat(display)

    if (op === 'AC') {
      handleClear()
      return
    }

    if (op === '+/-') {
      handleToggleSign()
      return
    }

    if (storedValue === null) {
      setStoredValue(inputValue)
    } else if (operation) {
      const result = calculateResult(storedValue, inputValue, operation)
      
      if (result === null || result < 0 || result > 999999999) {
        setDisplay('ERROR')
      } else {
        const resultStr = result.toString()
        if (resultStr.length > 9) {
          if (resultStr.includes('.')) {
            const [intPart, decPart] = resultStr.split('.')
            const maxDecLength = 8 - intPart.length
            setDisplay(intPart + '.' + decPart.slice(0, maxDecLength))
          } else {
            setDisplay('ERROR')
          }
        } else {
          setDisplay(resultStr)
        }
        setStoredValue(result)
      }
    }

    setWaitingForOperand(true)
    setOperation(op === '=' ? null : op)
  }, [display, operation, storedValue, handleClear, handleToggleSign, calculateResult])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (/[0-9]/.test(e.key)) {
        handleNumber(e.key)
      } else if (e.key === '.') {
        handleDecimal()
      } else if (['+', '-', '*', '/', '%'].includes(e.key)) {
        handleOperation(e.key)
      } else if (e.key === 'Enter') {
        handleOperation('=')
      } else if (e.key === 'Backspace') {
        handleBackspace()
      } else if (e.key === 'Escape') {
        handleClear()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleNumber, handleDecimal, handleOperation, handleBackspace, handleClear])

  return {
    display,
    handleNumber,
    handleOperation,
    handleBackspace,
    handleClear,
    handleToggleSign,
    handleDecimal
  }
}

export default useCalculator