import React, { useState } from 'react'
import styles from './ProfilePage.module.scss'
import { CountryList } from '@pages/AuthForms/helpersCountry.tsx'
import FormInput from '@components/FormInput/FormInput'

export const AddAddress = () => {
  const [isAddingAddress, setIsAddingAddress] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    console.log(`Field changed: ${name}, New value: ${value}`)
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
            Add address
          </button>
        )}
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
              console.log(234)
            }}
          >
            Save
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
                value={''}
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
                value={''}
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
                value={''}
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
                value={''}
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
                checked={false}
                onChange={handleChange}
              />
              <span className={styles.defaultSpan}>Default:</span>
              <input
                type="checkbox"
                name="defaultShipping"
                id=""
                checked={false}
                disabled={false}
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
                checked={false}
                onChange={handleChange}
              />
              <span className={styles.defaultSpan}>Default:</span>
              <input
                type="checkbox"
                name="defaultBilling"
                id=""
                checked={false}
                disabled={false}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
