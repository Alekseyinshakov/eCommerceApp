import styles from './ProfilePage.module.scss'
import { Address } from '@commercetools/platform-sdk'

export const ProfileAddressComponent = ({ address }: { address: Address }) => {
  console.log(address)
  return (
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
  )
}
