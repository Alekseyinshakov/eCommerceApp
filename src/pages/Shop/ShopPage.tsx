import { useEffect } from 'react'
import { useAuthStore } from '@store/authStore'

import { ProductCard } from '@components/ProductCard/ProductCard'
import { SortingList } from '@components/SortingList/SortingList'

import styles from './ShopPage.module.scss'

export const ShopPage = () => {
  const limit = 6

  const page = useAuthStore((state) => state.currentPage)
  const setPage = useAuthStore((state) => state.setCurrentPage)
  const totalCount = useAuthStore((state) => state.totalProductsCount)
  const totalPages = Math.ceil(totalCount / limit)

  const products = useAuthStore((state) => state.products)
  const fetchProducts = useAuthStore((state) => state.fetchProducts)

  useEffect(() => {
    fetchProducts(page, limit)
  }, [fetchProducts, page])

  return (
    <div className="container">
      <div className={styles.shopContainer}>
        <SortingList />
        <div>
          <div className={styles.productsGrid}>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
              />
            ))}
          </div>

          <div className={styles.pagination}>
            <button
              onClick={() => setPage(Math.max(page - 1, 1))}
              disabled={page === 1}
            >
              Prev
            </button>
            <span className={styles.span}>Page {page}</span>
            <button
              onClick={() => setPage(Math.min(page + 1, totalPages))}
              disabled={page >= totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
