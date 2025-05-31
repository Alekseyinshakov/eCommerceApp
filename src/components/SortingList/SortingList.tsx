import cn from 'classnames'

import { PriceRange } from '@components/PriceRange/PriceRange'
import styles from './SortingList.module.scss'

import type { Category } from '@store/types'
import { useProductStore } from '@store/productStore'

type SortingListProps = {
  categories: Category[]
  onCategoryClick: (categoryId: string) => void
}

const {
  sortingAside,
  sortingForm,
  sortingFieldset,
  sortingLegend,
  sortingList,
  sortingItemLink,
  sortingActive,
} = styles

export function SortingList({ categories, onCategoryClick }: SortingListProps) {
  const activeCategoryId = useProductStore((state) => state.activeCategoryId)

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
          <legend className={sortingLegend}>Size</legend>
          <ul></ul>
        </fieldset>
      </form>
    </aside>
  )
}
