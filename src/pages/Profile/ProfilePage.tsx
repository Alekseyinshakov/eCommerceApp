import { useEffect, useState } from 'react'
import styles from './ProfilePage.module.scss'
import { getCustomerData } from '@api/getCustomerData.ts'
import { ProfileAddressComponent } from '@pages/Profile/ProfileAddressComponent.tsx'
import { updateCustomerData } from '@api/updateCustomerData.ts'
import { useAuthStore } from '@store/authStore.ts'
import { useNotification } from '@components/Notification/NotifficationContext.tsx'
import FormInput from '@components/FormInput/FormInput.tsx'
import {
  validateCity,
  validateCountry,
  validateDate,
  validateEmail,
  validateName,
  validatePostalCode,
  validateStreet,
} from '@hooks/useFormValidators.ts'
import { AddAddress } from './addAddress'
import { PasswordChange } from './PasswordChange'

export const ProfilePage = () => {
  const setUser = useAuthStore((state) => state.setUser)
  const customerInfo = useAuthStore((state) => state.user)
  const { setNotification } = useNotification()

  const [editMode, setEditMode] = useState(false)

  const [inputValues, setInputValues] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
  })

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    street: '',
    city: '',
    postalCode: '',
    country: '',
  })

  useEffect(() => {
    async function getDataHandler() {
      const tokenJSON = localStorage.getItem('customer_token')
      if (tokenJSON) {
        try {
          const tokenObject = JSON.parse(tokenJSON)
          const token = tokenObject.token
          const data = await getCustomerData(token)
          setUser(data)
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
  }, [setUser])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setInputValues((prev) => {
      const updated = { ...prev, [name]: value }

      const updatedErrors = {
        ...errors,
        firstName:
          name === 'firstName' ? validateName(value) : errors.firstName,
        lastName: name === 'lastName' ? validateName(value) : errors.lastName,
        email: name === 'email' ? validateEmail(value) : errors.email,
        dateOfBirth:
          name === 'dateOfBirth' ? validateDate(value) : errors.dateOfBirth,
        street: name === 'street' ? validateStreet(value) : errors.street,
        city: name === 'city' ? validateCity(value) : errors.city,
        postalCode:
          name === 'postalCode' ? validatePostalCode(value) : errors.postalCode,
        country: name === 'country' ? validateCountry(value) : errors.country,
      }

      setErrors(updatedErrors)
      return updated
    })
  }

  const updateMainInfo = async () => {
    if (!customerInfo) return

    const hasErrors =
      errors.lastName || errors.firstName || errors.dateOfBirth || errors.email

    if (hasErrors) {
      setNotification('Fill in the fields with correct data')
    } else {
      try {
        const updatedCustomer = await updateCustomerData({
          ...customerInfo,
          ...inputValues,
        })

        if (updatedCustomer) {
          setUser(updatedCustomer)
          setNotification('Information successfully updated')
          setEditMode(false)
        }
      } catch (error) {
        console.error('Error updating customer info:', error)
        setNotification('Something went wrong :-(')
      }
    }
  }

  return (
    <div className="container">
      <div className={styles.inner}>
        <h2 className={styles.title}>Profile page</h2>
        <div className={styles.colWrap}>
          <div className={styles.row}>
            <div className={styles.fieldName}>First name:</div>
            <div className={styles.fieldValue}>
              {editMode ? (
                <FormInput
                  onChange={handleChange}
                  value={inputValues.firstName}
                  name="firstName"
                  type="text"
                  className={styles.resetInput}
                  error={errors.firstName}
                />
              ) : (
                customerInfo?.firstName
              )}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.fieldName}>Last name:</div>
            <div className={styles.fieldValue}>
              {editMode ? (
                <FormInput
                  onChange={handleChange}
                  value={inputValues.lastName}
                  name="lastName"
                  type="text"
                  className={styles.resetInput}
                  error={errors.lastName}
                />
              ) : (
                customerInfo?.lastName
              )}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.fieldName}>Date of birth:</div>
            <div className={styles.fieldValue}>
              {editMode ? (
                <FormInput
                  onChange={handleChange}
                  value={inputValues.dateOfBirth}
                  name="dateOfBirth"
                  type="date"
                  className={styles.resetInput}
                  error={errors.dateOfBirth}
                />
              ) : (
                customerInfo?.dateOfBirth
              )}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.fieldName}>Email:</div>
            <div className={styles.fieldValue}>
              {editMode ? (
                <FormInput
                  onChange={handleChange}
                  value={inputValues.email}
                  name="email"
                  type="email"
                  className={styles.resetInput}
                  error={errors.email}
                />
              ) : (
                <span className={styles.ellipsis}>{customerInfo?.email}</span>
              )}
            </div>
          </div>
          <div className={styles.row + ' ' + styles.buttonsWrapper}>
            {editMode && (
              <button className="button" onClick={updateMainInfo}>
                Save
              </button>
            )}
            {editMode && (
              <button
                className="button"
                onClick={() => {
                  setEditMode(false)
                  if (customerInfo) {
                    setInputValues({
                      firstName: customerInfo.firstName!,
                      lastName: customerInfo.lastName!,
                      dateOfBirth: customerInfo.dateOfBirth!,
                      email: customerInfo.email,
                    })
                  }
                  setErrors({
                    firstName: '',
                    lastName: '',
                    email: '',
                    dateOfBirth: '',
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
        </div>

        <h3>
          {customerInfo?.addresses.length
            ? 'Addresses:'
            : 'No addresses here yet. Let’s add your first one!'}
        </h3>

        <AddAddress />
        <div className={styles.addressesContainer}>
          {customerInfo?.addresses
            ?.map((item) => {
              return (
                <ProfileAddressComponent
                  key={item.id}
                  address={item}
                  customerInfo={customerInfo}
                />
              )
            })
            .reverse()}
        </div>

        <PasswordChange />
      </div>
    </div>
  )
}
