import { create } from 'zustand'

type DiscountCodeStore = {
  activeCode: string | null
  setActiveCode: (code: string | null) => void
}

export const useDiscountCodeStore = create<DiscountCodeStore>((set) => ({
  activeCode: null,
  setActiveCode: (code) => set({ activeCode: code }),
}))
