import { PriceRange } from '@components/PriceRange/PriceRange'
import styles from './SortingList.module.scss'
import type { Category } from '@store/types'

type SortingListProps = {
  categories: Category[]
  onCategoryClick: (categoryId: string) => void
}

export function SortingList({ categories, onCategoryClick }: SortingListProps) {
  return (
    <aside className={styles.aside}>
      <form>
        <fieldset>
          <legend>Categories</legend>
          <ul>
            {categories.map((category) => (
              <li key={category.id}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    onCategoryClick(category.id)
                  }}
                >
                  {category.label} <span>({category.count})</span>
                </a>
              </li>
            ))}
          </ul>
        </fieldset>

        <PriceRange />

        <fieldset>
          <legend>Size</legend>
          <ul></ul>
        </fieldset>
      </form>
    </aside>
  )
}
