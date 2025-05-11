import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'
import { ctpClient } from '@api/BuildClient'

import {
  ClientBuilder,
  type PasswordAuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2'

import type { TokenStore, TokenCache } from '@commercetools/sdk-client-v2'

const tokenCache: TokenCache = {
  get: (): TokenStore => {
    const token = localStorage.getItem('customer_token')
    return token
      ? (JSON.parse(token) as TokenStore)
      : { token: '', expirationTime: 0 }
  },
  set: (token: TokenStore): void => {
    localStorage.setItem('customer_token', JSON.stringify(token))
  },
}

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
          streetName: data.street,
          city: data.city,
          postalCode: data.postalCode,
          country: data.country,
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

export const buildCustomerClient = (email: string, password: string) => {
  const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY
  const scopes = import.meta.env.VITE_CTP_SCOPES.split(' ')

  const authMiddlewareOptions: PasswordAuthMiddlewareOptions = {
    host: import.meta.env.VITE_CTP_AUTH_URL,
    projectKey,
    credentials: {
      clientId: import.meta.env.VITE_CTP_CLIENT_ID,
      clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET,
      user: {
        username: email,
        password: password,
      },
    },
    scopes,
    tokenCache,
  }

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: import.meta.env.VITE_CTP_API_URL,
    fetch,
  }

  return new ClientBuilder()
    .withPasswordFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build()
}
