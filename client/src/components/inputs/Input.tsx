import React from 'react'

type Props = {
  type?: 'email' | 'text' | 'username' | 'password'
  error?: string
  placeholder?: string
  onValueChange?: (value: string) => any
}

const Input = (props: Props) => {
  const { type = 'text', onValueChange, error, placeholder } = props
  return (
    <div>
      <input
        type={type}
        onChange={(e) => {
          if (onValueChange) onValueChange(e.target.value)
        }}
        placeholder={placeholder}
      />
      {error && <p>{error}</p>}
    </div>
  )
}

export default Input
