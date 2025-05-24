import { useEffect } from 'react'
import { useAuthStore } from '@store/authStore'
import { ProductCart } from '@components/ProductCart/ProductCart'
import styles from './ShopPage.module.scss'

export const ShopPage = () => {
  const products = useAuthStore((state) => state.products)
  const fetchProducts = useAuthStore((state) => state.fetchProducts)

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return (
    <div className="container">
      <h2 className={styles.title}>Shop</h2>
      <p className={styles.text}>Welcome to the shop!</p>
      <div className={styles.productsGrid}>
        {products.map((product) => (
          <ProductCart
            key={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </div>
  )
}
