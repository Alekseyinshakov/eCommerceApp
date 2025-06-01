import React, { useState } from 'react'
import styles from './FormInput.module.scss'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import classNames from 'classnames'

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

const FormInput = ({
  name,
  type = 'text',
  placeholder,
  required = false,
  list,
  className = '',
  value,
  onChange,
  error,
}: FormInputProps) => {
  const [showPassword, setShowPassword] = useState(false)

  const isPassword = type === 'password'
  const inputType = isPassword && showPassword ? 'text' : type

  const inputClassName = classNames(styles.input, className, {
    [styles.borderRed]: !!error,
    [styles.passwordText]: isPassword,
  })

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
            {showPassword ? <FiEye /> : <FiEyeOff />}
          </button>
        )}
      </div>
      {error && <span className={styles.errorMsg}>{error}</span>}
    </div>
  )
}

export default FormInput
