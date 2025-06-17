import { buildAnonymousClient } from './BuildAnonymousClient'
import { buildCustomerClientWithToken } from './apiClient'

export const getCtpClient = async () => {
  const customerData = localStorage.getItem('customer_token')
  if (customerData) {
    const accessToken = JSON.parse(customerData).token
    return buildCustomerClientWithToken(`Bearer ${accessToken}`)
  }
  return await buildAnonymousClient()
}
