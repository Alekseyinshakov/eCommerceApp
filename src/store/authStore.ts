import { create } from 'zustand'

type User = {
  firstName: string
  lastName: string
  email: string
}

type AuthStore = {
  user: User | null
  setUser: (user: User | null) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: JSON.parse(localStorage.getItem('user_data') || 'null') as User | null,

  setUser: (user: User | null) => {
    if (user) {
      localStorage.setItem('user_data', JSON.stringify(user))
      set({ user })
    } else {
      localStorage.removeItem('user_data')
      localStorage.removeItem('customer_token')
      set({ user: null })
    }
  },
}))
