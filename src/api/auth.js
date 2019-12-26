import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  let str = Cookies.get(TokenKey);
  return str != undefined && str.length > 0 ? JSON.parse(str) : "";
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}