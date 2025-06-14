import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import type { Category } from '@store/types'

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

  console.log(products)

  const { categories, fetched, fetchCategories } = useCategoriesStore()

  const totalPages = Math.ceil(totalProductsCount / limit)

  const { slugCategory } = useParams<{ slugCategory: string }>()
  const navigate = useNavigate()

  const placeholdersCount = limit - products.length
  const placeholders = Array(
    placeholdersCount > 0 ? placeholdersCount : 0
  ).fill(null)

  const setPrevPage = () => setCurrentPage(Math.max(currentPage - 1, 1))
  const setNextPage = () =>
    setCurrentPage(Math.min(currentPage + 1, totalPages))

  const handleCategoryClick = (category: Category) => {
    setCurrentPage(1)
    setActiveCategoryId(category.id)
  }

  useEffect(() => {
    if (!slugCategory) {
      setActiveCategoryId(null)
    }
  }, [slugCategory, setActiveCategoryId])

  useEffect(() => {
    if (!fetched) return

    if (slugCategory) {
      const matching = categories.find(
        (cat) => cat.label.toLowerCase().replace(/\s+/g, '-') === slugCategory
      )
      if (matching) {
        setActiveCategoryId(matching.id)
      } else {
        setActiveCategoryId(null)
        navigate('/shop', { replace: true })
      }
    }
  }, [slugCategory, fetched, categories, navigate, setActiveCategoryId])

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
          onResetFilters={() => useProductStore.getState().resetFilters()}
        />
        <div>
          <SortingTab />
          <div className={styles.productsGrid}>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                slug={product.slug}
                name={product.name}
                price={product.price}
                discountPrice={product.discountPrice ?? 0}
                discountId={product.discountId ?? ''}
                image={product.image}
                description={product.description}
                categoryId={product.categoryId}
                id={product.id}
                variantId={product.variantId}
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
