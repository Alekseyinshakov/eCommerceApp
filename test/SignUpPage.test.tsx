import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'

// === MOKs MUST BE PRE-IMPORTED FOR COMPONENTS ===
const navigateMock = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return {
    ...actual,
    useNavigate: () => navigateMock,
  }
})

vi.mock('@hooks/useAuthPageText', () => ({
  useAuthPageText: () => ({
    submitText: 'Register',
  }),
}))

import { SignUpPage } from '../src/pages/AuthForms/SignUpPage'

describe('SignUpPage', () => {
  it('renders all input fields and the submit button', () => {
    render(
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter>
    )

    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText('Enter your email address')
    ).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /register/i })
    ).toBeInTheDocument()
  })

  it('navigates to /home after form submission', async () => {
    render(
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter>
    )

    fireEvent.submit(screen.getByRole('form'))

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('/home')
    })
  })
})
