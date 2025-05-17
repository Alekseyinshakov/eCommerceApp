const allowedCountries = [
  'Canada',
  'United States',
  'Ukraine',
  'Germany',
  'France',
  'Russia',
  'Belarus',
  'Poland',
]

export const validateEmail = (value: string): string => {
  const trimmed = value.trim()
  if (!trimmed) return 'Email is required'

  if (trimmed.includes(' ')) return 'Email must not contain spaces'

  if (trimmed !== value) return 'Email must not have leading/trailing spaces'
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!regex.test(trimmed)) return 'Invalid email format'
  return ''
}

export const validatePassword = (value: string): string => {
  const trimmed = value.trim()
  if (trimmed !== value) return 'Password must not have leading/trailing spaces'
  if (value.length < 8) return 'Password must be at least 8 characters'
  if (!/[A-Z]/.test(value))
    return 'Password must contain at least one uppercase letter'
  if (!/[a-z]/.test(value))
    return 'Password must contain at least one lowercase letter'
  if (trimmed.includes(' ')) return 'Password must not contain spaces'
  if (!/[0-9]/.test(value)) return 'Password must contain at least one digit'
  return ''
}

export const validateName = (value: string): string => {
  const trimmed = value.trim()
  if (trimmed.length === 0) {
    return 'Name is required'
  }
  if (!/^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ'’ -]+$/.test(trimmed)) {
    return 'Name must contain only letters (no numbers or special characters)'
  }
  return ''
}

export const validateDate = (value: string): string => {
  if (!value) return 'Date of birth is required'

  const inputDate = new Date(value)
  if (isNaN(inputDate.getTime())) return 'Invalid date format'

  const today = new Date()
  const thirteenYearsAgo = new Date(
    today.getFullYear() - 13,
    today.getMonth(),
    today.getDate()
  )

  if (inputDate > thirteenYearsAgo) {
    return 'You must be at least 13 years old'
  }

  return ''
}

export const validateStreet = (value: string): string => {
  const trimmed = value.trim()
  if (trimmed.length === 0) {
    return 'Street is required'
  }

  return ''
}

export const validateCity = (value: string): string => {
  const trimmed = value.trim()
  if (trimmed.length === 0) {
    return 'City is required'
  }
  if (!/^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ'’ -]+$/.test(trimmed)) {
    return 'City must contain only letters (no numbers or special characters)'
  }

  return ''
}

export const validatePostalCode = (value: string): string => {
  const trimmed = value.trim()
  if (!trimmed) {
    return 'Postal code is required'
  }

  const usRegex = /^\d{5}(-\d{4})?$/
  const canadaRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/

  if (!usRegex.test(trimmed) && !canadaRegex.test(trimmed)) {
    return 'Invalid postal code format (e.g., 12345 or A1B 2C3)'
  }

  return ''
}

export const validateCountry = (value: string): string => {
  const trimmed = value.trim()
  if (!trimmed) return 'Country is required'

  if (!allowedCountries.includes(trimmed)) {
    return 'Invalid country selected'
  }

  return ''
}
