import { redirect } from 'react-router-dom'

export const getAuthToken = () => {
  const token = localStorage.getItem('token')
  return token
}

export const tokenLoader = () => {
  return getAuthToken()
}

export const checkAuthLoader = () => {
  const token = getAuthToken()

  if (!token) {
    return redirect('/auth?mode=login')
  }
}

export const getRemainingTokenExpiration = () => {
  const remaining =
    parseInt(localStorage.getItem('logedTime')) +
    60 * 60 * 1000 -
    Date.now() -
    10000

  return remaining
}
