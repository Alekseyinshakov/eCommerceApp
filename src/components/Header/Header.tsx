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
  centerMob,
  hederElem,
} = styles

function Header() {
  const navigate = useNavigate()
  const setUser = useAuthStore((state) => state.setUser)

  const email = useAuthStore((state) => state.user?.email)

  const handleLogout = () => {
    setUser(null)
    navigate('/log-in')
  }

  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  const handleToggleMenu = () => {
    if (isOpen) {
      setIsOpen(false)
      setTimeout(() => {
        setIsMounted(false)
      }, 300)
    } else {
      setIsMounted(true)
      setTimeout(() => {
        setIsOpen(true)
      }, 10)
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 995) {
        setIsOpen(false)
        setIsMounted(false)
        document.body.style.overflow = 'auto'
      }
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target as Node) &&
        window.innerWidth <= 995
      ) {
        setIsOpen(false)
        setTimeout(() => {
          setIsMounted(false)
        }, 300)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
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
        <div className={centerMob}>
          <div className={hederElem}>
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
            <div>
              <nav
                ref={navRef}
                className={`${isMounted ? styles.mounted : ''} ${isOpen ? open : ''}`}
              >
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
                <button className={burgerMenu} onClick={handleToggleMenu}>
                  <span></span>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
