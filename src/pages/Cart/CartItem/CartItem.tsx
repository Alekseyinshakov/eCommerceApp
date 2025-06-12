import { LineItem } from '@commercetools/platform-sdk'
import styles from './CartItem.module.scss'
import { useCartStore } from '@store/cartStore'
import { useNotification } from '@components/Notification/NotifficationContext'
import { removeFromCart } from '@api/removeFromCart'
import { createCart } from '@api/createCart'

export const CartItem = ({ item }: { item: LineItem }) => {
  const { cart, setCart } = useCartStore()
  const { setNotification } = useNotification()

  console.log(item)

  const productInCart = cart?.lineItems.find(
    (p) => p.productId === item.productId
  )
  const cartData = localStorage.getItem('cart_data')

  const imageUrl = item.variant.images?.[0]?.url || 'default-image.jpg'

  const deleteHandler = () => {
    console.log('Delete item:', item.id)

    if (productInCart && cartData) {
      removeFromCart(
        {
          productId: item.productId,
          variantId: item.variant.id,
          quantity: productInCart.quantity,
        },
        productInCart.id,
        cartData
      )
        .then((updateResponse) => {
          setCart(updateResponse)
          setNotification('Item removed from cart')
        })
        .catch((error) => {
          console.error('Error removing item from cart:', error)
          setNotification("The product can't be removed from the cart")
        })
    }
  }

  const decrementHandler = () => {
    if (productInCart && cartData) {
      removeFromCart(
        {
          productId: item.productId,
          variantId: item.variant.id,
          quantity: 1,
        },
        productInCart.id,
        cartData
      )
        .then((updateResponse) => {
          setCart(updateResponse)
          setNotification('Item quantity decremented in cart')
        })
        .catch((error) => {
          console.error('Error decrementing item in cart:', error)
          setNotification("The product can't be decremented in the cart")
        })
    }
  }

  const incrementHandler = () => {
    console.log('Increment item:', item.id)
    if (productInCart && cartData) {
      createCart({
        productId: item.productId,
        variantId: item.variant.id,
        quantity: 1,
      })
        .then((updateResponse) => {
          setCart(updateResponse)
          setNotification('Item quantity incremented in cart')
        })
        .catch((error) => {
          console.error('Error incrementing item in cart:', error)
          setNotification("The product can't be incremented in the cart")
        })
    }
  }

  return (
    <div key={item.id} className={styles.cartItem}>
      <div className={styles.cartRow}>
        <div className={styles.productInfo}>
          <img src={imageUrl} alt="Barberton Daisy" />
          <div className={styles.productDetails}>
            <div className={styles.name}>{item.name['en-US']}</div>
            <div className={styles.sku}>SKU: {item.variant.sku}</div>
          </div>
        </div>
        <div className={styles.price}>
          ${(item.price.value.centAmount / 100).toFixed(2)}{' '}
        </div>
        <div className={styles.quantity}>
          <button
            onClick={() => {
              decrementHandler()
            }}
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button
            onClick={() => {
              incrementHandler()
            }}
          >
            +
          </button>
        </div>
        <div className={styles.total}>${item.totalPrice.centAmount / 100}</div>
        <div className={styles.delete}>
          <img
            onClick={() => {
              deleteHandler()
            }}
            src="images/icons/delete-icon.svg"
            alt="delete icon"
          />
        </div>
      </div>
    </div>
  )
}
