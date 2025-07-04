import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'
import { getCtpClient } from './getCtpClient'

export const createCustomerCart = async () => {
  const client = await getCtpClient()
  const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
  })
  try {
    const userCart = await apiRoot
      .me()
      .carts()
      .post({
        body: {
          currency: 'USD',
          country: 'US',
        },
      })
      .execute()
    if (userCart) {
      const { id, version } = userCart.body
      localStorage.setItem(
        'cart_data',
        JSON.stringify({ cartId: id, versionCart: version })
      )
    }
    return userCart.body
  } catch (error) {
    console.error('Failed to fetch user cart data:', error)
    throw error
  }
}
