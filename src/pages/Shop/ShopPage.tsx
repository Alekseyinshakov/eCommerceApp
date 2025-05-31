import { useEffect } from 'react'
import { useProductStore } from '@store/productStore'
import { useCategoriesStore } from '@store/categoriesStore'

import { ProductCard } from '@components/ProductCard/ProductCard'
import { SortingList } from '@components/SortingList/SortingList'

import styles from './ShopPage.module.scss'
import { SortingTab } from '@components/SortingTab/SortingTab'

export const ShopPage = () => {
  const limit = 6

  const {
    currentPage,
    setCurrentPage,
    totalProductsCount,
    products,
    fetchProducts,
    setActiveCategoryId,
    activeCategoryId,
    sortOption,
    priceRange,
  } = useProductStore()

  const { categories, fetched, fetchCategories } = useCategoriesStore()

  const totalPages = Math.ceil(totalProductsCount / limit)

  const placeholdersCount = limit - products.length
  const placeholders = Array(
    placeholdersCount > 0 ? placeholdersCount : 0
  ).fill(null)

  const setPrevPage = () => setCurrentPage(Math.max(currentPage - 1, 1))
  const setNextPage = () =>
    setCurrentPage(Math.min(currentPage + 1, totalPages))

  const handleCategoryClick = (categoryId: string) => {
    setCurrentPage(1)
    setActiveCategoryId(categoryId)
  }

  useEffect(() => {
    fetchProducts(currentPage, limit)
  }, [fetchProducts, currentPage, activeCategoryId, sortOption, priceRange])

  useEffect(() => {
    if (!fetched) fetchCategories()
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
              <div key={index} className={styles.placeholder}></div>
            ))}
          </div>

          <div className={styles.pagination}>
            <button onClick={setPrevPage} disabled={currentPage === 1}>
              Prev
            </button>

            <span className={styles.span}>
              Page {currentPage} of {totalPages}
            </span>

            <button onClick={setNextPage} disabled={currentPage >= totalPages}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
