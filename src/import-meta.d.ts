declare global {
  interface ImportMeta {
    env: {
      VITE_CTP_PROJECT_KEY: string
      VITE_CTP_SCOPES: string
      VITE_CTP_API_URL: string
      VITE_CTP_AUTH_URL: string
      VITE_CTP_CLIENT_ID: string
      VITE_CTP_CLIENT_SECRET: string
    }
  }
}

export {}
