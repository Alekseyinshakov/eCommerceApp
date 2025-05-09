import React, { useState } from 'react'
import styles from './FormInput.module.scss'
import { FiEye, FiEyeOff } from 'react-icons/fi'

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
  const [showPassword, setShowPassword] = useState(false)

  const isPassword = type === 'password'
  const inputType = isPassword && showPassword ? 'text' : type

  const inputClassName = [
    styles.input,
    className && styles[className],
    error && styles.borderRed,
    isPassword && styles.withIcon,
    isPassword && styles.passwordText,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={styles.inputBox}>
      <div className={styles.inputWrapper}>
        <input
          name={name}
          type={inputType}
          placeholder={placeholder}
          required={required}
          list={list}
          className={inputClassName}
          value={value}
          onChange={onChange}
        />
        {isPassword && (
          <button
            type="button"
            className={styles.iconButton}
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label="Toggle password visibility"
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        )}
      </div>
      {error && <span className={styles.errorMsg}>{error}</span>}
    </div>
  )
}

export default FormInput
