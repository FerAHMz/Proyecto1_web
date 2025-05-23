import useCalculator from '../../hooks/useCalculator'
import Display from '../Display/Display'
import Button from '../Button/Button'
import './Calculator.css'

const Calculator = () => {
  const {
    display,
    handleNumber,
    handleOperation,
    handleBackspace,
    handleClear,
    handleToggleSign,
    handleDecimal
  } = useCalculator()

  return (
    <div className="calculator" role="application" aria-label="Calculator">
      <Display value={display} />
      <div className="calculator-buttons">
        <Button value="AC" onClick={handleClear} type="function" />
        <Button value="+/-" onClick={handleToggleSign} type="function" />
        <Button value="%" onClick={() => handleOperation('%')} type="function" />
        <Button value="⌫" onClick={handleBackspace} type="function" />
        
        <Button value="7" onClick={handleNumber} />
        <Button value="8" onClick={handleNumber} />
        <Button value="9" onClick={handleNumber} />
        <Button value="÷" onClick={() => handleOperation('/')} type="operation" />
        
        <Button value="4" onClick={handleNumber} />
        <Button value="5" onClick={handleNumber} />
        <Button value="6" onClick={handleNumber} />
        <Button value="×" onClick={() => handleOperation('*')} type="operation" />
        
        <Button value="1" onClick={handleNumber} />
        <Button value="2" onClick={handleNumber} />
        <Button value="3" onClick={handleNumber} />
        <Button value="-" onClick={() => handleOperation('-')} type="operation" />
        
        <Button value="0" onClick={handleNumber} className="span-2" />
        <Button value="." onClick={handleDecimal} />
        <Button value="=" onClick={() => handleOperation('=')} type="operation" />
        <Button value="+" onClick={() => handleOperation('+')} type="operation" />
      </div>
    </div>
  )
}

export default Calculator