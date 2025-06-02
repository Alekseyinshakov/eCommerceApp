import { render, screen } from '@testing-library/react'
import Loader from '../components/Loader/Loader'
import { describe, expect, it } from 'vitest'

describe('Loader', () => {
  it('renders loader spinner', () => {
    render(<Loader />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })
})
