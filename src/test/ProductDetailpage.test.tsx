import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ProductDetailPage from '../pages/Shop/ProductDetailPage'

const productMock = {
  id: 'product123',
  discountId: 'discount123',
  images: ['img1.jpg', 'img2.jpg'],
  name: 'Test Product',
  price: 100,
  discountPrice: 80,
  description: 'A great product',
  isDiameterBased: false,
  size: 'L',
  sku: 'SKU123',
  categories: 'Category1, Category2',
}

vi.mock('@components/DiscountElement/DiscountElement', () => ({
  default: () => <div>DiscountElementMock</div>,
}))

vi.mock('@components/SliderProductDetails/SliderProductDetails', () => ({
  default: ({ images }: { images: string[] }) => (
    <div>SliderMock with {images.length} images</div>
  ),
}))

vi.mock('@components/ProductPrice/ProductPrice', () => ({
  default: ({
    price,
    discountedPrice,
  }: {
    price: number
    discountedPrice: number
  }) => (
    <div>
      Price: {price}, Discounted: {discountedPrice}
    </div>
  ),
}))

describe('ProductDetailPage', () => {
  it('renders product details including discount and slider', () => {
    render(<ProductDetailPage product={productMock} />)

    expect(screen.getByText('DiscountElementMock')).toBeInTheDocument()
    expect(screen.getByText('SliderMock with 2 images')).toBeInTheDocument()
    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('Price: 100, Discounted: 80')).toBeInTheDocument()
    expect(screen.getByText(/Short Description:/)).toBeInTheDocument()
    expect(screen.getByText('A great product')).toBeInTheDocument()
    expect(screen.getByText(/Size:/)).toBeInTheDocument()
    expect(screen.getByText('L')).toBeInTheDocument()
    expect(screen.getByText(/SKU:/)).toBeInTheDocument()
    expect(screen.getByText('SKU123')).toBeInTheDocument()
    expect(screen.getByText(/Categories:/)).toBeInTheDocument()
    expect(screen.getByText('Category1, Category2')).toBeInTheDocument()
  })

  it('does not render if product is null', () => {
    const { container } = render(<ProductDetailPage product={null} />)
    expect(container.firstChild).toHaveClass('container')
    expect(container.querySelector('.product')).toBeNull()
  })
})
