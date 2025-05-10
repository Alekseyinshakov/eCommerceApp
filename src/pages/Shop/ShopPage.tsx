import { TestRequestButton } from '@components/TestRequestButton'
import styles from './ShopPage.module.scss'

export function ShopPage() {
  return (
    <div className="container">
      <h2 className={styles.title}>Shop</h2>
      <p className={styles.text}>Welcome to the shop!</p>
      <TestRequestButton />
    </div>
  )
}
