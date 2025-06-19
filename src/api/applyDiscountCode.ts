import { getCtpClient } from './getCtpClient'
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'

type DiscountCodeRemove = {
  typeId: 'discount-code'
  id: string
}

export const applyDiscountCode = async (
  cartId: string,
  versionCart: number,
  code: string | DiscountCodeRemove,
  action: 'addDiscountCode' | 'removeDiscountCode'
) => {
  try {
    const client = await getCtpClient()
    const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
      projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
    })
    const cartResponse = await apiRoot

      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version: versionCart,
          actions: [
            action === 'addDiscountCode'
              ? { action: 'addDiscountCode', code: code as string }
              : {
                  action: 'removeDiscountCode',
                  discountCode: {
                    typeId: 'discount-code',
                    id: typeof code === 'string' ? code : code.id,
                  },
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
    console.info('Error apply discount:', error)
    throw error
  }
}
