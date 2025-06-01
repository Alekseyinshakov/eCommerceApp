import { create } from 'zustand'
import { apiRoot } from '@api/apiClient'
import type { Category } from '@store/types'

type CategoriesStore = {
  loading: boolean
  fetched: boolean
  categories: Category[]
  fetchCategories: () => Promise<void>
}

export const useCategoriesStore = create<CategoriesStore>((set, get) => ({
  loading: false,
  fetched: false,
  categories: [],
  fetchCategories: async () => {
    const { fetched, loading } = get()
    if (fetched || loading) return

    set({ loading: true })

    try {
      const [productsRes, categoriesRes] = await Promise.all([
        apiRoot
          .productProjections()
          .search()
          .get({ queryArgs: { limit: 100 } })
          .execute(),
        apiRoot
          .categories()
          .get({ queryArgs: { limit: 100 } })
          .execute(),
      ])

      const rawProducts = productsRes.body.results
      const allCategories = categoriesRes.body.results

      const categoryCount: Record<string, number> = {}

      for (const p of rawProducts) {
        const productCategories = p.categories?.map((c) => c.id) ?? []
        productCategories.forEach((catId) => {
          categoryCount[catId] = (categoryCount[catId] || 0) + 1
        })
      }

      const categoryList: Category[] = Object.entries(categoryCount).map(
        ([id, count]) => {
          const category = allCategories.find((cat) => cat.id === id)
          return {
            id,
            label: category?.name?.['en-US'] || 'Unknown',
            count,
          }
        }
      )

      set({
        categories: categoryList,
        fetched: true,
      })
    } catch (err) {
      console.error('Failed to fetch categories:', err)
    } finally {
      set({ loading: false })
    }
  },
}))
