import { useProductStore } from '@store/productStore'
import styles from './SortingTab.module.scss'
import { useEffect } from 'react'

export const SortingTab = () => {
  const searchValue = useProductStore((state) => state.searchValue)
  const setSearchValue = useProductStore((state) => state.setSearchValue)
  const sortOption = useProductStore((state) => state.sortOption)
  const setSortOption = useProductStore((state) => state.setSortOption)
  const fetchProducts = useProductStore((state) => state.fetchProducts)
  const currentPage = useProductStore((state) => state.currentPage)

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value as typeof sortOption
    setSortOption(newSort)
    fetchProducts(currentPage)
  }

  const searchChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchProducts(currentPage)
    }, 500)

    return () => clearTimeout(timeout)
  }, [searchValue, currentPage, fetchProducts])

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
        <option value="createdAt">New</option>
        <option value="sale">Discounted</option>
        <option value="name-asc">Name: A → Z</option>
        <option value="name-desc">Name: Z → A</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
      <div className={styles.searchBlock}>
        <input
          placeholder="Search"
          onChange={searchChangeHandler}
          value={searchValue}
          type="text"
        />
        <img src="images/icons/find-icon.svg" alt="" />
      </div>
    </div>
  )
}
