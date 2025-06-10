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

export interface NotificationContextType {
  showNotification: boolean
  message: string
  setNotification: (message: string) => void
  deleteNotification: () => void
}

export type ProductDetailType = {
  id: string
  variantId: number
  name: string
  price: number
  discountPrice?: number
  discountId?: string
  images: Array<string>
  description: string
  size: string
  categories: string
  sku: string
  isDiameterBased: boolean
}
