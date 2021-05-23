import { Request } from '../index'

export function GetBanner(data = {}) {
  return Request({
    url: `/wx/miniprogram/user/getBanner`,
    data
  })
}
