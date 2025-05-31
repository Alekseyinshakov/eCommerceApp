import { useState } from 'react'
import styles from './ProfilePage.module.scss'
import FormInput from '@components/FormInput/FormInput'

export const PasswordChange = () => {
  const [editMode, setEditMode] = useState(false)
  const [inputValues] = useState({
    prevPassword: '',
    newPassword: '',
    newPasswordRepeat: '',
  })

  const handleChange = () => {}

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
            <div className={styles.fieldName}>Current pass:</div>
            <div className={styles.fieldValue}>
              <FormInput
                onChange={handleChange}
                value={inputValues.prevPassword}
                name="prevPassword"
                type="text"
                className={styles.resetInput}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.fieldName}>New:</div>
            <div className={styles.fieldValue}>
              <FormInput
                onChange={handleChange}
                value={inputValues.newPassword}
                name="newPassword"
                type="text"
                className={styles.resetInput}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.fieldName}>Repeat:</div>
            <div className={styles.fieldValue}>
              <FormInput
                onChange={handleChange}
                value={inputValues.newPasswordRepeat}
                name="newPasswordRepeat"
                type="text"
                className={styles.resetInput}
              />
            </div>
          </div>
          <div className={styles.buttonsContainer}>
            <button className="button">Save</button>
            <button
              className="button"
              onClick={() => {
                setEditMode(false)
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
