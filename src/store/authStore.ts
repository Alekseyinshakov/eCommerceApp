import { create } from 'zustand'
import { apiRoot } from '@api/apiClient'

type User = {
  firstName: string
  lastName: string
  email: string
}

type Product = {
  id: string
  name: string
  price: number
  image: string
}

type SortOption =
  | 'default'
  | 'newest'
  // | 'discount'
  // | 'price-asc'
  // | 'price-desc'
  | 'name-asc'
  | 'name-desc'

type QueryArgs = {
  limit: number
  offset: number
  sort?: string[]
  filter?: string[]
}

type AuthStore = {
  user: User | null
  setUser: (user: User | null) => void

  loading: boolean
  products: Product[]
  currentPage: number
  totalProductsCount: number
  sortOption: SortOption
  setSortOption: (sort: SortOption) => void
  setCurrentPage: (page: number) => void
  fetchProducts: (page?: number, limit?: number) => Promise<void>
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  // --- Auth part ---
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

  // --- Shop Products part ---
  currentPage: 1,
  setCurrentPage: (page: number) => set({ currentPage: page }),

  sortOption: 'default',
  setSortOption: (sort) => set({ sortOption: sort }),

  totalProductsCount: 0,
  products: [],
  loading: false,

  fetchProducts: async (page = 1, limit = 6) => {
    const state = get()
    const { sortOption } = get()
    if (state.loading) return

    set({ loading: true })

    const queryArgs: QueryArgs = {
      limit,
      offset: (page - 1) * limit,
    }

    switch (sortOption) {
      // case 'price-asc':
      //   queryArgs.sort = ['masterVariant.price.centAmount asc']
      //   break
      // case 'price-desc':
      //   queryArgs.sort = ['masterVariant.price.centAmount desc']
      //   break
      case 'name-asc':
        queryArgs.sort = ['name.en-US asc']
        break
      case 'name-desc':
        queryArgs.sort = ['name.en-US desc']
        break
      case 'newest':
        queryArgs.sort = ['createdAt desc']
        break
      // case 'discount':
      //   queryArgs.filter = ['variants.scopedPrice.discounted:true']
      //   break
    }

    try {
      const res = await apiRoot
        .productProjections()
        .get({ queryArgs })
        .execute()

      const total = res.body.total

      const items = res.body.results.map((p) => ({
        id: p.id,
        name: p.name['en-US'] ?? 'No name',
        price:
          p.masterVariant.prices?.[0]?.value?.centAmount !== undefined
            ? p.masterVariant.prices[0].value.centAmount / 100
            : 0,
        image: p.masterVariant.images?.[0]?.url ?? '',
      }))

      set({ products: items, totalProductsCount: total })
    } catch (error) {
      console.error('Failed to fetch products:', error)
    } finally {
      set({ loading: false })
    }
  },
}))
