import {
  createApiBuilderFromCtpClient,
  MyCustomerRemoveAddressAction,
} from '@commercetools/platform-sdk'
import { buildCustomerClientWithToken } from './apiClient'

export const deleteAddress = async (addressId: string) => {
  const tokenJSON = localStorage.getItem('customer_token')
  if (!tokenJSON) {
    throw new Error('No customer token found')
  }

  try {
    const tokenObject = JSON.parse(tokenJSON)
    const accessToken = tokenObject.token

    const customerClient = buildCustomerClientWithToken(`Bearer ${accessToken}`)
    const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY

    const apiRoot = createApiBuilderFromCtpClient(
      customerClient
    ).withProjectKey({
      projectKey,
    })

    const customerJSON = localStorage.getItem('user_data')
    if (!customerJSON) {
      throw new Error('No customer data found')
    }

    const customer = JSON.parse(customerJSON)

    const action: MyCustomerRemoveAddressAction = {
      action: 'removeAddress',
      addressId: addressId,
    }

    const requestPayload = {
      body: {
        version: customer.version,
        actions: [action],
      },
    }

    const updateResponse = await apiRoot.me().post(requestPayload).execute()

    return updateResponse.body
  } catch (error) {
    console.error('Error deleting address:', error)
    throw error
  }
}
