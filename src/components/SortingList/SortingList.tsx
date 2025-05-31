import cn from 'classnames'

import { PriceRange } from '@components/PriceRange/PriceRange'
import styles from './SortingList.module.scss'

import type { Category } from '@store/types'
import { useProductStore } from '@store/productStore'

type SortingListProps = {
  categories: Category[]
  onCategoryClick: (categoryId: string) => void
  onResetFilters: () => void
}

const {
  sortingAside,
  sortingForm,
  sortingFieldset,
  sortingLegend,
  sortingList,
  sortingItemLink,
  sortingActive,
  resetBlock,
  resetButton,
  resetButtonDisabled,
} = styles

export function SortingList({ categories, onCategoryClick }: SortingListProps) {
  const activeCategoryId = useProductStore((state) => state.activeCategoryId)

  const priceRange = useProductStore((state) => state.priceRange)
  const isFiltersActive =
    activeCategoryId !== null || priceRange[0] !== 0 || priceRange[1] !== 100

  const resetHandle = () => {
    useProductStore.getState().resetFilters()
  }
  return (
    <aside className={sortingAside}>
      <form className={sortingForm}>
        <fieldset className={sortingFieldset}>
          <legend className={sortingLegend}>Categories</legend>
          <ul className={sortingList}>
            {categories.map((category) => (
              <li key={category.id}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    onCategoryClick(category.id)
                  }}
                  className={cn(sortingItemLink, {
                    [sortingActive]: category.id === activeCategoryId,
                  })}
                >
                  {category.label} <span>({category.count})</span>
                </a>
              </li>
            ))}
          </ul>
        </fieldset>

        <PriceRange />

        <fieldset className={sortingFieldset}>
          <legend className={sortingLegend}>Reset filters</legend>
          <div className={resetBlock}>
            <button
              type="button"
              onClick={resetHandle}
              disabled={!isFiltersActive}
              className={isFiltersActive ? resetButton : resetButtonDisabled}
            >
              Reset sorting and filters
            </button>
          </div>
        </fieldset>
      </form>
    </aside>
  )
}
