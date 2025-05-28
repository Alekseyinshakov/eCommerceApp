import { useEffect, useState } from 'react'
import styles from './ProfilePage.module.scss'
import { getCustomerData } from '@api/getCustomerData.ts'
import { Customer } from '@commercetools/platform-sdk'
import { ProfileAddressComponent } from '@pages/Profile/ProfileAddressComponent.tsx'

export const ProfilePage = () => {
  const [customerInfo, setCustomerInfo] = useState<null | Customer>(null)

  const [editMode, setEditMode] = useState(false)

  const [inputValues, setInputValues] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
  })

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
          setInputValues({
            firstName: data.firstName!,
            lastName: data.lastName!,
            dateOfBirth: data.dateOfBirth!,
            email: data.email,
          })
        } catch (error) {
          console.error('Error fetching customer data:', error)
        }
      }
    }

    getDataHandler()

    return () => {}
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setInputValues((prev) => {
      const updated = { ...prev, [name]: value }

      return updated
    })
  }

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
            <li className={styles.fieldValue}>
              {editMode ? (
                <input
                  onChange={handleChange}
                  value={inputValues.firstName}
                  name="firstName"
                  type="text"
                />
              ) : (
                customerInfo?.firstName
              )}
            </li>
            <li className={styles.fieldValue}>
              {editMode ? (
                <input
                  onChange={handleChange}
                  value={inputValues.lastName}
                  name="lastName"
                  type="text"
                />
              ) : (
                customerInfo?.lastName
              )}
            </li>
            <li className={styles.fieldValue}>
              {editMode ? (
                <input
                  onChange={handleChange}
                  value={inputValues.dateOfBirth}
                  name="dateOfBirth"
                  type="date"
                />
              ) : (
                customerInfo?.dateOfBirth
              )}
            </li>
            <li className={styles.fieldValue}>
              {editMode ? (
                <input
                  onChange={handleChange}
                  value={inputValues.email}
                  name="email"
                  type="email"
                />
              ) : (
                customerInfo?.email
              )}
            </li>
          </ul>
        </div>

        <div className={styles.buttonsWrap}>
          {editMode && <button className="button">Save</button>}
          {editMode && (
            <button
              className="button"
              onClick={() => {
                setEditMode(false)
              }}
            >
              Cancel
            </button>
          )}
          {!editMode && (
            <button
              className="button"
              onClick={() => {
                setEditMode(true)
              }}
            >
              Edit
            </button>
          )}
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
      </div>
    </div>
  )
}
