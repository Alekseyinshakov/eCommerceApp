import styles from './ProfilePage.module.scss'
import { Address, Customer } from '@commercetools/platform-sdk'

export const ProfileAddressComponent = ({
  address,
  customerInfo,
}: {
  address: Address
  customerInfo: Customer | null
}) => {
  console.log(address)

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
          <li className={styles.fieldValue}>{address.country}</li>
          <li className={styles.fieldValue}>{address.city}</li>
          <li className={styles.fieldValue}>{address.streetName}</li>
          <li className={styles.fieldValue}>{address.postalCode}</li>
        </ul>
      </div>
    </div>
  )
}
