import { CartItem } from './CartItem/CartItem'
import styles from './CartPage.module.scss'
import { useCartStore } from '@store/cartStore'

export const CartPage = () => {
  const { cart } = useCartStore()

  return (
    <div className="container">
      <h2 className={styles.title}>Cart</h2>

      <div className={styles.cartWrapper}>
        <div className={styles.productsList}>
          {cart && cart.lineItems.length > 0 ? (
            <p className={styles.text}>
              You have {cart.lineItems.length} items in your cart.
            </p>
          ) : (
            <p className={styles.text}>Your cart is empty.</p>
          )}

          {cart &&
            cart.lineItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
        </div>
        <div className={styles.totalBlock}>total block</div>
      </div>
    </div>
  )
}
