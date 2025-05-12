import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@store/authStore'

const RedirectIfAuth = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = !!useAuthStore((state) => state.email)
  return isAuthenticated ? <Navigate to="/home" replace /> : <>{children}</>
}

export default RedirectIfAuth
