import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuthPageText } from '@hooks/useAuthPageText'

import {
  validateEmail,
  validatePassword,
  validateName,
  validateDate,
} from '@hooks/useFormValidators'

import { RegisterNav } from '@components/RegisterNav/RegisterNav'
import { RegisterAlt } from '@components/RegisterAlt/RegisterAlt'
import FormInput from '@components/FormInput/FormInput'

import styles from './AuthForm.module.scss'

const {
  main,
  authPage,
  authBlock,
  auth,
  authHint,
  formSignUp,
  button,
  inputGroup,
  groupOne,
  inputGroupTwo,
  passwordText,
} = styles

export function SignUpPage() {
  const navigate = useNavigate()
  const { submitText } = useAuthPageText()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dob: '',
  })

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dob: '',
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const confirmPasswordError =
      formData.password !== formData.confirmPassword
        ? 'Passwords do not match'
        : ''

    const newErrors = {
      firstName: validateName(formData.firstName),
      lastName: validateName(formData.lastName),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      confirmPassword: confirmPasswordError,
      dob: validateDate(formData.dob),
    }

    setErrors(newErrors)

    const hasErrors = Object.values(newErrors).some(Boolean)
    if (!hasErrors) {
      navigate('/home')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => {
      const updated = { ...prev, [name]: value }

      const updatedErrors = {
        ...errors,
        firstName:
          name === 'firstName' ? validateName(value) : errors.firstName,
        lastName: name === 'lastName' ? validateName(value) : errors.lastName,
        email: name === 'email' ? validateEmail(value) : errors.email,
        password:
          name === 'password' ? validatePassword(value) : errors.password,
        confirmPassword:
          name === 'confirmPassword' || name === 'password'
            ? updated.password !== updated.confirmPassword
              ? 'Passwords do not match'
              : ''
            : errors.confirmPassword,
        dob: name === 'dob' ? validateDate(value) : errors.dob,
      }

      setErrors(updatedErrors)
      return updated
    })
  }

  return (
    <main className={main}>
      <div className={authPage}>
        <div className={authBlock}>
          <RegisterNav />
          <div className={auth}>
            <div className={authHint}>
              Enter your details to create an account.
            </div>
            <form
              className={formSignUp}
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <div className={inputGroup}>
                <FormInput
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  error={errors.firstName}
                />

                <FormInput
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={errors.lastName}
                />
              </div>

              <FormInput
                name="email"
                type="email"
                placeholder="Email (e.g., example@email.com)"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />

              <FormInput
                name="password"
                type="password"
                placeholder="Password (min 8 chars, 1 uppercase, 1 lowercase, 1 number)"
                className={passwordText}
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
              />

              <FormInput
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                className={passwordText}
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
              />

              <FormInput
                name="dob"
                type="date"
                placeholder="Date of Birth"
                value={formData.dob}
                onChange={handleChange}
                error={errors.dob}
              />

              <div className={inputGroupTwo}>
                <div className={groupOne}>
                  {/* <FormInput
                    name="street"
                    type="text"
                    placeholder="Street Address"
                    required
                  />

                  <FormInput
                    name="city"
                    type="text"
                    placeholder="City"
                    required
                  /> */}
                </div>

                <div className={groupOne}>
                  {/* <FormInput
                    name="postalCode"
                    type="text"
                    placeholder="Postal Code"
                    required
                  />

                  <FormInput
                    name="country"
                    type="text"
                    placeholder="Country"
                    required
                    list="country-list"
                  /> */}
                  <datalist id="country-list">
                    <option value="Canada" />
                    <option value="United States" />
                    <option value="Ukraine" />
                    <option value="Germany" />
                    <option value="France" />
                    {/* you can expand the list */}
                  </datalist>
                </div>
              </div>

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
