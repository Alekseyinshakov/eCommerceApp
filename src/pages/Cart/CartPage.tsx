import { useEffect, useState } from 'react'
import { CartItem } from './CartItem/CartItem'
import styles from './CartPage.module.scss'
import { useCartStore } from '@store/cartStore'
import { Link } from 'react-router-dom'
import { clearCart } from '@api/clearCart'
import { useNotification } from '@components/Notification/NotifficationContext'
import Loader from '@components/Loader/Loader'
import { useDiscountCodeStore } from '@store/discountCodeStore'
import { applyDiscountCode } from '@api/applyDiscountCode'
import classNames from 'classnames'
import { apiRoot } from '@api/apiClient'

const MESSAGE_ERROR = 'Invalid discount code'
const MESSAGE_SUCCESS = (code: string) => `Code "${code}" applied successfully`

export const CartPage = () => {
  const { cart, setCart, loading } = useCartStore()
  const { setNotification } = useNotification()

  const [clearMode, setClearMode] = useState(false)
  const [discountInput, setDiscountInput] = useState('')
  const [message, setMessage] = useState('')
  const [hasError, setHasError] = useState(false)

  const { activeCode, setActiveCode } = useDiscountCodeStore()

  useEffect(() => {
    const fetchAndSetDiscount = async () => {
      if (cart && cart.discountCodes.length > 0) {
        const discountID = cart.discountCodes[0]?.discountCode.id
        if (discountID) {
          try {
            const response = await apiRoot
              .discountCodes()
              .withId({ ID: discountID })
              .get()
              .execute()
            setDiscountInput(response.body.code)
            setActiveCode(response.body.code)
            setMessage(MESSAGE_SUCCESS(response.body.code))
          } catch (error) {
            console.error('Error fetching discount code by ID:', error)
            return null
          }
        }
      }
    }

    fetchAndSetDiscount()
  }, [cart, setDiscountInput, setActiveCode])

  useEffect(() => {
    if (discountInput.length === 0) {
      setMessage('')
      setActiveCode(null)
    }
  }, [discountInput, setActiveCode])

  const handlerApplyDiscount = async () => {
    if (!cart) {
      setMessage('Add products in cart')
      setHasError(true)
      return
    }

    if (cart && !discountInput) {
      setMessage('Please enter a discount code')
      setHasError(true)
      return
    }

    try {
      if (discountInput === activeCode) {
        return
      }

      const response = await applyDiscountCode(
        cart.id,
        cart.version,
        discountInput,
        'addDiscountCode'
      )
      setCart(response)
      setMessage(MESSAGE_SUCCESS(discountInput))
      setHasError(false)
    } catch {
      setMessage(MESSAGE_ERROR)
      setHasError(true)
      setActiveCode(null)
    }
    const discountCodeId = cart.discountCodes[0]?.discountCode?.id
    if (discountCodeId) {
      try {
        const response = await applyDiscountCode(
          cart.id,
          cart.version,
          { typeId: 'discount-code', id: discountCodeId },
          'removeDiscountCode'
        )
        setCart(response)
      } catch (error) {
        console.error('Error removing discount code:', error)
        return
      }
    }
  }

  if (loading) {
    return <Loader />
  }

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

          {cart && cart.lineItems.length > 0 && !clearMode && (
            <button
              onClick={() => {
                setClearMode(true)
              }}
              className={'button' + ' ' + styles.clearBtn}
            >
              Clear Shopping Cart
            </button>
          )}
          {clearMode && (
            <div className={styles.clearConfirmation}>
              <p>Are you sure you want to clear the cart?</p>
              <button
                className={'button' + ' ' + styles.confirmClear}
                onClick={() => {
                  const cartData = localStorage.getItem('cart_data')
                  if (!cartData) {
                    console.error('No cart data found in localStorage')
                    return
                  }
                  const { cartId, versionCart } = JSON.parse(cartData)

                  clearCart(cartId, versionCart)
                    .then((clearedCart) => {
                      setCart(clearedCart)
                      setNotification('Cart cleared successfully')
                    })
                    .catch((error) =>
                      console.error('Error clearing cart:', error)
                    )

                  setClearMode(false)
                }}
              >
                Yes
              </button>
              <button
                className={'button' + ' ' + styles.cancelClear}
                onClick={() => setClearMode(false)}
              >
                No
              </button>
            </div>
          )}
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
              value={discountInput}
              onChange={(e) => {
                setDiscountInput(e.target.value.trim())
                setMessage('')
              }}
            />
            <button className="button" onClick={handlerApplyDiscount}>
              Apply
            </button>
            <p
              className={classNames(styles.message, {
                [styles.errorMessage]: hasError,
              })}
            >
              {message}
            </p>
          </div>

          <div className={styles.totalRow}>
            {cart && cart.discountCodes.length > 0 && (
              <div className={styles.discountSummary}>
                <div className={styles.oldPrice}>
                  $
                  {(
                    ((cart?.discountOnTotalPrice?.discountedAmount
                      ?.centAmount ?? 0) +
                      (cart?.totalPrice?.centAmount ?? 0)) /
                    100
                  ).toFixed(2)}
                </div>
                <div className={styles.discountedAmount}>
                  -$
                  {(
                    (cart?.discountOnTotalPrice?.discountedAmount?.centAmount ??
                      0) / 100
                  ).toFixed(2)}
                </div>
              </div>
            )}
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
          <Link to="/shop" className={'button' + ' ' + styles.continueShopping}>
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
