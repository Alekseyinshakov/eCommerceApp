/* eslint-disable react/prop-types */
import { useState } from 'react'
import { NotificationContext } from './NotifficationContext'
import styles from './Notiffication.module.scss'

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}): React.ReactElement => {
  const [showNotification, setShowNotification] = useState(false)
  const [message, setMessage] = useState('')

  const setNotification = (message: string) => {
    setMessage(message)
    setShowNotification(true)
    setTimeout(() => {
      setShowNotification(false)
    }, 3000)
  }

  const deleteNotification = () => {
    setShowNotification(false)
  }

  return (
    <NotificationContext.Provider
      value={{ showNotification, message, setNotification, deleteNotification }}
    >
      {children}
      {showNotification && <div className={styles.notification}>{message}</div>}
    </NotificationContext.Provider>
  )
}
