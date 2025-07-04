import { Link, NavLink, useNavigate } from 'react-router-dom'
import styles from './Header.module.scss'
import { useAuthStore } from '@store/authStore'
import { useEffect, useRef, useState } from 'react'
import { useCartStore } from '@store/cartStore'

const {
  headerContainer,
  logo,
  navList,
  navItem,
  activeLink,
  rightSide,
  cartStyle,
  burgerMenu,
  open,
  centerMob,
  hederElem,
  cartCountStyle,
} = styles

const routes = [
  { path: '/home', label: 'Home' },
  { path: '/shop', label: 'Shop' },
  { path: '/about', label: 'About' },
  { path: '/plant-care', label: 'Plant Care' },
]

const Header = () => {
  const navigate = useNavigate()
  const setUser = useAuthStore((state) => state.setUser)
  const { cart, setCart } = useCartStore()

  const cartCount = cart?.lineItems.reduce(
    (total, item) => total + item.quantity,
    0
  )

  const email = useAuthStore((state) => state.user?.email)

  const handleLogout = () => {
    setUser(null)
    setCart(null)
    localStorage.removeItem('cart_data')
    navigate('/log-in')
  }

  const [isOpen, setIsOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

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
            <img src="images/Logo.svg" alt="logo" />
          </NavLink>
        </div>
        <div className={centerMob}>
          <div className={hederElem}>
            <div className={rightSide}>
              <Link to="/cart" className={cartStyle}>
                <img src="images/icons/cart-icon.svg" alt="cart" />
                {cartCount ? (
                  <span className={cartCountStyle}>{cartCount}</span>
                ) : null}
              </Link>
              {email ? (
                <>
                  <Link to="/profile" className={styles.userEmail}>
                    {email}
                  </Link>
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
              <nav ref={navRef} className={`${isOpen ? open : ''}`}>
                <ul className={navList}>
                  {routes.map(({ path, label }) => (
                    <li key={label} className={navItem}>
                      <NavLink
                        className={({ isActive }) =>
                          isActive ? activeLink : ''
                        }
                        to={path}
                        onClick={() => setIsOpen(false)}
                      >
                        {label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
                <button
                  className={burgerMenu}
                  onClick={() => setIsOpen(!isOpen)}
                >
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
