import styles from './ProfilePage.module.scss'
import { Address, Customer } from '@commercetools/platform-sdk'
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

  const [editMode] = useState(false)

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
        <ul className={styles.col1}>
          <li className={styles.fieldName}>Country:</li>
          <li className={styles.fieldName}>City:</li>
          <li className={styles.fieldName}>Street:</li>
          <li className={styles.fieldName}>Postal code:</li>
        </ul>
        <ul className={styles.col2}>
          <li className={styles.fieldValue}>
            {editMode ? (
              <input value={inputValues.country} type="text" />
            ) : (
              address.country
            )}
          </li>
          <li className={styles.fieldValue}>
            {editMode ? (
              <input value={inputValues.city} type="text" />
            ) : (
              address.city
            )}
          </li>
          <li className={styles.fieldValue}>
            {editMode ? (
              <input value={inputValues.street} type="text" />
            ) : (
              address.streetName
            )}
          </li>
          <li className={styles.fieldValue}>
            {editMode ? (
              <input value={inputValues.postalCode} type="text" />
            ) : (
              address.postalCode
            )}
          </li>
        </ul>
      </div>
    </div>
  )
}
