import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuthPageText } from '@hooks/useAuthPageText'

import { RegisterNav } from '@components/RegisterNav/RegisterNav'
import { RegisterAlt } from '@components/RegisterAlt/RegisterAlt'

import styles from './AuthForm.module.scss'

const {
  main,
  authPage,
  authBlock,
  auth,
  authHint,
  form,
  forgetful,
  button,
  errorMsg,
  passwordText,
} = styles

export function LoginPage() {
  const navigate = useNavigate()
  const { submitText } = useAuthPageText()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({ email: '', password: '' })

  const validateEmail = (value: string) => {
    const trimmed = value.trim()
    if (trimmed !== value) return 'Email must not have leading/trailing spaces'
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!regex.test(trimmed)) return 'Invalid email format'
    return ''
  }

  const validatePassword = (value: string) => {
    if (value.trim() !== value)
      return 'Password must not have leading/trailing spaces'
    if (value.length < 8) return 'Password must be at least 8 characters'
    if (!/[A-Z]/.test(value))
      return 'Password must contain at least one uppercase letter'
    if (!/[a-z]/.test(value))
      return 'Password must contain at least one lowercase letter'
    if (!/[0-9]/.test(value)) return 'Password must contain at least one digit'
    return ''
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const emailError = validateEmail(email)
    const passwordError = validatePassword(password)

    setErrors({ email: emailError, password: passwordError })

    if (!emailError && !passwordError) {
      navigate('/home')
    }
  }

  return (
    <main className={main}>
      <div className={authPage}>
        <div className={authBlock}>
          <RegisterNav />
          <div className={auth}>
            <div className={authHint}>
              Enter your email and password to login.
            </div>
            <form className={form} autoComplete="off" onSubmit={handleSubmit}>
              <input
                name="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => {
                  const value = e.target.value
                  setEmail(value)
                  setErrors((prev) => ({
                    ...prev,
                    email: validateEmail(value),
                  }))
                }}
              />
              {errors.email && <span className={errorMsg}>{errors.email}</span>}

              <input
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                className={passwordText}
                onChange={(e) => {
                  const value = e.target.value
                  setPassword(value)
                  setErrors((prev) => ({
                    ...prev,
                    password: validatePassword(value),
                  }))
                }}
              />
              {errors.password && (
                <span className={errorMsg}>{errors.password}</span>
              )}

              <div className={forgetful}>Forgot password?</div>

              <button className={button} type="submit">
                {submitText}
              </button>
            </form>
          </div>
          <RegisterAlt />
        </div>
      </div>
    </main>
  )
}
