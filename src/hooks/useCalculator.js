import { useState, useEffect } from 'react'

const useCalculator = () => {
  const [display, setDisplay] = useState('0')
  const [operation, setOperation] = useState(null)
  const [previousValue, setPreviousValue] = useState(null)
  const [newNumber, setNewNumber] = useState(true)

  const validateResult = (result) => {
    const resultStr = result.toString()
    if (resultStr.startsWith('-')) {
      if (resultStr.length > 9) return 'ERROR'
      return resultStr.slice(0, 9)
    }
    if (result < 0) return 'ERROR'
    if (result > 999999999) return 'ERROR'
    return resultStr.slice(0, 9)
  }

  const handleNumber = (num) => {
    if (display === 'ERROR') {
      setDisplay(num)
      return
    }
    
    if (num === '.' && display.includes('.')) return
    if (display.length >= 9) return
    
    if (newNumber) {
      setDisplay(num === '.' ? '0.' : num)
      setNewNumber(false)
    } else {
      setDisplay(display + num)
    }
  }

  const toggleSign = () => {
    if (display === '0' || display === 'ERROR') return
    if (display.startsWith('-')) {
      setDisplay(display.slice(1))
    } else {
      if (display.length >= 8) return
      setDisplay('-' + display)
    }
  }

  const handleOperation = (op) => {
    if (op === 'C') {
      setDisplay('0')
      setOperation(null)
      setPreviousValue(null)
      setNewNumber(true)
      return
    }

    if (op === '+/-') {
      toggleSign()
      return
    }

    if (op === '=') {
      if (!operation || !previousValue) return
      
      const prev = parseFloat(previousValue)
      const current = parseFloat(display)
      let result = 0

      switch (operation) {
        case '+':
          result = prev + current
          break
        case '-':
          result = prev - current
          break
        case '*':
          result = prev * current
          break
        case '/':
          if (current === 0) {
            setDisplay('ERROR')
            setNewNumber(true)
            return
          }
          result = prev / current
          break
        case '%':
          if (current === 0) {
            setDisplay('ERROR')
            setNewNumber(true)
            return
          }
          result = prev % current
          break
        default:
          return
      }

      setDisplay(validateResult(result))
      setOperation(null)
      setPreviousValue(null)
      setNewNumber(true)
      return
    }

    setOperation(op)
    setPreviousValue(display)
    setNewNumber(true)
  }

  const handleBackspace = () => {
    if (display === 'ERROR' || display === '0' || newNumber) return
    if (display.length === 1) {
      setDisplay('0')
      setNewNumber(true)
    } else {
      setDisplay(display.slice(0, -1))
    }
  }

  useEffect(() => {
    const handleKeyPress = (event) => {
      const { key } = event
      
      if (/[0-9]/.test(key)) {
        handleNumber(key)
      }
      
      if (['+', '-', '*', '/'].includes(key)) {
        handleOperation(key)
      }
      
      if (key === 'Enter') {
        handleOperation('=')
      }
      
      if (key === 'Escape' || key === 'Delete') {
        handleOperation('C')
      }

      if (key === 'Backspace') {
        handleBackspace()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [display, operation, previousValue])

  return {
    display,
    handleNumber,
    handleOperation,
    handleBackspace
  }
}

export default useCalculator