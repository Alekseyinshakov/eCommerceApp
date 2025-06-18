import { render, screen } from '@testing-library/react'
import Footer from '@components/Footer/Footer'
import { describe, it, expect } from 'vitest'

describe('Footer component', () => {
  it('renders without crashing', () => {
    render(<Footer />)
    const footerElement = screen.getByRole('contentinfo')
    expect(footerElement).toBeInTheDocument()
  })

  it('footer is not empty', () => {
    render(<Footer />)
    const footerElement = screen.getByRole('contentinfo')
    expect(footerElement).toBeInTheDocument()
    expect(footerElement).not.toBeEmptyDOMElement()
  })

  it('has proper class names', () => {
    render(<Footer />)
    const footer = screen.getByRole('contentinfo')
    expect(footer.className).toContain('container')
  })
})
