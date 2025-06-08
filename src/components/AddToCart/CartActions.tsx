import { useState } from 'react'
import styles from './CartItem.module.scss'
import { createAnonymousCart } from '@api/createCart'
type CartProps = {
  productId: string
  variantId: number
}

const CartActions = ({ productId, variantId }: CartProps) => {
  const [quantity, setQuantity] = useState(1)
  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1)
  }
  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
  }

  const handleAddToCart = async () => {
    const isLogged = localStorage.getItem('customer_token') ?? false

    if (isLogged) {
      return
    } else {
      await createAnonymousCart({ productId, variantId, quantity })
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.quantity}>
        <button onClick={decreaseQuantity}>-</button>
        <input type="number" value={quantity} readOnly />
        <button onClick={increaseQuantity}>+</button>
      </div>
      <button className="button" onClick={handleAddToCart}>
        Add to cart
      </button>
    </div>
  )
}

export default CartActions
