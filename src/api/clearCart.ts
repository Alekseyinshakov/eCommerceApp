import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'
import { getCtpClient } from './getCtpClient'
import { CartUpdateAction } from '@commercetools/platform-sdk'

export const clearCart = async (cartId: string, cartVersion: number) => {
  try {
    const client = await getCtpClient()
    const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
      projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
    })

    const cartResponse = await apiRoot
      .carts()
      .withId({ ID: cartId })
      .get()
      .execute()

    const { lineItems, customLineItems } = cartResponse.body

    const clearCartActions: CartUpdateAction[] = [
      ...lineItems.map((item) => ({
        action: 'removeLineItem' as const,
        lineItemId: item.id,
      })),
      ...customLineItems.map((item) => ({
        action: 'removeLineItem' as const,
        lineItemId: item.id,
      })),
    ]

    if (clearCartActions.length === 0) {
      return cartResponse.body
    }

    const updatedCart = await apiRoot
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version: cartVersion,
          actions: clearCartActions,
        },
      })
      .execute()

    localStorage.setItem(
      'cart_data',
      JSON.stringify({
        cartId: updatedCart.body.id,
        versionCart: updatedCart.body.version,
      })
    )

    return updatedCart.body
  } catch (error) {
    console.error('Failed to clear cart:', error)
    throw error
  }
}
