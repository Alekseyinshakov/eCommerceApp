import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'
import { ctpClient } from '@api/BuildClient'

const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY

export const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey,
})
