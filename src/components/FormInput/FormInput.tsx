import React from 'react'
import styles from '@pages/AuthForms/AuthForm.module.scss'

const { input, borderRed, inputBox, errorMsg } = styles

interface FormInputProps {
  name: string
  type?: string
  placeholder?: string
  required?: boolean
  list?: string
  className?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
}

const FormInput: React.FC<FormInputProps> = ({
  name,
  type = 'text',
  placeholder,
  required = false,
  list,
  className = '',
  value,
  onChange,
  error,
}) => {
  const inputClassName = [
    input,
    styles[className] || className,
    error && borderRed,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={inputBox}>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        list={list}
        className={inputClassName}
        value={value}
        onChange={onChange}
      />
      {error && <span className={errorMsg}>{error}</span>}
    </div>
  )
}

export default FormInput
