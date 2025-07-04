import { create } from 'zustand'
import { Cart } from '@commercetools/platform-sdk'

type CartStore = {
  cart: Cart | null
  setCart: (cart: Cart | null) => void
  loading: boolean
  setLoading: (loading: boolean) => void
}

export const useCartStore = create<CartStore>((set) => ({
  cart: null,
  loading: false,
  setLoading: (loading: boolean) => {
    set({ loading })
  },
  setCart: (cart: Cart | null) => {
    if (cart) {
      set({ cart })
    } else {
      set({ cart: null })
    }
  },
}))
