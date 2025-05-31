import {
  createApiBuilderFromCtpClient,
  MyCustomerChangePassword,
} from '@commercetools/platform-sdk'
import { buildCustomerClientWithToken } from './apiClient'

export const changePassword = async (
  currentPassword: string,
  newPassword: string
) => {
  const tokenJSON = localStorage.getItem('customer_token')
  if (!tokenJSON) {
    throw new Error('No customer token found')
  }

  const tokenObject = JSON.parse(tokenJSON)
  const token = tokenObject.token

  const customerClient = buildCustomerClientWithToken(`Bearer ${token}`)
  const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY

  const apiRoot = createApiBuilderFromCtpClient(customerClient).withProjectKey({
    projectKey,
  })

  try {
    const { body: customer } = await apiRoot.me().get().execute()

    const body: MyCustomerChangePassword = {
      version: customer.version,
      currentPassword,
      newPassword,
    }

    const response = await apiRoot.me().password().post({ body }).execute()

    return response.body
  } catch (error) {
    console.error('Error changing password:', error)
    throw error
  }
}
