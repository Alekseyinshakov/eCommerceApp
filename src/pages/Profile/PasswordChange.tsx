import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import styles from './ProfilePage.module.scss'
import FormInput from '@components/FormInput/FormInput'
import { validatePassword } from '@hooks/useFormValidators'
import { useNotification } from '@components/Notification/NotifficationContext.tsx'
import { changePassword } from '@api/changePassword'
import { useAuthStore } from '@store/authStore'
import { loginCustomer } from '@api/auth'

export const PasswordChange = () => {
  const navigate = useNavigate()
  const { setNotification } = useNotification()
  const setUser = useAuthStore((state) => state.setUser)
  const [editMode, setEditMode] = useState(false)
  const [inputValues, setInputValues] = useState({
    prevPassword: '',
    password: '',
    confirmPassword: '',
  })

  const [errors, setErrors] = useState({
    password: '',
    confirmPassword: '',
  })

  const handleSubmit = async () => {
    const hasErrors = errors.password || errors.confirmPassword

    if (hasErrors) {
      setNotification('Fill in the fields with correct data')
    } else {
      try {
        const customer = await changePassword(
          inputValues.prevPassword,
          inputValues.password
        )
        if (customer) {
          setNotification('Password successfully updated')
          setEditMode(false)

          localStorage.removeItem('customer_token')

          const updatedCustomer = await loginCustomer(
            customer.email,
            inputValues.password
          )

          if (updatedCustomer) {
            setUser(updatedCustomer)
            navigate('/profile')
          }
        }
      } catch (error) {
        if (error && typeof error === 'object' && 'message' in error) {
          setNotification((error as { message: string }).message)
        } else {
          setNotification('Error updating password')
        }
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setInputValues((prev) => {
      const updated = { ...prev, [name]: value }

      const updatedErrors = {
        ...errors,

        password:
          name === 'password' ? validatePassword(value) : errors.password,
        confirmPassword:
          name === 'confirmPassword' || name === 'password'
            ? updated.password !== updated.confirmPassword
              ? 'Passwords do not match'
              : ''
            : errors.confirmPassword,
      }

      setErrors(updatedErrors)

      return updated
    })
  }

  return (
    <div className={styles.passChangeWrap}>
      {!editMode && (
        <div className={styles.buttonCenter}>
          <button
            className="button"
            onClick={() => {
              setEditMode(true)
            }}
          >
            Change password
          </button>
        </div>
      )}

      {editMode && (
        <div className={styles.colWrap}>
          <div className={styles.row}>
            <p className={styles.fieldName}>Current pass:</p>
            <p className={styles.fieldValue}>
              <FormInput
                onChange={handleChange}
                value={inputValues.prevPassword}
                name="prevPassword"
                type="text"
                className={styles.resetInput}
              />
            </p>
          </div>

          <div className={styles.row}>
            <p className={styles.fieldName}>New:</p>
            <p className={styles.fieldValue}>
              <FormInput
                onChange={handleChange}
                value={inputValues.password}
                name="password"
                type="text"
                className={styles.resetInput}
                error={errors.password}
              />
            </p>
          </div>

          <div className={styles.row}>
            <p className={styles.fieldName}>Repeat:</p>
            <p className={styles.fieldValue}>
              <FormInput
                onChange={handleChange}
                value={inputValues.confirmPassword}
                name="confirmPassword"
                type="text"
                className={styles.resetInput}
                error={errors.confirmPassword}
              />
            </p>
          </div>
          <div className={styles.buttonsContainer}>
            <button
              className="button"
              onClick={() => {
                handleSubmit()
              }}
            >
              Save
            </button>
            <button
              className="button"
              onClick={() => {
                setEditMode(false)
                setErrors({
                  password: '',
                  confirmPassword: '',
                })
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
