import { Outlet } from 'react-router-dom'
import '@assets/styles/global.scss'
import Header from '@components/Header/Header'
import { NotificationProvider } from '@components/Notification/UseNotification'

function App() {
  return (
    <NotificationProvider>
      <div className="container">
        <Header />
        <Outlet />
      </div>
    </NotificationProvider>
  )
}

export default App
