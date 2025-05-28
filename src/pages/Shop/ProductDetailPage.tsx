import { useProductStore } from '@store/productStore'
import { apiRoot } from '@api/apiClient'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SliderProductDetails from '@components/SliderProductDetails/SliderProductDetails'

type ProductDetail = {
  id: string
  name: string
  price: number
  images: Array<string>
  description: string
  size: string
  categories: string
  sku: string
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
    const categoryNameProm = categories.map(async (c) => {
      const res = await apiRoot
        .categories()
        .withId({ ID: c.id })
        .get()
        .execute()

      return res.body.name['en-US'] ?? ''
    })

    const names = await Promise.all(categoryNameProm)
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

          const productDetail: ProductDetail = {
            id: productId,
            name: productData.name?.['en-US'] || '',
            price: productData.masterVariant?.prices?.[0]?.value?.centAmount
              ? productData.masterVariant.prices[0].value.centAmount / 100
              : 0,
            images:
              productData.masterVariant?.images?.map((img: Image) => img.url) ||
              [],
            description: productData.description?.['en-US'] || '',
            size: String(
              getAttributeValue(
                productData.masterVariant?.attributes || [],
                'size'
              ) ?? ''
            ),
            categories: categoriesNames,
            sku: productData.masterVariant?.sku || '',
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
        <div>
          <h1>{product.name}</h1>
          <SliderProductDetails images={product.images} />
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <p>categories: {product.categories}</p>
          <p>SKU: {product.sku}</p>
        </div>
      ) : null}
    </div>
  )
}

export default ProductDetailPage
