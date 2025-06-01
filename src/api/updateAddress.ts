import {
  createApiBuilderFromCtpClient,
  MyCustomerRemoveBillingAddressIdAction,
  MyCustomerRemoveShippingAddressIdAction,
} from '@commercetools/platform-sdk'
import { buildCustomerClientWithToken } from './apiClient'
import {
  MyCustomerUpdateAction,
  MyCustomerChangeAddressAction,
  MyCustomerAddShippingAddressIdAction,
  MyCustomerSetDefaultShippingAddressAction,
  MyCustomerAddBillingAddressIdAction,
  MyCustomerSetDefaultBillingAddressAction,
} from '@commercetools/platform-sdk'
import { countryCodeMap } from '@pages/AuthForms/SignUpPage'

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
  inBillingArray: boolean
  inSippingArray: boolean
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
  inBillingArray,
  inSippingArray,
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
    } else if (inSippingArray) {
      actions.push({
        action: 'removeShippingAddressId',
        addressId: id,
      } as MyCustomerRemoveShippingAddressIdAction)
    }

    if (defaultShipping) {
      actions.push({
        action: 'setDefaultShippingAddress',
        addressId: id,
      } as MyCustomerSetDefaultShippingAddressAction)
    } else {
      actions.push({
        action: 'setDefaultShippingAddress',
        addressId: null as unknown as string,
      } as MyCustomerSetDefaultShippingAddressAction)
    }

    if (billing) {
      actions.push({
        action: 'addBillingAddressId',
        addressId: id,
      } as MyCustomerAddBillingAddressIdAction)
    } else if (inBillingArray) {
      actions.push({
        action: 'removeBillingAddressId',
        addressId: id,
      } as MyCustomerRemoveBillingAddressIdAction)
    }

    if (defaultBilling) {
      actions.push({
        action: 'setDefaultBillingAddress',
        addressId: id,
      } as MyCustomerSetDefaultBillingAddressAction)
    } else {
      actions.push({
        action: 'setDefaultBillingAddress',
        addressId: null as unknown as string,
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
