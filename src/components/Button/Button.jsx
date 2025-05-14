import './Button.css'

const Button = ({ value, onClick, type = 'number' }) => {
  return (
    <button
      onClick={() => onClick(value)}
      className={`calculator-button ${type}`}
    >
      {value}
    </button>
  )
}

export default Button