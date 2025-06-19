import { useProductStore } from '@store/productStore'
import styles from './SortingTab.module.scss'
import { useEffect } from 'react'

const sortOptions = [
  { value: 'createdAt', label: 'New' },
  { value: 'sale', label: 'Discounted' },
  { value: 'name-asc', label: 'Name: A → Z' },
  { value: 'name-desc', label: 'Name: Z → A' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
]

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
        {sortOptions.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
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
