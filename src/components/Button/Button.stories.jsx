import Button from './Button'

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    value: { control: 'text' },
    type: { 
      control: 'select', 
      options: ['number', 'operation', 'function'] 
    },
    onClick: { action: 'clicked' }
  }
}

export const Number = {
  args: {
    value: '5',
    type: 'number'
  }
}

export const Operation = {
  args: {
    value: '+',
    type: 'operation'
  }
}

export const Function = {
  args: {
    value: 'AC',
    type: 'function'
  }
}