import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'
import { buildCustomerClientWithToken } from './apiClient'

export const getCustomerData = async (accessToken: string) => {
  const customerClient = buildCustomerClientWithToken(`Bearer ${accessToken}`)
  const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY

  const apiRoot = createApiBuilderFromCtpClient(customerClient).withProjectKey({
    projectKey,
  })

  const me = await apiRoot.me().get().execute()

  return me.body
}
