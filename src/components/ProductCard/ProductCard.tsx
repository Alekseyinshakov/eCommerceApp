import { Link } from 'react-router-dom'
import styles from './ProductCard.module.scss'
import ProductPrice from '@components/ProductPrice/ProductPrice'
import DiscountElement from '@components/DiscountElement/DiscountElement'
const { mainBlock, img, text, nameItem } = styles

type ProductCardProps = {
  slug: string
  name: string
  price: number
  discountPrice: number
  discountId: string
  image: string
  description: string
}

export const ProductCard = ({
  slug,
  name,
  price,
  discountPrice,
  discountId,
  image,
  description,
}: ProductCardProps) => {
  return (
    <Link to={`/shop/${slug}`}>
      <div className={mainBlock}>
        {discountId ? (
          <div className={styles.discount}>
            <DiscountElement discountId={discountId ?? ''} />
          </div>
        ) : null}
        <img src={image} alt={name} className={img} />
        <div className={styles.description}>
          <p className={styles.descriptionText}>{description}</p>
        </div>
        <div className={text}>
          <p className={nameItem}>{name}</p>
          <ProductPrice price={price} discountedPrice={discountPrice} />
        </div>
      </div>
    </Link>
  )
}
