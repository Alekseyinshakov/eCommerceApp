import { Link, NavLink, useNavigate } from 'react-router-dom'
import styles from './Header.module.scss'
import { useAuthStore } from '@store/authStore'
import { useEffect, useRef, useState } from 'react'

const {
  headerContainer,
  logo,
  navList,
  navItem,
  activeLink,
  rightSide,
  search,
  cart,
  burgerMenu,
  open,
} = styles

function Header() {
  const navigate = useNavigate()
  const setEmail = useAuthStore((state) => state.setEmail)

  const email = useAuthStore((state) => state.email)

  const handleLogout = () => {
    setEmail(null)
    navigate('/log-in')
  }

  const [isOpen, setIsOpen] = useState(false)
  const navRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const handleMenuClose = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleMenuClose)
    return () => {
      document.removeEventListener('mousedown', handleMenuClose)
    }
  }, [])

  return (
    <header>
      <div className={`container ${headerContainer}`}>
        <div className={logo}>
          <NavLink to="/home">
            <img src="images/Logo.svg" alt="logo" width={150} height={35} />
          </NavLink>
        </div>
        <nav className={`${isOpen ? open : ''}`} ref={navRef}>
          <ul className={navList}>
            <li className={navItem}>
              <NavLink
                className={({ isActive }) => (isActive ? activeLink : '')}
                to="/home"
                onClick={() => setIsOpen(false)}
              >
                Home
              </NavLink>
            </li>
            <li className={navItem}>
              <NavLink
                className={({ isActive }) => (isActive ? activeLink : '')}
                to="/shop"
                onClick={() => setIsOpen(false)}
              >
                Shop
              </NavLink>
            </li>
            <li className={navItem}>
              <NavLink
                className={({ isActive }) => (isActive ? activeLink : '')}
                to="/about"
                onClick={() => setIsOpen(false)}
              >
                About
              </NavLink>
            </li>
            <li className={navItem}>
              <NavLink
                className={({ isActive }) => (isActive ? activeLink : '')}
                to="/plant-care"
                onClick={() => setIsOpen(false)}
              >
                Plant Care
              </NavLink>
            </li>
          </ul>
          <button
            className={`${burgerMenu}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span></span>
          </button>
        </nav>
        <div className={rightSide}>
          <button className={search}></button>
          <Link to="/cart" className={cart}>
            <img src="images/icons/cart-icon.svg" alt="cart" />
          </Link>
          {email ? (
            <>
              <div className={styles.userEmail}>{email}</div>
              <button onClick={handleLogout} className="button btn-logout">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/log-in" className="button">
                Login
              </Link>
              <Link to="/sign-up" className="button">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
