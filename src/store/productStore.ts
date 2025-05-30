import { create } from 'zustand'
import { apiRoot } from '@api/apiClient'

type Product = {
  id: string
  slug: string
  name: string
  price: number
  discountPrice?: number
  discountId?: string
  image: string
  description: string
}

type SortOption =
  | 'default'
  | 'newest'
  | 'name-asc'
  | 'name-desc'
  | 'price-asc'
  | 'price-desc'

type QueryArgs = {
  limit: number
  offset: number
  sort?: string[]
  filter?: string[]
}

type ProductStore = {
  products: Product[]
  loading: boolean
  currentPage: number
  totalProductsCount: number
  sortOption: SortOption

  setSortOption: (sort: SortOption) => void
  setCurrentPage: (page: number) => void
  fetchProducts: (page?: number, limit?: number) => Promise<void>
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  loading: false,
  currentPage: 1,
  totalProductsCount: 0,
  sortOption: 'default',

  setSortOption: (sort) => set({ sortOption: sort, currentPage: 1 }),
  setCurrentPage: (page: number) => set({ currentPage: page }),

  fetchProducts: async (page = 1, limit = 6) => {
    const { sortOption, loading } = get()
    if (loading) return

    set({ loading: true })

    const queryArgs: QueryArgs = {
      limit,
      offset: (page - 1) * limit,
      filter: ['variants.price.currencyCode:"USD"'],
    }

    switch (sortOption) {
      case 'name-asc':
        queryArgs.sort = ['name.en-US asc']
        break
      case 'name-desc':
        queryArgs.sort = ['name.en-US desc']
        break
      case 'newest':
        queryArgs.sort = ['createdAt desc'] // variants/attributes/name: new === true
        break
      case 'price-asc':
        queryArgs.sort = ['price asc']
        break
      case 'price-desc':
        queryArgs.sort = ['price desc']
        break
    }

    try {
      const res = await apiRoot
        .productProjections()
        .search()
        .get({ queryArgs })
        .execute()

      const total = res.body.total
      const items = res.body.results.map((p) => ({
        id: p.id,
        slug: p.slug?.['en-US'] ?? p.key,
        name: p.name['en-US'] ?? 'No name',
        price:
          p.masterVariant.prices?.[0]?.value?.centAmount !== undefined
            ? p.masterVariant.prices[0].value.centAmount / 100
            : 0,
        discountPrice: p.masterVariant?.prices?.[0]?.discounted?.value
          ?.centAmount
          ? p.masterVariant.prices[0].discounted.value.centAmount / 100
          : 0,
        discountId:
          p.masterVariant?.prices?.[0]?.discounted?.discount?.id || undefined,
        image: p.masterVariant.images?.[0]?.url ?? '',
        description: p.description?.['en-US'] ?? '',
      }))

      set({ products: items, totalProductsCount: total })
    } catch (error) {
      console.error('Failed to fetch products:', error)
    } finally {
      set({ loading: false })
    }
  },
}))
