import { Link } from 'react-router-dom'
import styles from './ProductCard.module.scss'
const { mainBlock, img, text, nameItem, priceItem } = styles

type ProductCardProps = {
  slug: string
  name: string
  price: string | number
  image: string
  description: string
}

export const ProductCard = ({
  slug,
  name,
  price,
  image,
  description,
}: ProductCardProps) => {
  return (
    <Link to={`/shop/${slug}`}>
      <div className={mainBlock}>
        <img src={image} alt={name} className={img} />
        <div className={styles.description}>
          <p className={styles.descriptionText}>{description}</p>
        </div>
        <div className={text}>
          <p className={nameItem}>{name}</p>
          <p className={priceItem}>{price} $</p>
        </div>
      </div>
    </Link>
  )
}
