export const validateEmail = (value: string): string => {
  const trimmed = value.trim()
  if (trimmed !== value) return 'Email must not have leading/trailing spaces'
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!regex.test(trimmed)) return 'Invalid email format'
  return ''
}

export const validatePassword = (value: string): string => {
  if (value.trim() !== value)
    return 'Password must not have leading/trailing spaces'
  if (value.length < 8) return 'Password must be at least 8 characters'
  if (!/[A-Z]/.test(value))
    return 'Password must contain at least one uppercase letter'
  if (!/[a-z]/.test(value))
    return 'Password must contain at least one lowercase letter'
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
