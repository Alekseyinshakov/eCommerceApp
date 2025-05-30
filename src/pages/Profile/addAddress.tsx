import React, { useState } from 'react'
import styles from './ProfilePage.module.scss'
import { CountryList } from '@pages/AuthForms/helpersCountry.tsx'
import FormInput from '@components/FormInput/FormInput'
import { addNewAddress } from '@api/addNewAddress'
import { useNotification } from '@components/Notification/NotifficationContext'
import { useAuthStore } from '@store/authStore.ts'

export const AddAddress = () => {
  const { setNotification } = useNotification()
  const setUser = useAuthStore((state) => state.setUser)
  const [isAddingAddress, setIsAddingAddress] = useState(false)

  const [inputValues, setInputValues] = useState({
    country: '',
    city: '',
    street: '',
    postalCode: '',
    shipping: false,
    billing: false,
    defaultShipping: false,
    defaultBilling: false,
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

    setInputValues(newValues)
    console.log(`Field changed: ${name}, New value: ${finalValue}`)
  }

  const saveNewAddressHandler = async () => {
    try {
      const customer = await addNewAddress(inputValues)
      setUser(customer)
      setNotification('The address was successfully added.')
      setIsAddingAddress(false)
      setInputValues({
        country: '',
        city: '',
        street: '',
        postalCode: '',
        shipping: false,
        billing: false,
        defaultShipping: false,
        defaultBilling: false,
      })
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
            <div className={styles.fieldName}>Country:</div>
            <div className={styles.fieldValue}>
              <FormInput
                name="country"
                type="text"
                className={styles.resetInput}
                placeholder="Country"
                list="country-list"
                value={inputValues.country}
                onChange={handleChange}
              />
              <CountryList />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.fieldName}>City:</div>
            <div className={styles.fieldValue}>
              <FormInput
                name="city"
                type="text"
                className={styles.resetInput}
                placeholder="City"
                value={inputValues.city}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.fieldName}>Street:</div>
            <div className={styles.fieldValue}>
              <FormInput
                name="street"
                type="text"
                className={styles.resetInput}
                placeholder="Street Address"
                value={inputValues.street}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.fieldName}>Postal code:</div>
            <div className={styles.fieldValue}>
              <FormInput
                name="postalCode"
                type="text"
                className={styles.resetInput}
                placeholder="Postal Code"
                value={inputValues.postalCode}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.fieldName}>Shipping:</div>
            <div className={styles.fieldValue}>
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
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.fieldName}>Billing:</div>
            <div className={styles.fieldValue}>
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
            </div>
          </div>
          <div className={styles.row + ' ' + styles.buttonsWrapper}>
            {isAddingAddress && (
              <button
                className="button"
                onClick={() => {
                  setIsAddingAddress(false)
                }}
              >
                Cancel
              </button>
            )}
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
          </div>
        </div>
      )}
    </div>
  )
}
