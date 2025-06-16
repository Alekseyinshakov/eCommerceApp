import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'
import { getCtpClient } from './getCtpClient'

export const fetchCartData = async (cartId: string) => {
  try {
    const client = getCtpClient()
    const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
      projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
    })

    const cartResponse = await apiRoot
      .carts()
      .withId({ ID: cartId })
      .get()
      .execute()

    const { id, version } = cartResponse.body
    localStorage.setItem(
      'cart_data',
      JSON.stringify({ cartId: id, versionCart: version })
    )

    return cartResponse.body
  } catch (error) {
    console.error('Failed to fetch cart data:', error)
    throw error
  }
}
