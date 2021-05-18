import { Request } from '../index'

export function getSid(data = {}) {
  return Request({
    url: `/wx/miniprogram/user/login`,
    data
  })
}

export function register(data = {}) {
  return Request({
    url: `/wx/miniprogram/user/phone`,
    data
  })
}