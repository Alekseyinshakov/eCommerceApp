import { buildCustomerClientWithToken } from './apiClient'
import {
  createApiBuilderFromCtpClient,
  MyCustomerAddAddressAction,
  MyCustomerUpdateAction,
  MyCustomerAddShippingAddressIdAction,
  MyCustomerSetDefaultShippingAddressAction,
  MyCustomerAddBillingAddressIdAction,
  MyCustomerSetDefaultBillingAddressAction,
} from '@commercetools/platform-sdk'

type NewAddressData = {
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

export const addNewAddress = async ({
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

    actions.push({
      action: 'addAddress',
      address: {
        country: countryCodeMap[country] || country,
        city,
        streetName: street,
        postalCode,
      },
    } as MyCustomerAddAddressAction)

    const response = await apiRoot
      .me()
      .post({
        body: {
          version: customer.version,
          actions: actions,
        },
      })
      .execute()

    let finalResponse = response

    const newAddressId = response.body.addresses.find(
      (a) =>
        a.streetName === street &&
        a.postalCode === postalCode &&
        a.city === city &&
        a.country === (countryCodeMap[country] || country)
    )?.id

    if (newAddressId) {
      const updateActions = []

      if (shipping) {
        actions.push({
          action: 'addShippingAddressId',
          addressId: newAddressId,
        } as MyCustomerAddShippingAddressIdAction)
      }

      if (billing) {
        actions.push({
          action: 'addBillingAddressId',
          addressId: newAddressId,
        } as MyCustomerAddBillingAddressIdAction)
      }

      if (defaultShipping) {
        updateActions.push({
          action: 'setDefaultShippingAddress',
          addressId: newAddressId,
        } as MyCustomerSetDefaultShippingAddressAction)
      }

      if (defaultBilling) {
        updateActions.push({
          action: 'setDefaultBillingAddress',
          addressId: newAddressId,
        } as MyCustomerSetDefaultBillingAddressAction)
      }

      if (updateActions.length > 0) {
        finalResponse = await apiRoot
          .me()
          .post({
            body: {
              version: response.body.version,
              actions: updateActions,
            },
          })
          .execute()
      }
    }

    return finalResponse.body
  } catch (error) {
    console.error('Error adding address:', error)
    throw error
  }
}
