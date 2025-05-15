import './Button.css'

const Button = ({ value, onClick, type = 'number', className = '' }) => {
  const handleClick = () => {
    onClick(value)
  }

  return (
    <button
      onClick={handleClick}
      className={`calculator-button ${type} ${className}`}
      aria-label={value}
    >
      {value}
    </button>
  )
}

export default Button