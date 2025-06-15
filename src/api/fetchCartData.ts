import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'
import { getCtpClient } from './getCtpClient'

export const fetchCartData = async (cartId?: string) => {
  try {
    const client = await getCtpClient()
    const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
      projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
    })
    const customerToken = !!localStorage.getItem('customer_token')
    let cartResponse
    if (customerToken) {
      cartResponse = await apiRoot.me().activeCart().get().execute()
    } else if (cartId) {
      cartResponse = await apiRoot
        .carts()
        .withId({ ID: cartId })
        .get()
        .execute()
    }
    if (cartResponse) {
      const { id, version } = cartResponse.body
      localStorage.setItem(
        'cart_data',
        JSON.stringify({ cartId: id, versionCart: version })
      )
      return cartResponse.body
    }
    return null
  } catch (error) {
    console.error('Failed to fetch cart data:', error)
    throw error
  }
}
