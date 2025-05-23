import Header from '@components/Header/Header'
import styles from './ErrorPage.module.scss'
import { Link } from 'react-router-dom'

const { title, text } = styles

export const ErrorPage = () => {
  return (
    <div className="container">
      <Header />
      <h2 className={title}>404 — Page Not Found 😕</h2>
      <p className={text}>Sorry, the page you’re looking for doesn’t exist.</p>
      <Link className="button" to="/home">
        To home
      </Link>
    </div>
  )
}
