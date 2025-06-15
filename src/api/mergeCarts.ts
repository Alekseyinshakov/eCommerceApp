import {
  Cart,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk'
import { updateCart } from './updateCart'
import { getCtpClient } from './getCtpClient'

export const mergeCarts = async (
  anonymousCart: Cart,
  userCart: Cart
): Promise<Cart> => {
  const client = await getCtpClient()
  const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
  })
  const actions = anonymousCart.lineItems.map((item) => ({
    productId: item.productId,
    variantId: item.variant?.id ?? 1,
    quantity: item.quantity,
  }))

  return await updateCart(
    actions,
    apiRoot,
    JSON.stringify({
      cartId: userCart.id,
      versionCart: userCart.version,
    })
  )
}
