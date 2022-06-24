import React from 'react'

type Props = {
  type?: 'email' | 'text' | 'username' | 'password'
  error?: string
  placeholder?: string
  onValueChange?: (value: string) => any
  defaultValue?: string
}

const Input = (props: Props) => {
  const {
    type = 'text',
    onValueChange,
    error,
    placeholder,
    defaultValue,
  } = props
  return (
    <div>
      <input
        type={type}
        onChange={(e) => {
          if (onValueChange) onValueChange(e.target.value)
        }}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
      {error && <p>{error}</p>}
    </div>
  )
}

export default Input
