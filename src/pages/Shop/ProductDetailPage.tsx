import { useProductStore } from '@store/productStore'
import { useParams } from 'react-router-dom'

const ProductDetailPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const products = useProductStore((state) => state.products)
  const currentProduct = products.find((p) => p.slug === slug)
  if (currentProduct) {
    return (
      <div>
        <h1>{currentProduct.name}</h1>
        <img src={currentProduct.image} alt={currentProduct.name} />
        <p>{currentProduct.description}</p>
        <p>Price: ${currentProduct.price}</p>
      </div>
    )
  }
}

export default ProductDetailPage
