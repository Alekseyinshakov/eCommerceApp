import { getCtpClient } from './getCtpClient'
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'

export const applyDiscountCode = async (
  cartId: string,
  versionCart: number,
  code: string
) => {
  try {
    const client = getCtpClient()
    const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
      projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
    })
    const cartResponse = await apiRoot
      .me()
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version: versionCart,
          actions: [
            {
              action: 'addDiscountCode',
              code,
            },
          ],
        },
      })
      .execute()

    const { id, version } = cartResponse.body
    localStorage.setItem(
      'cart_data',
      JSON.stringify({ cartId: id, versionCart: version })
    )
    return cartResponse.body
  } catch (error) {
    console.error('Error apply discount:', error)
    throw error
  }
}
