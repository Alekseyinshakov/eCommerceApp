import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@store/authStore'

const RedirectNonAuthToLogin = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const isAuthenticated = !!useAuthStore((state) => state.user)
  return isAuthenticated ? <>{children}</> : <Navigate to="/log-in" replace />
}

export default RedirectNonAuthToLogin
