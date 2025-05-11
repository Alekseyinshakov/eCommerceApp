import { Link, NavLink, useNavigate } from 'react-router-dom'
import styles from './Header.module.scss'
import { useAuthStore } from '../../store/authStore'

const { header, logo, navList, navItem, activeLink, rightSide, search, cart } =
  styles

function Header() {
  const navigate = useNavigate()
  const setEmail = useAuthStore((state) => state.setEmail)

  const email = useAuthStore((state) => state.email)

  const handleLogout = () => {
    setEmail(null)
    navigate('/log-in')
  }

  return (
    <header className={header}>
      <img className={logo} src="images/Logo.svg" alt="logo" />
      <nav>
        <ul className={navList}>
          <li className={navItem}>
            <NavLink
              className={({ isActive }) => (isActive ? activeLink : '')}
              to="/home"
            >
              Home
            </NavLink>
          </li>
          <li className={navItem}>
            <NavLink
              className={({ isActive }) => (isActive ? activeLink : '')}
              to="/shop"
            >
              Shop
            </NavLink>
          </li>
          <li className={navItem}>
            <NavLink
              className={({ isActive }) => (isActive ? activeLink : '')}
              to="/about"
            >
              About
            </NavLink>
          </li>
          <li className={navItem}>
            <NavLink
              className={({ isActive }) => (isActive ? activeLink : '')}
              to="/plant-care"
            >
              Plant Care
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={rightSide}>
        <div className={search}>
          <img src="images/icons/find-icon.svg" alt="search" />
        </div>
        <Link to="/cart" className={cart}>
          <img src="images/icons/cart-icon.svg" alt="cart" />
        </Link>
        {!email && (
          <Link to="/log-in" className="button">
            Login
          </Link>
        )}
        {!email && (
          <Link to="/sign-up" className="button">
            Register
          </Link>
        )}
        <div>{email}</div>
        {email && (
          <button onClick={handleLogout} className={`button btn-logout`}>
            Logout
          </button>
        )}
      </div>
    </header>
  )
}

export default Header
