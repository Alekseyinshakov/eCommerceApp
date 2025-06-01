import SliderProductDetails from '@components/SliderProductDetails/SliderProductDetails'
import styles from './ShopPage.module.scss'
import ProductPrice from '@components/ProductPrice/ProductPrice'
import DiscountElement from '@components/DiscountElement/DiscountElement'
import { ProductDetailType } from 'types'

const ProductDetailPage = ({
  product,
}: {
  product: ProductDetailType | null
}) => {
  return (
    <div className="container">
      {product ? (
        <div className={styles.product}>
          <div className={styles.productSliderWrapper}>
            {product.discountId ? (
              <div className={styles.discount}>
                <DiscountElement discountId={product.discountId ?? ''} />
              </div>
            ) : null}
            <SliderProductDetails images={product.images} />
          </div>
          <div className={styles.descriptionInner}>
            <h1 className={styles.nameProduct}>{product.name}</h1>
            <ProductPrice
              price={product.price}
              discountedPrice={product.discountPrice}
            />
            <p className={styles.desc}>
              Short Description:{' '}
              <span className={styles.descText}>{product.description}</span>
            </p>
            <p className={styles.size}>
              Size:{' '}
              <span className={styles.descText}>
                {product.isDiameterBased ? `⌀ ${product.size}` : product.size}
              </span>
            </p>
            <p className={styles.sku}>
              SKU: <span className={styles.descText}> {product.sku}</span>
            </p>
            <p className={styles.categories}>
              Categories:{' '}
              <span className={styles.descText}>{product.categories}</span>
            </p>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default ProductDetailPage
