import { TextField } from '@mui/material'
import React from 'react'

type Props = {
  type?: 'email' | 'text' | 'username' | 'password' | 'number'
  error?: boolean
  errorText?: string
  placeholder?: string
  onValueChange?: (value: string) => any
  defaultValue?: string | number
  className?: string
  variant?: 'standard' | 'filled' | 'outlined'
}

const Input = (props: Props) => {
  const {
    type = 'text',
    onValueChange,
    error,
    placeholder,
    defaultValue,
    className,
    errorText,
    variant,
  } = props

  return (
    <div className={className}>
      <TextField
        type={type}
        onChange={(e) => {
          if (onValueChange) onValueChange(e.target.value)
        }}
        label={placeholder}
        placeholder={placeholder}
        defaultValue={defaultValue}
        error={!!errorText || error}
        variant={variant}
        helperText={errorText || ' '}
        fullWidth
      />
    </div>
  )
}

export default Input
