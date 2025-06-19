import {
  validateCity,
  validateCountry,
  validateDate,
  validateEmail,
  validateName,
  validatePostalCode,
  validateStreet,
} from '@hooks/useFormValidators.ts'

type errorsType = {
  firstName: string
  lastName: string
  email: string
  dateOfBirth: string
  street: string
  city: string
  postalCode: string
  country: string
}

export const updateError = (
  errors: errorsType,
  value: string,
  name: string
) => {
  return {
    ...errors,
    firstName: name === 'firstName' ? validateName(value) : errors.firstName,
    lastName: name === 'lastName' ? validateName(value) : errors.lastName,
    email: name === 'email' ? validateEmail(value) : errors.email,
    dateOfBirth:
      name === 'dateOfBirth' ? validateDate(value) : errors.dateOfBirth,
    street: name === 'street' ? validateStreet(value) : errors.street,
    city: name === 'city' ? validateCity(value) : errors.city,
    postalCode:
      name === 'postalCode' ? validatePostalCode(value) : errors.postalCode,
    country: name === 'country' ? validateCountry(value) : errors.country,
  }
}
