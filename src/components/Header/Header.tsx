import { Link, NavLink } from 'react-router-dom'
import styles from './Header.module.scss'

const { header, logo, navList, navItem, activeLink, rightSide, search, cart } =
  styles

function Header() {
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
              to="/plat-care"
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
        <Link to="/log-in" className="button">
          Login
        </Link>
        <Link to="/sign-up" className="button">
          Register
        </Link>
        <Link to="/sign-up" className={`button btn-logut`}>
          Logout
        </Link>
      </div>
    </header>
  )
}

export default Header
