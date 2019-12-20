// import Cookies from 'js-cookie'
export function getToken() {
  // return Cookies.get(TokenKey)
  return localStorage.getItem('token')
}
export function setToken(token) {
  return localStorage.setItem('token', token)
}
export function getrefreshToken() {
  // return Cookies.get(TokenKey)
  return localStorage.getItem('fresh-token')
}
export function setrefreshToken(token) {
  return localStorage.setItem('fresh-token', token)
}