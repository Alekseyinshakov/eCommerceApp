import {
  ClientBuilder,
  HttpMiddlewareOptions,
  type AnonymousAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2'
import { v4 as uuidv4 } from 'uuid'

type CustomAnonymousAuthMiddlewareOptions = AnonymousAuthMiddlewareOptions & {
  anonymousId?: string
}

const getOrCreateAnonymousId = (): string => {
  const saved = localStorage.getItem('anonymous_data')
  if (saved) return saved
  const id = uuidv4()
  localStorage.setItem('anonymous_data', id)
  return id
}

export const buildAnonymousClient = () => {
  const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY
  const scopes = import.meta.env.VITE_CTP_SCOPES.split(' ')

  const existingToken = localStorage.getItem('anonymous_token')
  if (existingToken) {
    const httpMiddlewareOptions: HttpMiddlewareOptions = {
      host: import.meta.env.VITE_CTP_API_URL,
      fetch,
    }
    return (
      new ClientBuilder()
        .withExistingTokenFlow(existingToken, { force: true })
        .withHttpMiddleware(httpMiddlewareOptions)
        // .withLoggerMiddleware()
        .build()
    )
  }

  const authMiddlewareOptions: CustomAnonymousAuthMiddlewareOptions = {
    host: import.meta.env.VITE_CTP_AUTH_URL,
    projectKey,
    credentials: {
      clientId: import.meta.env.VITE_CTP_CLIENT_ID,
      clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET,
    },
    anonymousId: getOrCreateAnonymousId(),
    scopes,
  }

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: import.meta.env.VITE_CTP_API_URL,
    fetch,
  }

  const client = new ClientBuilder()
    .withAnonymousSessionFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    // .withLoggerMiddleware()
    .build()

  client.execute({ uri: '', method: 'GET' }).then(() => {
    const token = localStorage.getItem('commercetools_anonymous_token')
    if (token) {
      localStorage.setItem('anonymous_token', token)
    }
  })

  return client
}
