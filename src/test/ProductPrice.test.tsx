import { render, screen } from '@testing-library/react'
import ProductPrice from '@components/ProductPrice/ProductPrice'
import { describe, it, expect } from 'vitest'

describe('ProductPrice component', () => {
  it('renders only regular price when no discount is provided', () => {
    render(<ProductPrice price={100} />)

    const priceElement = screen.getByText('100$')
    expect(priceElement).toBeInTheDocument()

    const discounted = screen.queryByText('priceDiscount')
    expect(discounted).not.toBeInTheDocument()
  })

  it('renders regular and discounted price when discount is provided', () => {
    render(<ProductPrice price={100} discountedPrice={80} />)

    const regularPrice = screen.getByText('100$')
    const discountPrice = screen.getByText('80$')

    expect(regularPrice).toBeInTheDocument()
    expect(discountPrice).toBeInTheDocument()
  })
})
