import { renderHook } from '@testing-library/react'
import { useAuthPageText } from '@hooks/useAuthPageText'
import { vi } from 'vitest'
import * as ReactRouter from 'react-router-dom'

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof ReactRouter>('react-router-dom')
  return {
    ...actual,
    useLocation: vi.fn(),
  }
})

const mockedUseLocation = ReactRouter.useLocation as unknown as ReturnType<
  typeof vi.fn
> &
  (() => { pathname: string })

describe('useAuthPageText', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('returns correct values for login page', () => {
    mockedUseLocation.mockReturnValue({ pathname: '/log-in' })

    const { result } = renderHook(() => useAuthPageText())

    expect(result.current.submitText).toBe('Login')
    expect(result.current.thirdPartyText).toBe('Or login with')
    expect(result.current.btnText).toBe('Login')
    expect(result.current.isLogin).toBe(true)
    expect(result.current.isRegister).toBe(false)
    expect(result.current.pathname).toBe('/log-in')
  })

  it('returns correct values for register page', () => {
    mockedUseLocation.mockReturnValue({ pathname: '/sign-up' })

    const { result } = renderHook(() => useAuthPageText())

    expect(result.current.submitText).toBe('Register')
    expect(result.current.thirdPartyText).toBe('Or register with')
    expect(result.current.btnText).toBe('Continue')
    expect(result.current.isLogin).toBe(false)
    expect(result.current.isRegister).toBe(true)
    expect(result.current.pathname).toBe('/sign-up')
  })

  it('returns fallback values for unknown path', () => {
    mockedUseLocation.mockReturnValue({ pathname: '/unknown-page' })

    const { result } = renderHook(() => useAuthPageText())

    expect(result.current.submitText).toBe('Submit')
    expect(result.current.thirdPartyText).toBe('')
    expect(result.current.btnText).toBe('Continue')
    expect(result.current.isLogin).toBe(false)
    expect(result.current.isRegister).toBe(false)
    expect(result.current.pathname).toBe('/unknown-page')
  })
})
