import { useEffect, useState } from 'react'
import styles from './ProfilePage.module.scss'
import { getCustomerData } from '@api/getCustomerData.ts'
import { Customer } from '@commercetools/platform-sdk'
import { ProfileAddressComponent } from '@pages/Profile/ProfileAddressComponent.tsx'

export const ProfilePage = () => {
  const [customerInfo, setCustomerInfo] = useState<null | Customer>(null)

  useEffect(() => {
    async function getDataHandler() {
      const tokenJSON = localStorage.getItem('customer_token')
      if (tokenJSON) {
        try {
          const tokenObject = JSON.parse(tokenJSON)
          const token = tokenObject.token
          const data = await getCustomerData(token)
          console.log(data)
          setCustomerInfo(data)
        } catch (error) {
          console.error('Error fetching customer data:', error)
        }
      }
    }
    getDataHandler()

    return () => {}
  }, [])

  return (
    <div className="container">
      <div className={styles.inner}>
        <h2 className={styles.title}>Profile page</h2>
        <div className={styles.colWrap}>
          <ul className={styles.col1}>
            <li className={styles.fieldName}>First name:</li>
            <li className={styles.fieldName}>Last name:</li>
            <li className={styles.fieldName}>Date of birth:</li>
            <li className={styles.fieldName}>Email:</li>
          </ul>
          <ul className={styles.col2}>
            <li className={styles.fieldValue}>{customerInfo?.firstName}</li>
            <li className={styles.fieldValue}>{customerInfo?.lastName}</li>
            <li className={styles.fieldValue}>{customerInfo?.dateOfBirth}</li>
            <li className={styles.fieldValue}>{customerInfo?.email}</li>
          </ul>
        </div>

        <h3>Adresses:</h3>
        <div className={styles.addressesContainer}>
          {customerInfo?.addresses?.map((item) => {
            return (
              <ProfileAddressComponent
                key={item.id}
                address={item}
                customerInfo={customerInfo}
              />
            )
          })}
        </div>

        <div className={styles.buttonsWrap}>
          <button>Edit</button>
          <button>Save</button>
          <button>Cancel</button>
        </div>
      </div>
    </div>
  )
}
