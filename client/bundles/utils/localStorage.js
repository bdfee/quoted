export const getSessionToken = () => {
  const sessionData = window.localStorage.getItem('quoted-session')

  if (sessionData) {
    const { token } = JSON.parse(sessionData)
    return token
  }

  return null
}
