import Header from '@components/Header/Header'
import styles from './ErrorPage.module.scss'
import { Link, Links } from 'react-router-dom'

const { title, text } = styles

export function ErrorPage() {
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
