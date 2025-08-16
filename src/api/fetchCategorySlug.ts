import { apiRoot } from '@api/apiClient'

export const fetchCategorySlug = async (id: string): Promise<string | null> => {
  try {
    const res = await apiRoot.categories().withId({ ID: id }).get().execute()

    return res.body.slug['en-US'] ?? null
  } catch (error) {
    console.error('Failed to fetch category slug:', error)
    return null
  }
}
