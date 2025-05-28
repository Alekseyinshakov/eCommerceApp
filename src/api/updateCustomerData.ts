import {
  createApiBuilderFromCtpClient,
  Customer,
} from '@commercetools/platform-sdk'
import { buildCustomerClientWithToken } from './apiClient'

export const updateCustomerData = async (
  customer: Customer
): Promise<Customer | undefined> => {
  const tokenJSON = localStorage.getItem('customer_token')
  if (tokenJSON) {
    try {
      const tokenObject = JSON.parse(tokenJSON)
      const accessToken = tokenObject.token

      const customerClient = buildCustomerClientWithToken(
        `Bearer ${accessToken}`
      )
      const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY

      const apiRoot = createApiBuilderFromCtpClient(
        customerClient
      ).withProjectKey({
        projectKey,
      })

      const updateResponse = await apiRoot
        .me()
        .post({
          body: {
            version: customer.version,
            actions: [
              {
                action: 'setFirstName',
                firstName: customer.firstName,
              },
              {
                action: 'setLastName',
                lastName: customer.lastName,
              },
              {
                action: 'setDateOfBirth',
                dateOfBirth: customer.dateOfBirth, // формат: YYYY-MM-DD
              },
              {
                action: 'changeEmail',
                email: customer.email,
              },
            ],
          },
        })
        .execute()

      return updateResponse.body
    } catch (error) {
      console.error('Error update customer data:', error)
      throw error
    }
  }
}
