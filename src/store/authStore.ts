import { create } from 'zustand'
import { Customer } from '@commercetools/platform-sdk'

type AuthStore = {
  user: Customer | null
  setUser: (user: Customer | null) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: JSON.parse(
    localStorage.getItem('user_data') || 'null'
  ) as Customer | null,

  setUser: (user: Customer | null) => {
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
