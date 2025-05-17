import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'
import { buildCustomerClient } from './apiClient'

export const loginCustomer = async (email: string, password: string) => {
  const customerClient = buildCustomerClient(email, password)
  const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY

  const apiRoot = createApiBuilderFromCtpClient(customerClient).withProjectKey({
    projectKey,
  })

  const me = await apiRoot.me().get().execute()
  return me.body
}
