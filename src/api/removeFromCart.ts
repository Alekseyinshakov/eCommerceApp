import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'
import { CartProp } from 'types'
import { getCtpClient } from './getCtpClient'

export const removeFromCart = async (
  item: CartProp,
  lineItemId: string,
  cartData: string
) => {
  try {
    const client = await getCtpClient()
    const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
      projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
    })

    const { cartId, versionCart } = JSON.parse(cartData)

    const updateResponse = await apiRoot
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version: versionCart,
          actions: [
            {
              action: 'removeLineItem',
              lineItemId: lineItemId,
              quantity: item.quantity,
            },
          ],
        },
      })
      .execute()

    const newVersion = updateResponse.body.version
    localStorage.setItem(
      'cart_data',
      JSON.stringify({ cartId, versionCart: newVersion })
    )

    return updateResponse.body
  } catch (error) {
    console.error('Failed to remove item from cart:', error)
    throw error
  }
}
