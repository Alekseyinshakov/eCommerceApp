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
import FormInput from '@components/FormInput/FormInput'

import styles from './AuthForm.module.scss'
import { registerCustomer } from '@api/apiClient'
import { ErrorResponse, DuplicateFieldError } from '@commercetools/platform-sdk'
import { useNotification } from '@components/Notification/NotifficationContext'
import { loginCustomer } from '@api/auth'
import { useAuthStore } from '@store/authStore'
import { CountryList } from './helpersCountry'
import { countryCodeMap } from '@constants'

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

export const SignUpPage = () => {
  const { setNotification } = useNotification()
  const navigate = useNavigate()
  const { submitText } = useAuthPageText()
  const setUser = useAuthStore((state) => state.setUser)

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
    billingStreet: '',
    billingCity: '',
    billingPostalCode: '',
    billingCountry: '',
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
    billingStreet: '',
    billingCity: '',
    billingPostalCode: '',
    billingCountry: '',
    registration: '',
  })

  const [useSameAddress, setUseSameAddress] = useState(true)
  const [defaultShippingAddress, setDefaultShippingAddress] = useState(true)
  const [defaultBillingAddress, setDefaultBillingAddress] = useState(true)

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
      billingStreet: validateStreet(formData.billingStreet),
      billingCity: validateCity(formData.billingCity),
      billingPostalCode: validatePostalCode(formData.billingPostalCode),
      billingCountry: validateCountry(formData.billingCountry),
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

          billingStreet: formData.billingStreet,
          billingCity: formData.billingCity,
          billingPostalCode: formData.billingPostalCode,
          billingCountry: countryCodeMap[formData.billingCountry],
          defaultShippingAddress,
          defaultBillingAddress,
          useSameAddress,
        })

        setNotification('Registration successful!')

        const customer = await loginCustomer(formData.email, formData.password)

        if (customer) {
          setUser(customer)
        }

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
      let updated = { ...prev, [name]: value }

      if (useSameAddress) {
        switch (name) {
          case 'street':
            updated = { ...updated, billingStreet: value }
            break
          case 'city':
            updated = { ...updated, billingCity: value }
            break
          case 'postalCode':
            updated = { ...updated, billingPostalCode: value }
            break
          case 'country':
            updated = { ...updated, billingCountry: value }
            break
        }
      }

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
        billingStreet:
          name === 'billingStreet'
            ? validateStreet(value)
            : errors.billingStreet,
        billingCity:
          name === 'billingCity' ? validateCity(value) : errors.billingCity,
        billingPostalCode:
          name === 'billingPostalCode'
            ? validatePostalCode(value)
            : errors.billingPostalCode,
        billingCountry:
          name === 'billingCountry'
            ? validateCountry(value)
            : errors.billingCountry,
      }

      setErrors(updatedErrors)
      return updated
    })
  }

  const sameAddressHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUseSameAddress(e.target.checked)
    if (e.target.checked) {
      setFormData((prev) => ({
        ...prev,
        billingStreet: prev.street,
        billingCity: prev.city,
        billingPostalCode: prev.postalCode,
        billingCountry: prev.country,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        billingStreet: '',
        billingCity: '',
        billingPostalCode: '',
        billingCountry: '',
      }))
    }
  }

  return (
    <main className={`${main} ${styles.regMain}`}>
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
              data-testid="signup-form"
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

              <div className={inputGroupTwo}>
                <div className={groupOne}>
                  <FormInput
                    name="email"
                    type="email"
                    placeholder="Email (e.g., example@email.com)"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                  />

                  <FormInput
                    name="dob"
                    type="date"
                    placeholder="Date of Birth"
                    value={formData.dob}
                    onChange={handleChange}
                    error={errors.dob}
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
                </div>
              </div>

              <div className={styles.subtitleWrapper}>
                <div className={styles.formSubtitle}>Shipping Address</div>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={defaultShippingAddress}
                    onChange={() => {
                      setDefaultShippingAddress(!defaultShippingAddress)
                    }}
                  />
                  Set as default shipping address
                </label>
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
                  />

                  <FormInput
                    name="city"
                    type="text"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    error={errors.city}
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
                  />

                  <FormInput
                    name="country"
                    type="text"
                    placeholder="Country"
                    list="country-list"
                    value={formData.country}
                    onChange={handleChange}
                    error={errors.country}
                  />
                  <CountryList />
                </div>
              </div>
              <label className={styles.checkboxLabel}>
                <input
                  checked={useSameAddress}
                  type="checkbox"
                  onChange={sameAddressHandler}
                />
                Use the same address for billing
              </label>

              <div
                className={`${styles.subtitleWrapper} ${useSameAddress ? styles.hidden : ''}`}
              >
                <div className={styles.formSubtitle}>Billing Address</div>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={defaultBillingAddress}
                    onChange={() => {
                      setDefaultBillingAddress(!defaultBillingAddress)
                    }}
                  />
                  Set as default billing address
                </label>
              </div>

              <div
                className={`${inputGroupTwo} ${useSameAddress ? styles.hidden : ''}`}
              >
                <div className={groupOne}>
                  <FormInput
                    name="billingStreet"
                    type="text"
                    placeholder="Street Address"
                    value={formData.billingStreet}
                    onChange={handleChange}
                    error={errors.billingStreet}
                  />

                  <FormInput
                    name="billingCity"
                    type="text"
                    placeholder="City"
                    value={formData.billingCity}
                    onChange={handleChange}
                    error={errors.billingCity}
                  />
                </div>

                <div className={groupOne}>
                  <FormInput
                    name="billingPostalCode"
                    type="text"
                    placeholder="Postal Code"
                    value={formData.billingPostalCode}
                    onChange={handleChange}
                    error={errors.billingPostalCode}
                  />

                  <FormInput
                    name="billingCountry"
                    type="text"
                    placeholder="Country"
                    list="country-list"
                    value={formData.billingCountry}
                    onChange={handleChange}
                    error={errors.billingCountry}
                  />
                  <CountryList />
                </div>
              </div>

              <button className={button} type="submit">
                {submitText}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
