import { CartItem } from './CartItem/CartItem'
import styles from './CartPage.module.scss'
import { useCartStore } from '@store/cartStore'
import { Link } from 'react-router-dom'

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
            <div>
              <p className={styles.text}>Your cart is empty.</p>
              <Link className="button" to="/shop">
                SHOP NOW
              </Link>
            </div>
          )}

          {cart && cart.lineItems.length > 0 && (
            <div className={styles.cartHeader}>
              <div className={styles.productInfo}>Product</div>
              <div className={styles.price}>Price</div>
              <div className={styles.quantity}>Quantity</div>
              <div className={styles.total}>Total</div>
              <div className={styles.delete}>Delete</div>
            </div>
          )}
          {cart &&
            cart.lineItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
        </div>

        <div className={styles.totalBlock}>
          <h5 className={styles.totalTitle}>Cart Totals</h5>
          <div className={styles.cuponApply}>Coupon Apply</div>
          <div className={styles.discountBlock}>
            <input
              placeholder="Enter coupon code here..."
              type="text"
              name=""
              id=""
            />
            <button className="button">Apply</button>
          </div>
          <div className={styles.totalRow}>
            <span>Total:</span>
            <div className={styles.totalPrice}>
              $
              {cart && cart.totalPrice
                ? (cart.totalPrice.centAmount / 100).toFixed(2)
                : '0.00'}
            </div>
          </div>
          <button className={'button' + ' ' + styles.checkoutButton}>
            Proceed to Checkout
          </button>
          <button className={'button' + ' ' + styles.continueShopping}>
            Continue shopping
          </button>
        </div>
      </div>
    </div>
  )
}
