import { Outlet } from 'react-router-dom'
import '@assets/styles/global.scss'
import Header from '@components/Header/Header'

function App() {
  return (
    <div>
      <div className="container">
        <Header />
        <Outlet />
      </div>
    </div>
  )
}

export default App
