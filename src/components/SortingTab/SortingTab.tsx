import { useAuthStore } from '@store/authStore'
import styles from './SortingTab.module.scss'

export const SortingTab = () => {
  const sortOption = useAuthStore((state) => state.sortOption)
  const setSortOption = useAuthStore((state) => state.setSortOption)
  const fetchProducts = useAuthStore((state) => state.fetchProducts)
  const currentPage = useAuthStore((state) => state.currentPage)

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
        {/* <option value="discount">With a discount</option>
        <option value="price-asc">Price: rising</option>
        <option value="price-desc">Price: falling</option> */}
        <option value="name-asc">Name: A → Z</option>
        <option value="name-desc">Name: Z → A</option>
      </select>
    </div>
  )
}
