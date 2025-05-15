import useCalculator from './useCalculator'

export default {
  title: 'Hooks/useCalculator',
  component: () => {
    const calculator = useCalculator()
    return (
      <div style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h3>Estado Actual:</h3>
        <pre>Display: {calculator.display}</pre>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
          <button onClick={() => calculator.handleNumber('7')}>7</button>
          <button onClick={() => calculator.handleNumber('8')}>8</button>
          <button onClick={() => calculator.handleNumber('9')}>9</button>
          <button onClick={() => calculator.handleOperation('/')}>÷</button>
          
          <button onClick={() => calculator.handleNumber('4')}>4</button>
          <button onClick={() => calculator.handleNumber('5')}>5</button>
          <button onClick={() => calculator.handleNumber('6')}>6</button>
          <button onClick={() => calculator.handleOperation('*')}>×</button>
          
          <button onClick={() => calculator.handleNumber('1')}>1</button>
          <button onClick={() => calculator.handleNumber('2')}>2</button>
          <button onClick={() => calculator.handleNumber('3')}>3</button>
          <button onClick={() => calculator.handleOperation('-')}>-</button>
          
          <button onClick={() => calculator.handleNumber('0')}>0</button>
          <button onClick={() => calculator.handleDecimal()}>.</button>
          <button onClick={() => calculator.handleOperation('=')}>=</button>
          <button onClick={() => calculator.handleOperation('+')}>+</button>
          
          <button onClick={() => calculator.handleClear()}>AC</button>
          <button onClick={() => calculator.handleToggleSign()}>+/-</button>
          <button onClick={() => calculator.handleOperation('%')}>%</button>
          <button onClick={() => calculator.handleBackspace()}>⌫</button>
        </div>
      </div>
    )
  }
}

export const Default = {}
