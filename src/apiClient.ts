import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'
import { ctpClient } from './BuildClient'

const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY

export const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey,
})

export const registerCustomer = async (data: {
  email: string
  password: string
  firstName: string
  lastName: string
  dateOfBirth: string
  street: string
  city: string
  postalCode: string
  country: string
}) => {
  const hasAddress = Boolean(
    data.street && data.city && data.postalCode && data.country
  )
  const address = hasAddress
    ? [
        {
          streetName: data.street || '',
          city: data.city || '',
          postalCode: data.postalCode || '',
          country: data.country || '',
        },
      ]
    : []
  const response = await apiRoot
    .customers()
    .post({
      body: {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth,
        addresses: address,
        defaultShippingAddress: hasAddress ? 0 : undefined,
        defaultBillingAddress: hasAddress ? 0 : undefined,
      },
    })
    .execute()
  console.log(response.body)
  return response.body
}
