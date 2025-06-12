import styles from './CartPage.module.scss'
import { useCartStore } from '@store/cartStore'

export const CartPage = () => {
  const { cart } = useCartStore()

  return (
    <div className="container">
      <h2 className={styles.title}>Cart</h2>
      {cart && cart.lineItems.length > 0 ? (
        <p className={styles.text}>
          You have {cart.lineItems.length} items in your cart.
        </p>
      ) : (
        <p className={styles.text}>Your cart is empty.</p>
      )}

      {cart &&
        cart.lineItems.map((item) => (
          <div key={item.id} className={styles.cartItem}>
            <h3>{item.name['en-US']}</h3>
            <p>
              Price: ${(item.price.value.centAmount / 100).toFixed(2)}{' '}
              {item.price.value.currencyCode}
            </p>
            <p>Quantity: {item.quantity}</p>
          </div>
        ))}
    </div>
  )
}
