import { useEffect } from 'react'
import { useProductStore } from '@store/productStore'
import { useCategoriesStore } from '@store/categoriesStore'

import { ProductCard } from '@components/ProductCard/ProductCard'
import { SortingList } from '@components/SortingList/SortingList'

import styles from './ShopPage.module.scss'
import { SortingTab } from '@components/SortingTab/SortingTab'

export const ShopPage = () => {
  const limit = 6

  const page = useProductStore((state) => state.currentPage)
  const setPage = useProductStore((state) => state.setCurrentPage)
  const totalCount = useProductStore((state) => state.totalProductsCount)
  const totalPages = Math.ceil(totalCount / limit)

  const products = useProductStore((state) => state.products)
  const fetchProducts = useProductStore((state) => state.fetchProducts)

  const placeholdersCount = limit - products.length
  const placeholders = Array(
    placeholdersCount > 0 ? placeholdersCount : 0
  ).fill(null)

  const { categories, fetched, fetchCategories } = useCategoriesStore()
  const setCategory = useProductStore((state) => state.setActiveCategoryId)

  const setMaxPage = () => setPage(Math.max(page - 1, 1))
  const setMinPage = () => setPage(Math.min(page + 1, totalPages))

  const handleCategoryClick = (categoryId: string) => {
    setPage(1)
    setCategory(categoryId)
    fetchProducts(1, limit)
  }

  useEffect(() => {
    fetchProducts(page, limit)
  }, [fetchProducts, page])

  useEffect(() => {
    if (!fetched) {
      fetchCategories()
    }
  }, [fetched, fetchCategories])

  return (
    <div className="container">
      <div className={styles.shopContainer}>
        <SortingList
          categories={categories}
          onCategoryClick={handleCategoryClick}
        />
        <div>
          <SortingTab />
          <div className={styles.productsGrid}>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                description={product.description}
              />
            ))}

            {placeholders.map((_, index) => (
              <div
                key={`placeholder-${index}`}
                className={styles.placeholder}
              ></div>
            ))}
          </div>

          <div className={styles.pagination}>
            <button onClick={setMaxPage} disabled={page === 1}>
              Prev
            </button>

            <span className={styles.span}>Page {page}</span>

            <button onClick={setMinPage} disabled={page >= totalPages}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
