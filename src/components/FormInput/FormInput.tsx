import React from 'react'
import styles from './FormInput.module.scss'

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
    styles.input,
    className && styles[className],
    error && styles.borderRed,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={styles.inputBox}>
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
      {error && <span className={styles.errorMsg}>{error}</span>}
    </div>
  )
}

export default FormInput
