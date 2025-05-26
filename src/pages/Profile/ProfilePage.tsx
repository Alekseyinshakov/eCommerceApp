import { useEffect, useState } from 'react'
import styles from './ProfilePage.module.scss'
import { getCustomerData } from '@api/getCustomerData.ts'
import { Address } from '@commercetools/platform-sdk'
import { ProfileAddressComponent } from '@pages/Profile/ProfileAddressComponent.tsx'

export const ProfilePage = () => {
  const [fields, setFields] = useState([
    { label: 'First name:', value: '' },
    { label: 'Last name:', value: '' },
    { label: 'Date of birth:', value: '' },
    { label: 'Email:', value: '' },
  ])

  const [addresses, setAddresses] = useState<Address[]>([])

  useEffect(() => {
    async function getDataHandler() {
      const tokenJSON = localStorage.getItem('customer_token')
      if (tokenJSON) {
        try {
          const tokenObject = JSON.parse(tokenJSON)
          const token = tokenObject.token
          const data = await getCustomerData(token)
          console.log(data)
          setFields([
            { label: 'First name:', value: data.firstName! },
            { label: 'Last name:', value: data.lastName! },
            { label: 'Date of birth:', value: data.dateOfBirth! },
            { label: 'Email:', value: data.email! },
          ])
          setAddresses([...data.addresses])
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
            {fields.map((item, i) => {
              return (
                <li key={i} className={styles.fieldName}>
                  {item.label}
                </li>
              )
            })}
          </ul>
          <ul className={styles.col2}>
            {fields.map((item, i) => {
              return (
                <li key={i} className={styles.fieldValue}>
                  {item.value}
                </li>
              )
            })}
          </ul>
        </div>

        <h3>Adresses:</h3>
        {addresses.map((item) => {
          return <ProfileAddressComponent key={item.id} address={item} />
        })}

        <div className={styles.buttonsWrap}>
          <button>Edit</button>
          <button>Save</button>
          <button>Cancel</button>
        </div>
      </div>
    </div>
  )
}
