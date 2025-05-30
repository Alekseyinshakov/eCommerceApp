import styles from './ProductPrice.module.scss'
type Price = {
  price: number
  discountedPrice?: number
  discountPercent?: number
}

const ProductPrice = ({ price, discountedPrice }: Price) => {
  return (
    <p className={styles.price}>
      Price:{' '}
      {discountedPrice ? (
        <>
          <span className={styles.priceRegular}>{price}$</span>
          <span className={styles.priceDiscount}>{discountedPrice}$</span>
        </>
      ) : (
        <span className={styles.price}>{price}$</span>
      )}
    </p>
  )
}

export default ProductPrice
