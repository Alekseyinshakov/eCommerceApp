import { create } from 'zustand'

type AuthStore = {
  email: string | null
  setEmail: (email: string | null) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  email: localStorage.getItem('customer_email'),

  setEmail: (email) => {
    if (email) {
      localStorage.setItem('customer_email', email)
      set({ email })
    } else {
      localStorage.removeItem('customer_email')
      localStorage.removeItem('customer_token')
      set({ email: null })
    }
  },
}))
