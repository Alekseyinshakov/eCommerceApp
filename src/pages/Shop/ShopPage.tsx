import { useEffect } from 'react'
import { useAuthStore } from '@store/authStore'

import { ProductCart } from '@components/ProductCart/ProductCart'
import { SortingList } from '@components/SortingList/SortingList'

import styles from './ShopPage.module.scss'

export const ShopPage = () => {
  const products = useAuthStore((state) => state.products)
  const fetchProducts = useAuthStore((state) => state.fetchProducts)

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return (
    <div className="container">
      <div className={styles.shopContainer}>
        <SortingList />
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
    </div>
  )
}
