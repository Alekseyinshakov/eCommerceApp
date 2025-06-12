import { LineItem } from '@commercetools/platform-sdk'
import styles from './CartItem.module.scss'

export const CartItem = ({ item }: { item: LineItem }) => {
  console.log(item)

  const imageUrl = item.variant.images?.[0]?.url || 'default-image.jpg'

  return (
    <div key={item.id} className={styles.cartItem}>
      {/* <h3>{item.name['en-US']}</h3>
      <p>
        Price: ${(item.price.value.centAmount / 100).toFixed(2)}{' '}
        {item.price.value.currencyCode}
      </p>
      <p>Quantity: {item.quantity}</p> */}

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
          <button>-</button>
          <span>{item.quantity}</span>
          <button>+</button>
        </div>
        <div className={styles.total}>{item.totalPrice.centAmount / 100}</div>
        <div className={styles.delete}>🗑</div>
      </div>
    </div>
  )
}
