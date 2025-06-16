import styles from './CartItem.module.scss'
import { addItemToCart } from '@api/addItemToCart'
import { removeFromCart } from '@api/removeFromCart'
import { useNotification } from '@components/Notification/NotifficationContext'
import { useCartStore } from '@store/cartStore'

type CartProps = {
  productId: string
  variantId: number
}

const QUANTITY_DEFAULT = 1

const CartActions = ({ productId, variantId }: CartProps) => {
  const { cart, setCart } = useCartStore()
  const { setNotification } = useNotification()

  const productInCart = cart?.lineItems.find((p) => p.productId === productId)

  const cartData = localStorage.getItem('cart_data')

  const handleAddToCart = async () => {
    try {
      const cartResponseData = await addItemToCart({
        productId,
        variantId,
        quantity: QUANTITY_DEFAULT,
      })
      if (cartResponseData) {
        setCart(cartResponseData)
        setNotification('Item added to cart')
      }
    } catch (error) {
      console.error('Error creating anonymous cart:', error)
      setNotification("The product can't be added to the cart")
    }
  }

  const handleRemoveFromCart = async () => {
    try {
      if (productInCart && cartData) {
        const updateResponse = await removeFromCart(
          {
            productId: productId,
            variantId: variantId,
            quantity: productInCart.quantity,
          },
          productInCart.id,
          cartData
        )
        setCart(updateResponse)
        setNotification('Item removed from cart')
      }
    } catch (error) {
      console.error('Failed to remove item from cart:', error)
      setNotification('It is not possible to remove the item from the cart')
    }
  }

  return (
    <div className={styles.wrapper}>
      {productInCart ? (
        <button
          className="button btn-cartAction"
          onClick={handleRemoveFromCart}
        >
          Remove from cart
        </button>
      ) : (
        <button className="button btn-cartAction" onClick={handleAddToCart}>
          Add to cart
        </button>
      )}
    </div>
  )
}

export default CartActions
