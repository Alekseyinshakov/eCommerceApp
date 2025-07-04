import { CartProp } from 'types'
import {
  ByProjectKeyRequestBuilder,
  CartAddLineItemAction,
} from '@commercetools/platform-sdk'

export const updateCart = async (
  items: CartProp | Array<CartProp>,
  apiRoot: ByProjectKeyRequestBuilder,
  cartData: string
) => {
  const { cartId, versionCart } = JSON.parse(cartData)
  const itemsArray = Array.isArray(items) ? items : [items]

  const actions: Array<CartAddLineItemAction> = itemsArray.map((item) => ({
    action: 'addLineItem',
    productId: item.productId,
    variantId: item.variantId,
    quantity: item.quantity,
  }))

  const updateResponse = await apiRoot
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version: versionCart,
        actions,
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
