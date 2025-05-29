import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'
import { buildCustomerClientWithToken } from './apiClient'
import {
  MyCustomerUpdateAction,
  MyCustomerChangeAddressAction,
  MyCustomerAddShippingAddressIdAction, // Используется вместо MyCustomerSetShippingAddressAction
  MyCustomerSetDefaultShippingAddressAction,
  MyCustomerAddBillingAddressIdAction, // Используется вместо MyCustomerSetBillingAddressAction
  MyCustomerSetDefaultBillingAddressAction,
} from '@commercetools/platform-sdk'

type NewAddressData = {
  id: string | undefined
  country: string
  city: string | undefined
  street: string | undefined
  postalCode: string | undefined
  shipping: boolean
  billing: boolean
  defaultShipping: boolean
  defaultBilling: boolean
}

const countryCodeMap: Record<string, string> = {
  Canada: 'CA',
  'United States': 'US',
  Ukraine: 'UA',
  Germany: 'DE',
  France: 'FR',
  Russia: 'RU',
  Belarus: 'BY',
  Poland: 'PL',
}

export const updateAddress = async ({
  id,
  country,
  city,
  street,
  postalCode,
  shipping,
  billing,
  defaultShipping,
  defaultBilling,
}: NewAddressData) => {
  const tokenJSON = localStorage.getItem('customer_token')
  if (!tokenJSON) {
    throw new Error('No customer token found')
  }

  try {
    const tokenObject = JSON.parse(tokenJSON)
    const accessToken = tokenObject.token

    const customerClient = buildCustomerClientWithToken(`Bearer ${accessToken}`)
    const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY

    const apiRoot = createApiBuilderFromCtpClient(
      customerClient
    ).withProjectKey({
      projectKey,
    })

    const customerJSON = localStorage.getItem('user_data')
    if (!customerJSON) {
      throw new Error('No customer data found')
    }

    const customer = JSON.parse(customerJSON)
    const actions: MyCustomerUpdateAction[] = []

    if (!id) {
      throw new Error('Address ID is required')
    }

    actions.push({
      action: 'changeAddress',
      addressId: id,
      address: {
        country: countryCodeMap[country] || country,
        city,
        streetName: street,
        postalCode,
      },
    } as MyCustomerChangeAddressAction)

    if (shipping) {
      actions.push({
        action: 'addShippingAddressId',
        addressId: id,
      } as MyCustomerAddShippingAddressIdAction)
    }

    if (defaultShipping) {
      actions.push({
        action: 'setDefaultShippingAddress',
        addressId: id,
      } as MyCustomerSetDefaultShippingAddressAction)
    }

    if (billing) {
      actions.push({
        action: 'addBillingAddressId',
        addressId: id,
      } as MyCustomerAddBillingAddressIdAction)
    }

    if (defaultBilling) {
      actions.push({
        action: 'setDefaultBillingAddress',
        addressId: id,
      } as MyCustomerSetDefaultBillingAddressAction)
    }

    const requestPayload = {
      body: {
        version: customer.version,
        actions: actions,
      },
    }

    const updateResponse = await apiRoot.me().post(requestPayload).execute()

    return updateResponse.body
  } catch (error) {
    console.error('Error updating address:', error)
    throw error
  }
}
