import styles from './CartPage.module.scss'

export function CartPage() {
  return (
    <div className="container">
      <h2 className={styles.title}>Cart</h2>
      <p className={styles.text}>Your cart is empty!</p>
    </div>
  )
}
