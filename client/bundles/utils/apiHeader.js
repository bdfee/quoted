import { getSessionToken } from './localStorage'

let csrfTokenCache = ''

const getCsrfToken = () => {
  const token = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute('content')
  // cache the token
  csrfTokenCache = token
  return token
}

export const getApiHeaders = ({ tryTokenAuth = false } = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    'X-CSRF-Token': csrfTokenCache ? csrfTokenCache : getCsrfToken(),
  }

  if (tryTokenAuth) {
    const sessionToken = getSessionToken()

    if (sessionToken) {
      headers['Authorization'] = `Bearer ${sessionToken}`
    }
  }

  return headers
}
