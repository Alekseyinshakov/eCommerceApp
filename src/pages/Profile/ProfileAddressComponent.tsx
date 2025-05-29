import styles from './ProfilePage.module.scss'
import { Address, Customer } from '@commercetools/platform-sdk'
import FormInput from '@components/FormInput/FormInput'
import { CountryList } from '@pages/AuthForms/helpersCountry'
import { useState } from 'react'

export const ProfileAddressComponent = ({
  address,
  customerInfo,
}: {
  address: Address
  customerInfo: Customer | null
}) => {
  let isTypeBilling: boolean = false
  let isTypeShipping: boolean = false
  let isDefaultBilling: boolean = false
  let isDefaultShipping: boolean = false

  if (customerInfo) {
    if (customerInfo.billingAddressIds?.includes(address.id!)) {
      isTypeBilling = true
    }
    if (customerInfo.shippingAddressIds?.includes(address.id!)) {
      isTypeShipping = true
    }
    if (customerInfo.defaultBillingAddressId === address.id) {
      isDefaultBilling = true
    }
    if (customerInfo.defaultShippingAddressId === address.id) {
      isDefaultShipping = true
    }
  }

  const [editMode, seteditMode] = useState(false)

  const [inputValues] = useState({
    country: address.country,
    city: address.city,
    street: address.streetName,
    postalCode: address.postalCode,
  })

  return (
    <div className={styles.addressContainer}>
      <div className={styles.addressTypeWrapper}>
        {isTypeBilling && <div className={styles.addressType}>Billing</div>}
        {isTypeShipping && <div className={styles.addressType}>Shipping</div>}
        {isDefaultBilling && (
          <div className={styles.addressDefault}>Default billing</div>
        )}
        {isDefaultShipping && (
          <div className={styles.addressDefault}>Default shipping</div>
        )}
      </div>
      <div className={styles.colWrap + ' ' + styles.addressWrap}>
        <div className={styles.row}>
          <div className={styles.fieldName}>Country:</div>
          <div className={styles.fieldValue}>
            {editMode ? (
              <>
                <FormInput
                  name="country"
                  type="text"
                  className={styles.resetInput}
                  placeholder="Country"
                  list="country-list"
                  value={inputValues.country}
                  onChange={() => {
                    console.log(1)
                  }}
                />
                <CountryList />
              </>
            ) : (
              address.country
            )}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.fieldName}>City:</div>
          <div className={styles.fieldValue}>
            {editMode ? (
              <FormInput
                name="city"
                type="text"
                className={styles.resetInput}
                placeholder="City"
                value={inputValues.city || ''}
                onChange={() => {
                  console.log(1)
                }}
              />
            ) : (
              address.city
            )}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.fieldName}>Street:</div>
          <div className={styles.fieldValue}>
            {editMode ? (
              <FormInput
                name="street"
                type="text"
                className={styles.resetInput}
                placeholder="Street Address"
                value={inputValues.street || ''}
                onChange={() => {
                  console.log(1)
                }}
              />
            ) : (
              address.streetName
            )}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.fieldName}>Postal code:</div>
          <div className={styles.fieldValue}>
            {editMode ? (
              <FormInput
                name="postalCode"
                type="text"
                className={styles.resetInput}
                placeholder="Postal Code"
                value={inputValues.postalCode || ''}
                onChange={() => {
                  console.log(1)
                }}
              />
            ) : (
              address.postalCode
            )}
          </div>
        </div>
      </div>
      <div className={styles.addressButtons}>
        {editMode && (
          <button
            onClick={() => {
              console.log('save address')
            }}
            className="button"
          >
            Save
          </button>
        )}
        {!editMode && (
          <button
            onClick={() => {
              seteditMode(true)
            }}
            className="button"
          >
            Edit
          </button>
        )}
        {editMode && (
          <button
            onClick={() => {
              seteditMode(false)
            }}
            className="button"
          >
            Cancel
          </button>
        )}
        <button className="button">Delete</button>
      </div>
    </div>
  )
}
