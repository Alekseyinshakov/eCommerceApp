import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, expect, it, vi } from 'vitest'
import DiscountElement from '@components/DiscountElement/DiscountElement'
import { apiRoot } from '@api/apiClient'

interface DiscountResponse {
  body: {
    name: Record<string, string>
    value: {
      permyriad?: number
    }
  }
}

type ExecuteFn = () => Promise<DiscountResponse>

type ApiRootWithMock = typeof apiRoot & {
  __setExecuteMock: (mock: ExecuteFn) => void
}

let executeMock: ExecuteFn = async () => ({
  body: {
    name: {},
    value: {},
  },
})

vi.mock('../api/apiClient', () => {
  return {
    apiRoot: {
      productDiscounts: () => ({
        withId: () => ({
          get: () => ({
            execute: executeMock,
          }),
        }),
      }),
      __setExecuteMock: (mock: ExecuteFn) => {
        executeMock = mock
      },
    },
  }
})

describe('DiscountElement', () => {
  it('fetches and displays discount name and value', async () => {
    const mockResponse: DiscountResponse = {
      body: {
        name: { 'en-US': 'Special Discount' },
        value: { permyriad: 1500 },
      },
    }

    const mockFn = vi.fn().mockResolvedValueOnce(mockResponse)

    ;(apiRoot as ApiRootWithMock).__setExecuteMock(mockFn)

    render(<DiscountElement discountId="123" />)

    expect(mockFn).toHaveBeenCalled()

    await waitFor(() => {
      expect(screen.getByText('Special Discount')).toBeInTheDocument()
      expect(screen.getByText('15%')).toBeInTheDocument()
    })
  })

  it('renders empty string if discount value not found', async () => {
    const mockResponse: DiscountResponse = {
      body: {
        name: { 'en-US': 'No Value Discount' },
        value: {},
      },
    }

    const mockFn = vi.fn<ExecuteFn>().mockResolvedValueOnce(mockResponse)

    ;(apiRoot as ApiRootWithMock).__setExecuteMock(mockFn)

    render(<DiscountElement discountId="123" />)

    await waitFor(() => {
      expect(screen.getByText('No Value Discount')).toBeInTheDocument()
      expect(screen.queryByText('%')).not.toBeInTheDocument()
    })
  })
})
