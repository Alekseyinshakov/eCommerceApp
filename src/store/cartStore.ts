import { create } from 'zustand'
import { Cart } from '@commercetools/platform-sdk'

type CartStore = {
  cart: Cart | null
  setCart: (cart: Cart | null) => void
}

export const useCartStore = create<CartStore>((set) => ({
  cart: null,

  setCart: (cart: Cart | null) => {
    if (cart) {
      set({ cart })
    } else {
      set({ cart: null })
    }
  },
}))
