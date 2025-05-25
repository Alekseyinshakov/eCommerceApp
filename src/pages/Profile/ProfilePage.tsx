import { useEffect, useState } from 'react'
import styles from './ProfilePage.module.scss'

export const ProfilePage = () => {
  const [fields, setFields] = useState([
    { label: 'First name:', value: 'John' },
    { label: 'Last name:', value: 'Doe' },
    { label: 'Date of birth:', value: '1990-01-01' },
    { label: 'Email:', value: 'jd@mail.com' },
  ])
  setFields([])
  useEffect(() => {
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

        <div className={styles.buttonsWrap}>
          <button>Edit</button>
          <button>Save</button>
          <button>Cancel</button>
        </div>
      </div>
    </div>
  )
}
