import { PriceRange } from '@components/PriceRange/PriceRange'
import styles from './SortingList.module.scss'

type Category = {
  label: string
  count: number
}

type Size = {
  label: string
  count: number
}

type SortingListProps = {
  categories: Category[]
  sizes: Size[]
}

export function SortingList({ categories, sizes }: SortingListProps) {
  return (
    <aside className={styles.aside}>
      <form>
        <fieldset>
          <legend>Categories</legend>
          <ul>
            {categories.map((category) => (
              <li key={category.label}>
                <a href="#">
                  {category.label} <span>({category.count})</span>
                </a>
              </li>
            ))}
          </ul>
        </fieldset>

        <PriceRange />

        <fieldset>
          <legend>Size</legend>
          <ul>
            {sizes.map((size) => (
              <li key={size.label}>
                <a href="#">
                  {size.label} <span>({size.count})</span>
                </a>
              </li>
            ))}
          </ul>
        </fieldset>
      </form>
    </aside>
  )
}
