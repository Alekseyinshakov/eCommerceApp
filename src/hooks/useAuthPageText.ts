import { useLocation } from 'react-router-dom'

export const useAuthPageText = () => {
  const { pathname } = useLocation()

  const isLogin = pathname.startsWith('/log-in')
  const isRegister = pathname.startsWith('/sign-up')

  const submitText = isLogin ? 'Login' : isRegister ? 'Register' : 'Submit' //'Submit' fallback

  const btnText = isLogin ? 'Login' : isRegister ? 'Continue' : 'Continue' //'Continue' fallback

  const thirdPartyText = isLogin
    ? 'Or login with'
    : isRegister
      ? 'Or register with'
      : ''

  return {
    submitText,
    thirdPartyText,
    btnText,
    isLogin,
    isRegister,
    pathname,
  }
}
