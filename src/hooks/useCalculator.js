import { useState } from 'react'

const useCalculator = () => {
  const [display, setDisplay] = useState('0')
  const [operation, setOperation] = useState(null)
  const [previousValue, setPreviousValue] = useState(null)
  const [newNumber, setNewNumber] = useState(true)

  const handleNumber = (num) => {
    if (display.length >= 9) return
    if (newNumber) {
      setDisplay(num)
      setNewNumber(false)
    } else {
      setDisplay(display + num)
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
            setDisplay('Error')
            setNewNumber(true)
            return
          }
          result = prev / current
          break
        default:
          return
      }

      setDisplay(result.toString().slice(0, 9))
      setOperation(null)
      setPreviousValue(null)
      setNewNumber(true)
      return
    }

    setOperation(op)
    setPreviousValue(display)
    setNewNumber(true)
  }

  return {
    display,
    handleNumber,
    handleOperation
  }
}

export default useCalculator