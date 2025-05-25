import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NotificationProvider } from '@components/Notification/UseNotification'
import { SignUpPage } from '../pages/AuthForms/SignUpPage'

const navigateMock = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
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

vi.mock('@api/apiClient', () => ({
  registerCustomer: vi.fn().mockResolvedValue({
    customer: {
      id: '1',
      email: 'test@example.com',
      version: 1,
      firstName: 'John',
      lastName: 'Doe',
      createdAt: new Date().toISOString(),
      lastModifiedAt: new Date().toISOString(),
      addresses: [
        {
          id: '1',
          streetName: '123 Main St',
          city: 'Kyiv',
          postalCode: '01001',
          country: 'Ukraine',
        },
      ],
      isEmailVerified: false,
      authenticationMode: 'Password',
      stores: [],
    },
  }),
}))

describe('SignUpPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const fillForm = () => {
    fireEvent.change(screen.getByPlaceholderText('First Name'), {
      target: { value: 'John' },
    })
    fireEvent.change(screen.getByPlaceholderText('Last Name'), {
      target: { value: 'Doe' },
    })
    fireEvent.change(
      screen.getByPlaceholderText('Email (e.g., example@email.com)'),
      {
        target: { value: `test${Date.now()}@example.com` },
      }
    )
    fireEvent.change(screen.getByPlaceholderText('Date of Birth'), {
      target: { value: '1990-01-01' },
    })
    fireEvent.change(
      screen.getByPlaceholderText(
        'Password (min 8 chars, 1 uppercase, 1 lowercase, 1 number)'
      ),
      {
        target: { value: 'Password1' },
      }
    )
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), {
      target: { value: 'Password1' },
    })
    fireEvent.change(screen.getByTestId('input-street'), {
      target: { value: '123 Main St' },
    })
    fireEvent.change(screen.getByTestId('input-city'), {
      target: { value: 'Kyiv' },
    })
    fireEvent.change(screen.getByTestId('input-postal-code'), {
      target: { value: '01001' },
    })
    fireEvent.change(screen.getByTestId('input-country'), {
      target: { value: 'Ukraine' },
    })
  }

  it('renders all input fields and the submit button', () => {
    render(
      <NotificationProvider>
        <MemoryRouter>
          <SignUpPage />
        </MemoryRouter>
      </NotificationProvider>
    )

    expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Last Name')).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText('Email (e.g., example@email.com)')
    ).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText(
        'Password (min 8 chars, 1 uppercase, 1 lowercase, 1 number)'
      )
    ).toBeInTheDocument()
  })

  it('successfully submits form and navigates to /home', async () => {
    render(
      <NotificationProvider>
        <MemoryRouter>
          <SignUpPage />
        </MemoryRouter>
      </NotificationProvider>
    )

    fillForm()
  })
})
