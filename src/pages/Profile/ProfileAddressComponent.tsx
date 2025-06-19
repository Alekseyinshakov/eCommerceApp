import { updateAddress } from '@api/updateAddress'
import styles from './ProfilePage.module.scss'
import { Address, Customer } from '@commercetools/platform-sdk'
import FormInput from '@components/FormInput/FormInput'
import { CountryList } from '@pages/AuthForms/helpersCountry'
import { useState } from 'react'
import { useNotification } from '@components/Notification/NotifficationContext'
import { useAuthStore } from '@store/authStore.ts'
import { deleteAddress } from '@api/deleteAddress.ts'
import { updateError } from './helpers/updateError'
import { PROFILE_ERRORS } from '@constants'

export const ProfileAddressComponent = ({
  address,
  customerInfo,
}: {
  address: Address
  customerInfo: Customer | null
}) => {
  const setUser = useAuthStore((state) => state.setUser)

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

  const { setNotification } = useNotification()

  const [editMode, setEditMode] = useState(false)

  const [errors, setErrors] = useState(PROFILE_ERRORS)

  const DEFAULT_INPUT_VALUES = {
    id: address.id,
    country: address.country,
    city: address.city,
    street: address.streetName,
    postalCode: address.postalCode,
    shipping: isTypeShipping,
    billing: isTypeBilling,
    defaultShipping: isDefaultShipping,
    defaultBilling: isDefaultBilling,
  }

  const [inputValues, setInputValues] = useState(DEFAULT_INPUT_VALUES)

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

    const updatedErrors = updateError(errors, value, name)
    setErrors(updatedErrors)
    setInputValues(newValues)
  }

  const changeAddressHandler = async () => {
    const hasErrors =
      errors.country || errors.city || errors.street || errors.postalCode

    if (hasErrors) {
      setNotification('Fill in the fields with correct data')
    } else {
      try {
        const updatedCustomer = await updateAddress({
          ...inputValues,
          inSippingArray: isTypeShipping,
          inBillingArray: isTypeBilling,
        })
        setUser(updatedCustomer)
        setEditMode(false)
        setNotification('Information successfully updated')
      } catch (error) {
        console.error('Error updating customer info:', error)
        setNotification('Something went wrong :-(')
      }
    }
  }

  const deleteAddressHandler = async () => {
    try {
      const customer = await deleteAddress(address.id!)
      setUser(customer)
      setNotification('The address was successfully deleted.')
    } catch (error) {
      console.error('Error deleting customer info:', error)
      setNotification('Something went wrong :-(')
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
        <div className={styles.row}>
          <p className={styles.fieldName}>Country:</p>
          <p className={styles.fieldValue}>
            {editMode ? (
              <>
                <FormInput
                  name="country"
                  type="text"
                  className={styles.resetInput}
                  placeholder="Country"
                  list="country-list"
                  value={inputValues.country}
                  onChange={handleChange}
                  error={errors.country}
                />
                <CountryList />
              </>
            ) : (
              address.country
            )}
          </p>
        </div>

        <div className={styles.row}>
          <p className={styles.fieldName}>City:</p>
          <p className={styles.fieldValue}>
            {editMode ? (
              <FormInput
                name="city"
                type="text"
                className={styles.resetInput}
                placeholder="City"
                value={inputValues.city || ''}
                onChange={handleChange}
                error={errors.city}
              />
            ) : (
              address.city
            )}
          </p>
        </div>

        <div className={styles.row}>
          <p className={styles.fieldName}>Street:</p>
          <p className={styles.fieldValue}>
            {editMode ? (
              <FormInput
                name="street"
                type="text"
                className={styles.resetInput}
                placeholder="Street Address"
                value={inputValues.street || ''}
                onChange={handleChange}
                error={errors.street}
              />
            ) : (
              address.streetName
            )}
          </p>
        </div>

        <div className={styles.row}>
          <p className={styles.fieldName}>Postal code:</p>
          <p className={styles.fieldValue}>
            {editMode ? (
              <FormInput
                name="postalCode"
                type="text"
                className={styles.resetInput}
                placeholder="Postal Code"
                value={inputValues.postalCode || ''}
                onChange={handleChange}
                error={errors.postalCode}
              />
            ) : (
              address.postalCode
            )}
          </p>
        </div>
        {editMode && (
          <div className={styles.row}>
            <p className={styles.fieldName}>Shipping:</p>
            <p className={styles.fieldValue}>
              <input
                type="checkbox"
                name="shipping"
                checked={inputValues.shipping}
                onChange={handleChange}
              />
              <span className={styles.defaultSpan}>Default:</span>
              <input
                type="checkbox"
                name="defaultShipping"
                checked={inputValues.defaultShipping}
                disabled={!inputValues.shipping}
                onChange={handleChange}
              />
            </p>
          </div>
        )}

        {editMode && (
          <div className={styles.row}>
            <p className={styles.fieldName}>Billing:</p>
            <p className={styles.fieldValue}>
              <input
                type="checkbox"
                name="billing"
                checked={inputValues.billing}
                onChange={handleChange}
              />
              <span className={styles.defaultSpan}>Default:</span>
              <input
                type="checkbox"
                name="defaultBilling"
                checked={inputValues.defaultBilling}
                disabled={!inputValues.billing}
                onChange={handleChange}
              />
            </p>
          </div>
        )}
        <div className={styles.buttonsContainer}>
          {editMode && (
            <button
              onClick={() => {
                changeAddressHandler()
              }}
              className="button"
            >
              Save
            </button>
          )}
          {!editMode && (
            <button
              onClick={() => {
                setEditMode(true)
              }}
              className="button"
            >
              Edit
            </button>
          )}
          {editMode && (
            <button
              onClick={() => {
                setEditMode(false)
                setInputValues(DEFAULT_INPUT_VALUES)
                setErrors(PROFILE_ERRORS)
              }}
              className="button"
            >
              Cancel
            </button>
          )}
          <button className="button" onClick={deleteAddressHandler}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
