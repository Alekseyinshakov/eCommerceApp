import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ErrorPage } from '@pages/ErrorPage/ErrorPage'

vi.mock('@components/Header/Header', () => ({
  default: () => <div data-testid="header">Header</div>,
}))

describe('ErrorPage', () => {
  const renderComponent = () =>
    render(
      <BrowserRouter>
        <ErrorPage />
      </BrowserRouter>
    )

  it('renders Header component', () => {
    renderComponent()
    expect(screen.getByTestId('header')).toBeInTheDocument()
  })

  it('renders the title', () => {
    renderComponent()
    expect(screen.getByText(/404 — Page Not Found/i)).toBeInTheDocument()
  })

  it('renders the error text', () => {
    renderComponent()
    expect(
      screen.getByText(/Sorry, the page you’re looking for doesn’t exist./i)
    ).toBeInTheDocument()
  })

  it('renders link to home', () => {
    renderComponent()
    const link = screen.getByRole('link', { name: /to home/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/home')
  })
})
