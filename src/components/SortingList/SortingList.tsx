import cn from 'classnames'
import { useNavigate } from 'react-router-dom'
import { PriceRange } from '@components/PriceRange/PriceRange'
import styles from './SortingList.module.scss'
import type { Category } from '@store/types'
import { useProductStore } from '@store/productStore'
import { fetchCategorySlug } from '@store/fetchCategorySlug'

type SortingListProps = {
  categories: Category[]
  onCategoryClick: (category: Category) => void
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

export function SortingList({
  categories,
  onCategoryClick,
  onResetFilters,
}: SortingListProps) {
  const navigate = useNavigate()
  const activeCategoryId = useProductStore((state) => state.activeCategoryId)
  const priceRange = useProductStore((state) => state.priceRange)

  const isFiltersActive =
    activeCategoryId !== null || priceRange[0] !== 0 || priceRange[1] !== 100

  const handleClickCategory = async (
    e: React.MouseEvent<HTMLAnchorElement>,
    category: Category
  ) => {
    e.preventDefault()
    onCategoryClick(category)

    const slug = await fetchCategorySlug(category.id)

    if (slug) {
      navigate(`/shop/category/${slug}`)
    } else {
      navigate('/shop')
    }
  }

  const resetHandle = () => {
    onResetFilters()
    navigate('/shop')
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
                  onClick={(e) => handleClickCategory(e, category)}
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
          <legend className={sortingLegend}>Reset sorting</legend>
          <div className={resetBlock}>
            <button
              type="button"
              onClick={resetHandle}
              disabled={!isFiltersActive}
              className={isFiltersActive ? resetButton : resetButtonDisabled}
            >
              Reset filters
            </button>
          </div>
        </fieldset>
      </form>
    </aside>
  )
}
