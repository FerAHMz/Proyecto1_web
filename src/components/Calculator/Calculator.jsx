import useCalculator from '../../hooks/useCalculator'
import Display from '../Display/Display'
import Button from '../Button/Button'
import './Calculator.css'

const Calculator = () => {
  const { display, handleNumber, handleOperation, handleBackspace } = useCalculator()

  return (
    <div className="calculator">
      <Display value={display} />
      <div className="calculator-buttons">
        <Button value="AC" onClick={handleOperation} type="operation" />
        <Button value="+/-" onClick={handleOperation} type="operation" />
        <Button value="%" onClick={handleOperation} type="operation" />
        <Button value="⌫" onClick={handleBackspace} type="operation" />
        
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
        <Button value="-" onClick={handleOperation} type="operation" />
        
        <Button value="0" onClick={handleNumber} className="button-zero" />
        <Button value="." onClick={handleNumber} />
        <Button value="=" onClick={handleOperation} type="operation" />
        <Button value="+" onClick={handleOperation} type="operation" />
      </div>
    </div>
  )
}

export default Calculator
