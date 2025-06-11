import { buildAnonymousClient } from './BuildAnonymousClient'
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'
import { updateCart } from './updateCart'
import { CartProp } from 'types'

export const createAnonymousCart = async (item: CartProp) => {
  const anonymousClient = buildAnonymousClient()
  const apiRoot = createApiBuilderFromCtpClient(anonymousClient).withProjectKey(
    {
      projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
    }
  )
  const cartData = localStorage.getItem('cart_data')
  try {
    if (cartData) {
      updateCart(item, apiRoot, cartData)
    } else {
      const response = await apiRoot
        .carts()
        .post({
          body: {
            currency: 'USD',
            country: 'US',
            taxMode: 'Disabled',
            lineItems: [
              {
                productId: item.productId,
                variantId: item.variantId,
                quantity: item.quantity,
              },
            ],
          },
        })
        .execute()
      const cartId = response.body.id
      const versionCart = response.body.version

      localStorage.setItem('cart_data', JSON.stringify({ cartId, versionCart }))
      return response.body
    }
  } catch (error) {
    console.error('Error creating anonymous cart:', error)
    throw error
  }
}
