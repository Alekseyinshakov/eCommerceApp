import { apiRoot } from '@api/apiClient'
import { useNavigate, useParams } from 'react-router-dom'
import ProductDetailPage from '@pages/Shop/ProductDetailPage'
import { ProductDetailType } from 'types'
import Loader from '@components/Loader/Loader'
import { useEffect, useState } from 'react'

type Image = {
  url: string
  label?: string
}

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [product, setProduct] = useState<ProductDetailType | null>(null)
  const [loading, setLoading] = useState(false)

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
      if (slug) {
        try {
          const res = await apiRoot
            .products()
            .get({
              queryArgs: {
                where: `masterData(current(slug(en-US="${slug}")))`,
              },
            })
            .execute()

          const productData = res.body.results[0].masterData.current
          const productId = res.body.results[0].id

          const categories = productData.categories || []
          const categoriesNames = await getCategoryName(categories)
          const isDiameterBased = Boolean(
            getAttributeValue(
              productData.masterVariant?.attributes || [],
              'isDiameterBased'
            )
          )

          const productDetail: ProductDetailType = {
            id: productId,
            variantId: productData.masterVariant.id,
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
  }, [slug, navigate])

  if (loading) {
    return <Loader />
  }
  if (product) {
    return <ProductDetailPage product={product} />
  }
}

export default ProductDetail
