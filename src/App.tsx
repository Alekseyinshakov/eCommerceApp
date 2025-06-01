import { Outlet } from 'react-router-dom'
import '@assets/styles/global.scss'
import Header from '@components/Header/Header'
import Footer from '@components/Footer/Footer'

import { NotificationProvider } from '@components/Notification/UseNotification'

const App = () => {
  return (
    <NotificationProvider>
      <div className="layout">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </NotificationProvider>
  )
}

export default App
