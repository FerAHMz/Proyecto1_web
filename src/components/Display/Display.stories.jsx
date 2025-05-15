import Display from './Display'

export default {
  title: 'Components/Display',
  component: Display,
  argTypes: {
    value: { control: 'text' }
  }
}

export const Empty = {
  args: {
    value: '0'
  }
}

export const WithNumber = {
  args: {
    value: '123.45'
  }
}

export const MaxDigits = {
  args: {
    value: '999999999'
  }
}

export const Error = {
  args: {
    value: 'ERROR'
  }
}