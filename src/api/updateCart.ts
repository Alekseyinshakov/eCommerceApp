import { CartProp } from 'types'
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk'

export const updateCart = async (
  item: CartProp,
  apiRoot: ByProjectKeyRequestBuilder,
  cartData: string
) => {
  console.log('we are here')

  const { cartId, versionCart } = JSON.parse(cartData)
  const updateResponse = await apiRoot
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version: versionCart,
        actions: [
          {
            action: 'addLineItem',
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.quantity,
          },
        ],
      },
    })
    .execute()
  const updateVersion = updateResponse.body.version

  localStorage.setItem(
    'cart_data',
    JSON.stringify({ cartId, versionCart: updateVersion })
  )
  return updateResponse.body
}
