import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'
import { updateCart } from './updateCart'
import { CartProp } from 'types'
import { getCtpClient } from './getCtpClient'

export const createCart = async (item: CartProp) => {
  const cartData = localStorage.getItem('cart_data')
  const client = getCtpClient()

  const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
  })

  try {
    if (cartData) {
      const updatedCart = await updateCart(item, apiRoot, cartData)
      return updatedCart
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
