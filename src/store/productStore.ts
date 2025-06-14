import { create } from 'zustand'
import { apiRoot } from '@api/apiClient'

type CommercetoolsQueryArgs = {
  limit?: number
  offset?: number
  sort?: string[]
  filter?: string[]
  'text.en-US'?: string
  fuzzy?: boolean
  [key: string]: string | string[] | number | boolean | undefined
}

type Product = {
  variantId: number
  id: string
  slug: string
  name: string
  price: number
  discountPrice?: number
  discountId?: string
  image: string
  description: string
  categoryId: string
}

type SortOption =
  | 'default'
  | 'newest'
  | 'name-asc'
  | 'name-desc'
  | 'price-asc'
  | 'price-desc'
  | 'sale'

type ProductStore = {
  products: Product[]
  loading: boolean
  currentPage: number
  totalProductsCount: number
  sortOption: SortOption
  activeCategoryId: string | null
  priceRange: [number, number]
  searchValue: string
  resetFilters: () => void
  setPriceRange: (range: [number, number]) => void
  setActiveCategoryId: (id: string | null) => void
  setSortOption: (sort: SortOption) => void
  setCurrentPage: (page: number) => void
  setSearchValue: (value: string) => void
  fetchProducts: (page?: number, limit?: number) => Promise<void>
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  loading: false,
  currentPage: 1,
  totalProductsCount: 0,
  sortOption: 'default',
  activeCategoryId: null,
  priceRange: [0, 100],
  searchValue: '',

  setSearchValue: (value: string) => {
    set({ searchValue: value })
  },

  setPriceRange: (range) => {
    set({ priceRange: range, currentPage: 1 })
  },

  setActiveCategoryId: (id) => {
    set({ activeCategoryId: id, currentPage: 1 })
  },

  setSortOption: (sort) => {
    set({ sortOption: sort, currentPage: 1 })
  },

  setCurrentPage: (page: number) => {
    set({ currentPage: page })
  },

  resetFilters: () => {
    set({
      activeCategoryId: null,
      sortOption: 'default',
      priceRange: [0, 100],
      currentPage: 1,
      searchValue: '',
    })
  },

  fetchProducts: async (page = 1, limit = 6) => {
    const { sortOption, loading, activeCategoryId, priceRange, searchValue } =
      get()

    if (loading) return
    set({ loading: true })

    const [minPrice, maxPrice] = priceRange
    const filters: string[] = [
      'variants.price.currencyCode:"USD"',
      `variants.price.centAmount:range(${minPrice * 100} to ${maxPrice * 100})`,
    ]

    if (activeCategoryId) {
      filters.push(`categories.id:"${activeCategoryId}"`)
    }

    if (sortOption === 'newest') {
      filters.push('variants.attributes.new:true')
    }

    if (sortOption === 'sale') {
      filters.push('variants.prices.discounted:exists')
    }

    const queryArgs: CommercetoolsQueryArgs = {
      limit,
      offset: (page - 1) * limit,
      filter: filters,
    }

    if (searchValue.trim()) {
      queryArgs['text.en-US'] = searchValue
      queryArgs.fuzzy = true
      queryArgs.fuzzyLevel = 1
    }

    switch (sortOption) {
      case 'name-asc':
        queryArgs.sort = ['name.en-US asc']
        break
      case 'name-desc':
        queryArgs.sort = ['name.en-US desc']
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
        variantId: p.masterVariant.id,
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
        categoryId: p.categories?.[0]?.id,
      }))

      const currentPage = page > 1 && items.length === 0 ? 1 : page
      set({ products: items, totalProductsCount: total, currentPage })
    } catch (error) {
      console.error('Failed to fetch products:', error)
    } finally {
      set({ loading: false })
    }
  },
}))
