import { Link, useLocation } from 'react-router-dom'
import './RegisterNav.scss'

export const RegisterNav = () => {
  const location = useLocation()
  const currentPath = location.pathname

  return (
    <div className="navigate-block">
      <Link
        to="/log-in"
        className={`link ${currentPath === '/log-in' ? 'active' : ''}`}
      >
        Login
      </Link>
      <div className="navigate-border"></div>
      <Link
        to="/sign-up"
        className={`link ${currentPath === '/sign-up' ? 'active' : ''}`}
      >
        Register
      </Link>
    </div>
  )
}
