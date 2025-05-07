import { Link, NavLink } from 'react-router-dom'
import styles from './Heade.module.scss'
import logoSvg from '@assets/images/Logo.svg'
import findIcon from '@assets/images/header/find-icon.svg'
import cartIcon from '@assets/images/header/cart-icon.svg'
import exitIcon from '@assets/images/header/logout-icon.svg'

function Header() {
  return (
    <header className={styles.header}>
      <img src={logoSvg} alt="logo" />
      <nav>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <NavLink
              className={({ isActive }) => (isActive ? styles.activeLink : '')}
              to="/home"
            >
              Home
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              className={({ isActive }) => (isActive ? styles.activeLink : '')}
              to="/shop"
            >
              Shop
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              className={({ isActive }) => (isActive ? styles.activeLink : '')}
              to="/about"
            >
              About
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              className={({ isActive }) => (isActive ? styles.activeLink : '')}
              to="/plat-care"
            >
              Plant Care
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={styles.rightSide}>
        <div className={styles.search}>
          <img src={findIcon} alt="search" />
        </div>
        <Link to="/cart" className={styles.cart}>
          <img src={cartIcon} alt="cart" />
        </Link>
        <Link to="/log-in" className="button">
          Login
        </Link>
        <Link to="/sign-up" className="button">
          Register
        </Link>
        <Link to="/sign-up" className="button">
          <img src={exitIcon} alt="exit" />
          Logout
        </Link>
      </div>
    </header>
  )
}

export default Header
