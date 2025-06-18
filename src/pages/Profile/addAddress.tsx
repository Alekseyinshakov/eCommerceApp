import React, { useState } from 'react'
import styles from './ProfilePage.module.scss'
import { CountryList } from '@pages/AuthForms/helpersCountry.tsx'
import FormInput from '@components/FormInput/FormInput'
import { addNewAddress } from '@api/addNewAddress'
import { useNotification } from '@components/Notification/NotifficationContext'
import { useAuthStore } from '@store/authStore.ts'
import {
  validateCity,
  validateCountry,
  validatePostalCode,
  validateStreet,
} from '@hooks/useFormValidators'

const DEFAULT_INPUT_VALUES = {
  country: '',
  city: '',
  street: '',
  postalCode: '',
  shipping: false,
  billing: false,
  defaultShipping: false,
  defaultBilling: false,
}

export const AddAddress = () => {
  const { setNotification } = useNotification()
  const setUser = useAuthStore((state) => state.setUser)
  const [isAddingAddress, setIsAddingAddress] = useState(false)

  const [inputValues, setInputValues] = useState(DEFAULT_INPUT_VALUES)

  const [errors, setErrors] = useState({
    street: '',
    city: '',
    postalCode: '',
    country: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target
    const finalValue = type === 'checkbox' ? checked : value

    const newValues = {
      ...inputValues,
      [name]: finalValue,
    }

    if (name === 'billing' && finalValue === false) {
      newValues.defaultBilling = false
    }
    if (name === 'shipping' && finalValue === false) {
      newValues.defaultShipping = false
    }

    const updatedErrors = {
      ...errors,

      street: name === 'street' ? validateStreet(value) : errors.street,
      city: name === 'city' ? validateCity(value) : errors.city,
      postalCode:
        name === 'postalCode' ? validatePostalCode(value) : errors.postalCode,
      country: name === 'country' ? validateCountry(value) : errors.country,
    }

    setErrors(updatedErrors)

    setInputValues(newValues)
  }

  const saveNewAddressHandler = async () => {
    const newErrors = {
      street: validateStreet(inputValues.street),
      city: validateCity(inputValues.city),
      postalCode: validatePostalCode(inputValues.postalCode),
      country: validateCountry(inputValues.country),
    }
    setErrors(newErrors)
    if (Object.values(errors).some(Boolean)) {
      setNotification('Please fix the errors before saving.')
      return
    }

    try {
      const customer = await addNewAddress(inputValues)
      setUser(customer)
      setNotification('The address was successfully added.')
      setIsAddingAddress(false)
      setInputValues(DEFAULT_INPUT_VALUES)
    } catch (error) {
      console.error('Error adding new address:', error)
      setNotification('Something went wrong :-(')
    }
  }

  return (
    <div>
      <div className={styles.addAddressWrapper}>
        {!isAddingAddress && (
          <button
            className="button"
            onClick={() => {
              setIsAddingAddress(true)
            }}
          >
            Add new address
          </button>
        )}
      </div>

      {isAddingAddress && (
        <div className={styles.colWrap}>
          <div className={styles.row}>
            <p className={styles.fieldName}>Country:</p>
            <p className={styles.fieldValue}>
              <FormInput
                name="country"
                type="text"
                className={styles.resetInput}
                placeholder="Country"
                list="country-list"
                value={inputValues.country}
                onChange={handleChange}
                error={errors.country}
              />
              <CountryList />
            </p>
          </div>

          <div className={styles.row}>
            <p className={styles.fieldName}>City:</p>
            <p className={styles.fieldValue}>
              <FormInput
                name="city"
                type="text"
                className={styles.resetInput}
                placeholder="City"
                value={inputValues.city}
                onChange={handleChange}
                error={errors.city}
              />
            </p>
          </div>

          <div className={styles.row}>
            <p className={styles.fieldName}>Street:</p>
            <p className={styles.fieldValue}>
              <FormInput
                name="street"
                type="text"
                className={styles.resetInput}
                placeholder="Street Address"
                value={inputValues.street}
                onChange={handleChange}
                error={errors.street}
              />
            </p>
          </div>

          <div className={styles.row}>
            <p className={styles.fieldName}>Postal code:</p>
            <p className={styles.fieldValue}>
              <FormInput
                name="postalCode"
                type="text"
                className={styles.resetInput}
                placeholder="Postal Code"
                value={inputValues.postalCode}
                onChange={handleChange}
                error={errors.postalCode}
              />
            </p>
          </div>

          <div className={styles.row}>
            <p className={styles.fieldName}>Shipping:</p>
            <p className={styles.fieldValue}>
              <input
                type="checkbox"
                name="shipping"
                id=""
                checked={inputValues.shipping}
                onChange={handleChange}
              />
              <span className={styles.defaultSpan}>Default:</span>
              <input
                type="checkbox"
                name="defaultShipping"
                id=""
                checked={inputValues.defaultShipping}
                disabled={!inputValues.shipping}
                onChange={handleChange}
              />
            </p>
          </div>

          <div className={styles.row}>
            <p className={styles.fieldName}>Billing:</p>
            <p className={styles.fieldValue}>
              <input
                type="checkbox"
                name="billing"
                id=""
                checked={inputValues.billing}
                onChange={handleChange}
              />
              <span className={styles.defaultSpan}>Default:</span>
              <input
                type="checkbox"
                name="defaultBilling"
                id=""
                checked={inputValues.defaultBilling}
                disabled={!inputValues.billing}
                onChange={handleChange}
              />
            </p>
          </div>
          <div className={styles.row + ' ' + styles.buttonsWrapper}>
            {isAddingAddress && (
              <button
                className="button"
                onClick={() => {
                  saveNewAddressHandler()
                }}
              >
                Save
              </button>
            )}
            {isAddingAddress && (
              <button
                className="button"
                onClick={() => {
                  setIsAddingAddress(false)
                  setInputValues(DEFAULT_INPUT_VALUES)
                  setErrors({
                    street: '',
                    city: '',
                    postalCode: '',
                    country: '',
                  })
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
