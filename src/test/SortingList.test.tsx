import { render, screen, fireEvent } from '@testing-library/react'
import { SortingList } from '@components/SortingList/SortingList'
import { vi } from 'vitest'
import * as categoryModule from '@store/fetchCategorySlug'

vi.mock('@components/PriceRange/PriceRange', () => ({
  PriceRange: () => <div data-testid="price-range">PriceRange</div>,
}))

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const actual = await vi.importActual<any>('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

describe('SortingList', () => {
  const mockCategories = [
    { id: '1', label: 'Flowers', count: 10 },
    { id: '2', label: 'Gifts', count: 5 },
  ]

  const onCategoryClick = vi.fn()
  const onResetFilters = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders category links', () => {
    render(
      <SortingList
        categories={mockCategories}
        onCategoryClick={onCategoryClick}
        onResetFilters={onResetFilters}
      />
    )

    expect(screen.getByText(/Flowers/)).toBeInTheDocument()
    expect(screen.getByText(/Gifts/)).toBeInTheDocument()
  })

  it('navigates to category on click', async () => {
    vi.spyOn(categoryModule, 'fetchCategorySlug').mockResolvedValue('flowers')

    render(
      <SortingList
        categories={mockCategories}
        onCategoryClick={onCategoryClick}
        onResetFilters={onResetFilters}
      />
    )

    const flowersLink = screen.getByText(/Flowers/)
    fireEvent.click(flowersLink)

    await Promise.resolve()

    expect(onCategoryClick).toHaveBeenCalledWith(mockCategories[0])
    expect(mockNavigate).toHaveBeenCalledWith('/shop/category/flowers')
  })

  it('disables reset button when no filters active', () => {
    render(
      <SortingList
        categories={mockCategories}
        onCategoryClick={onCategoryClick}
        onResetFilters={onResetFilters}
      />
    )

    const resetBtn = screen.getByRole('button', { name: /reset filters/i })
    expect(resetBtn).toBeDisabled()
  })

  it('renders PriceRange component', () => {
    render(
      <SortingList
        categories={mockCategories}
        onCategoryClick={onCategoryClick}
        onResetFilters={onResetFilters}
      />
    )
    expect(screen.getByTestId('price-range')).toBeInTheDocument()
  })
})
