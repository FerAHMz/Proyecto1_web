import './Display.css'

const Display = ({ value }) => {
  const isFull = value.length >= 8

  return (
    <div 
      className={`calculator-display ${isFull ? 'full' : ''}`}
      data-testid="calculator-display"
      aria-live="polite"
      aria-atomic="true"
    >
      {value}
    </div>
  )
}

export default Display