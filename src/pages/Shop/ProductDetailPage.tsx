import { useProductStore } from '@store/productStore'
import { apiRoot } from '@api/apiClient'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SliderProductDetails from '@components/SliderProductDetails/SliderProductDetails'
import styles from './ShopPage.module.scss'
import ProductPrice from '@components/ProductPrice/ProductPrice'
import DiscountElement from '@components/DiscountElement/DiscountElement'

type ProductDetail = {
  id: string
  name: string
  price: number
  discountPrice?: number
  discountId?: string
  images: Array<string>
  description: string
  size: string
  categories: string
  sku: string
  isDiameterBased: boolean
}

type Image = {
  url: string
  label?: string
}

const ProductDetailPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [product, setProduct] = useState<ProductDetail | null>(null)
  const [loading, setLoading] = useState(false)

  const products = useProductStore((state) => state.products)
  const productId = products.find((p) => p.slug === slug)?.id

  const getAttributeValue = (
    attrs: Array<{ name: string; value: string | boolean }>,
    attrName: string
  ) => {
    const attr = attrs.find((a) => a.name === attrName)
    if (attr) {
      if (typeof attr.value === 'object' && attr.value['en-US']) {
        return attr.value['en-US']
      }
      return attr.value
    }
  }

  const getCategoryName = async (categories: Array<{ id: string }>) => {
    const categoryName = categories.map(async (c) => {
      const res = await apiRoot
        .categories()
        .withId({ ID: c.id })
        .get()
        .execute()

      return res.body.name['en-US'] ?? ''
    })

    const names = await Promise.all(categoryName)
    return names.join(', ')
  }

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true)
      if (productId) {
        try {
          const res = await apiRoot
            .products()
            .withId({ ID: productId })
            .get()
            .execute()

          const productData = res.body.masterData.current
          console.log(productData)

          const categories = productData.categories || []
          const categoriesNames = await getCategoryName(categories)
          const isDiameterBased = Boolean(
            getAttributeValue(
              productData.masterVariant?.attributes || [],
              'isDiameterBased'
            )
          )

          const productDetail: ProductDetail = {
            id: productId,
            name: productData.name?.['en-US'] || '',
            price: productData.masterVariant?.prices?.[0]?.value?.centAmount
              ? productData.masterVariant.prices[0].value.centAmount / 100
              : 0,
            discountPrice: productData.masterVariant?.prices?.[0]?.discounted
              ?.value?.centAmount
              ? productData.masterVariant.prices[0].discounted.value
                  .centAmount / 100
              : 0,
            discountId:
              productData.masterVariant?.prices?.[0]?.discounted?.discount
                ?.id || undefined,
            images:
              productData.masterVariant?.images?.map((img: Image) => img.url) ||
              [],
            description: productData.description?.['en-US'] || '',
            size: String(
              getAttributeValue(
                productData.masterVariant?.attributes || [],
                'size'
              ) ??
                getAttributeValue(
                  productData.masterVariant?.attributes || [],
                  'size-acces'
                )
            ),
            categories: categoriesNames,
            sku: productData.masterVariant?.sku || '',
            isDiameterBased,
          }

          setProduct(productDetail)
        } catch (error) {
          console.error('Failed to fetch products:', error)
          navigate('/404')
        } finally {
          setLoading(false)
        }
      } else {
        navigate('/404')
      }
    }
    getProduct()
  }, [productId, navigate])

  if (loading) {
    return
  }

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
