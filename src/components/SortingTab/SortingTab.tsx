import { useProductStore } from '@store/productStore'
import styles from './SortingTab.module.scss'

export const SortingTab = () => {
  const sortOption = useProductStore((state) => state.sortOption)
  const setSortOption = useProductStore((state) => state.setSortOption)
  const fetchProducts = useProductStore((state) => state.fetchProducts)
  const currentPage = useProductStore((state) => state.currentPage)

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value as typeof sortOption
    setSortOption(newSort)
    fetchProducts(currentPage)
  }

  return (
    <div className={styles.sortingTab}>
      <label htmlFor="sort" className={styles.label}>
        Sorting by:
      </label>
      <select
        id="sort"
        value={sortOption}
        onChange={handleChange}
        className={styles.select}
      >
        <option value="default">All products</option>
        <option value="newest">New</option>
        <option value="name-asc">Name: A → Z</option>
        <option value="name-desc">Name: Z → A</option>
      </select>
    </div>
  )
}
