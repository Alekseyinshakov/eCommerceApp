import { createContext, useContext } from 'react'
import { NotificationContextType } from 'types'

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined)

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) throw new Error('Notification context is undefined')
  return context
}
