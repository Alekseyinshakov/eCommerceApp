import { Link, NavLink } from 'react-router-dom'
import styles from './Header.module.scss'
import logoSvg from '../../../public/images/Logo.svg'
import findIcon from '../../../public/images/icons/find-icon.svg'
import cartIcon from '../../../public/images/icons/cart-icon.svg'

const { header, logo, navList, navItem, activeLink, rightSide, search, cart } =
  styles

function Header() {
  return (
    <header className={header}>
      <img className={logo} src={logoSvg} alt="logo" />
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
          <img src={findIcon} alt="search" />
        </div>
        <Link to="/cart" className={cart}>
          <img src={cartIcon} alt="cart" />
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
