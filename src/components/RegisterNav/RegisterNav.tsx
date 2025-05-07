import { Link } from 'react-router-dom'
import './RegisterNav.scss'

export function RegisterNav() {
  return (
    <div className="navigate-block">
      <Link to="/log-in" className="link active">
        Login
      </Link>

      <div className="navigate-border"></div>

      <Link to="/sign-up" className="link">
        Register
      </Link>
    </div>
  )
}
