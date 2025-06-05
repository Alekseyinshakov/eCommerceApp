import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ProductCard } from '@components/ProductCard/ProductCard'
import { vi } from 'vitest'
import * as ReactRouter from 'react-router-dom'
import * as categoryModule from '@store/fetchCategorySlug'

const mockedNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof ReactRouter>('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  }
})

vi.mock('@store/fetchCategorySlug', () => ({
  fetchCategorySlug: vi.fn(),
}))

describe('ProductCard', () => {
  const defaultProps = {
    slug: 'rose-red',
    name: 'Red Rose',
    price: 100,
    discountPrice: 80,
    discountId: 'discount123',
    image: '/images/rose.jpg',
    description: 'A beautiful red rose',
    categoryId: 'cat456',
  }

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders product card correctly', () => {
    render(<ProductCard {...defaultProps} />)

    expect(screen.getByAltText('Red Rose')).toBeInTheDocument()
    expect(screen.getByText('Red Rose')).toBeInTheDocument()
    expect(screen.getByText('A beautiful red rose')).toBeInTheDocument()
  })

  it('renders DiscountElement if discountId is provided', () => {
    render(<ProductCard {...defaultProps} />)
    expect(screen.getByTestId('discount-element')).toBeInTheDocument()
  })

  it('does not render DiscountElement if no discountId', () => {
    render(<ProductCard {...defaultProps} discountId="" />)
    expect(screen.queryByTestId('discount-element')).not.toBeInTheDocument()
  })

  it('navigates to category slug path if slug exists', async () => {
    vi.spyOn(categoryModule, 'fetchCategorySlug').mockResolvedValue('flowers')

    render(<ProductCard {...defaultProps} />)

    fireEvent.click(screen.getByAltText('Red Rose'))

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith(
        '/shop/category/flowers/rose-red'
      )
    })
  })

  it('navigates to default path if category slug does not exist', async () => {
    vi.spyOn(categoryModule, 'fetchCategorySlug').mockResolvedValue(null)

    render(<ProductCard {...defaultProps} />)

    fireEvent.click(screen.getByAltText('Red Rose'))

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('/shop/rose-red')
    })
  })

  it('prevents multiple clicks while loading', async () => {
    let resolveSlug: (value: string) => void
    const slugPromise = new Promise<string>((resolve) => {
      resolveSlug = resolve
    })

    vi.spyOn(categoryModule, 'fetchCategorySlug').mockReturnValue(
      slugPromise as never
    )

    render(<ProductCard {...defaultProps} />)

    fireEvent.click(screen.getByAltText('Red Rose'))
    fireEvent.click(screen.getByAltText('Red Rose')) // second click (should be ignored)

    resolveSlug!('flowers')

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledTimes(1)
      expect(mockedNavigate).toHaveBeenCalledWith(
        '/shop/category/flowers/rose-red'
      )
    })
  })
})
