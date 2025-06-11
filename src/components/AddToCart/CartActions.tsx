import styles from './CartItem.module.scss'
import { createCart } from '@api/createCart'
type CartProps = {
  productId: string
  variantId: number
}

const QUANTITY_DEFAULT = 1

const CartActions = ({ productId, variantId }: CartProps) => {
  // const [quantity, setQuantity] = useState(1)
  // const increaseQuantity = () => {
  //   setQuantity((prev) => prev + 1)
  // }
  // const decreaseQuantity = () => {
  //   setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
  // }

  // const { productCart } = useCartStore
  // const productInCart = productCart.filter(p => p.id === productId)

  // const cartData = localStorage.getItem('cart_data')

  const handleAddToCart = async () => {
    await createCart({ productId, variantId, quantity: QUANTITY_DEFAULT })
  }

  // const handleRemoveFromCart = async() => {

  //   const item = {
  //     productId: productId,
  //     variantId: variantId,
  //     quantity: productInCart.quantity
  //   }
  //   const lineItemId = productInCart.lineItemId

  //   if(cartData){
  //     isLogged ? null : await removeFromAnonymousCart(item, lineItemId, cartData)
  //   }
  // }

  return (
    <div className={styles.wrapper}>
      {/* <div className={styles.quantity}>
        <button onClick={decreaseQuantity}>-</button>
        <input type="number" value={quantity} readOnly />
        <button onClick={increaseQuantity}>+</button>
      </div> */}

      {/* {productInCart ? (
        <button className="button" onClick={handleRemoveFromCart}>
          Remove from cart
        </button>
      ) : ( */}
      <button className="button" onClick={handleAddToCart}>
        Add to cart
      </button>
      {/* )} */}
    </div>
  )
}

export default CartActions
