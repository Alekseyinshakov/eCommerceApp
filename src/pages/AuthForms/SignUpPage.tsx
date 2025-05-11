import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuthPageText } from '@hooks/useAuthPageText'
import {
  validateEmail,
  validatePassword,
  validateName,
  validateDate,
  validateStreet,
  validateCity,
  validatePostalCode,
  validateCountry,
} from '@hooks/useFormValidators'

import { RegisterNav } from '@components/RegisterNav/RegisterNav'
import { RegisterAlt } from '@components/RegisterAlt/RegisterAlt'
import FormInput from '@components/FormInput/FormInput'

import styles from './AuthForm.module.scss'
import { registerCustomer } from '@api/apiClient'
import { ErrorResponse, DuplicateFieldError } from '@commercetools/platform-sdk'
import { useNotification } from '@components/Notification/NotifficationContext'
import { loginCustomer } from '@api/auth'

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
  const { setNotification } = useNotification()
  const navigate = useNavigate()
  const { submitText } = useAuthPageText()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dob: '',
    street: '',
    city: '',
    postalCode: '',
    country: '',
  })

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dob: '',
    street: '',
    city: '',
    postalCode: '',
    country: '',
    registration: '',
  })

  const countryCodeMap: Record<string, string> = {
    Canada: 'CA',
    'United States': 'US',
    Ukraine: 'UA',
    Germany: 'DE',
    France: 'FR',
    Russia: 'RU',
    Belarus: 'BY',
    Poland: 'PL',
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
      street: validateStreet(formData.street),
      city: validateCity(formData.city),
      postalCode: validatePostalCode(formData.postalCode),
      country: validateCountry(formData.country),
      registration: '',
    }

    setErrors(newErrors)

    const hasErrors = Object.values(newErrors).some(Boolean)
    if (!hasErrors) {
      try {
        await registerCustomer({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          dateOfBirth: formData.dob,
          country: countryCodeMap[formData.country],
          street: formData.street,
          city: formData.city,
          postalCode: formData.postalCode,
        })

        setNotification('Registration successful!')

        const customer = await loginCustomer(formData.email, formData.password)
        console.log('Logged in as:', customer)
        navigate('/home')
      } catch (error) {
        const err = error as { body?: ErrorResponse }
        const duplicateError = err.body?.errors?.find(
          (e): e is DuplicateFieldError =>
            e.code === 'DuplicateField' && e.field === 'email'
        )
        if (duplicateError) {
          setErrors((prev) => ({
            ...prev,
            email: duplicateError.message,
          }))
        }
        setNotification('Registration failed. Please try again.')
      }
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
        street: name === 'street' ? validateStreet(value) : errors.street,
        city: name === 'city' ? validateCity(value) : errors.city,
        postalCode:
          name === 'postalCode' ? validatePostalCode(value) : errors.postalCode,
        country: name === 'country' ? validateCountry(value) : errors.country,
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
                  required
                />

                <FormInput
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={errors.lastName}
                  required
                />
              </div>

              <div className={inputGroupTwo}>
                <div className={groupOne}>
                  <FormInput
                    name="email"
                    type="email"
                    placeholder="Email (e.g., example@email.com)"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    required
                  />

                  <FormInput
                    name="dob"
                    type="date"
                    placeholder="Date of Birth"
                    value={formData.dob}
                    onChange={handleChange}
                    error={errors.dob}
                    required
                  />
                </div>

                <div className={groupOne}>
                  <FormInput
                    name="password"
                    type="password"
                    placeholder="Password (min 8 chars, 1 uppercase, 1 lowercase, 1 number)"
                    className={passwordText}
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                    required
                  />

                  <FormInput
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    className={passwordText}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                    required
                  />
                </div>
              </div>
              <div className={inputGroupTwo}>
                <div className={groupOne}>
                  <FormInput
                    name="street"
                    type="text"
                    placeholder="Street Address"
                    value={formData.street}
                    onChange={handleChange}
                    error={errors.street}
                    required
                  />

                  <FormInput
                    name="city"
                    type="text"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    error={errors.city}
                    required
                  />
                </div>

                <div className={groupOne}>
                  <FormInput
                    name="postalCode"
                    type="text"
                    placeholder="Postal Code"
                    value={formData.postalCode}
                    onChange={handleChange}
                    error={errors.postalCode}
                    required
                  />

                  <FormInput
                    name="country"
                    type="text"
                    placeholder="Country"
                    list="country-list"
                    value={formData.country}
                    onChange={handleChange}
                    error={errors.country}
                    required
                  />
                  <datalist id="country-list">
                    <option value="Canada" />
                    <option value="United States" />
                    <option value="Ukraine" />
                    <option value="Germany" />
                    <option value="France" />
                    <option value="Russia" />
                    <option value="Belarus" />
                    <option value="Poland" />
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
