import { useNavigate } from 'react-router-dom'
import styles from './ProductCard.module.scss'
import ProductPrice from '@components/ProductPrice/ProductPrice'
import DiscountElement from '@components/DiscountElement/DiscountElement'
import { useState } from 'react'
import { fetchCategorySlug } from '@store/fetchCategorySlug'
const { mainBlock, img, text, nameItem } = styles

type ProductCardProps = {
  slug: string
  name: string
  price: number
  discountPrice: number
  discountId: string
  image: string
  description: string
  categoryId: string
}

export const ProductCard = ({
  slug,
  name,
  price,
  discountPrice,
  discountId,
  image,
  description,
  categoryId,
}: ProductCardProps) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const onClick = async () => {
    if (loading) return
    setLoading(true)
    const categorySlug = await fetchCategorySlug(categoryId)
    setLoading(false)

    if (categorySlug) {
      navigate(`/shop/category/${categorySlug}/${slug}`)
    } else {
      navigate(`/shop/${slug}`)
    }
  }

  return (
    <div className={mainBlock} onClick={onClick}>
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
  )
}
