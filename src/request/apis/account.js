import { Request } from '../index'

export function GetSid(data = {}) {
  return Request({
    url: `/wx/miniprogram/user/login`,
    data
  })
}

export function PhoneRegister(data = {}) {
  return Request({
    url: `/wx/miniprogram/user/phone`,
    data
  })
}

export function GetToken(phoneNum) {
  return Request({
    url: `/oauth/token`,
    data:{
      clientId:'098f6bcd4621d373cade4e832627b4f2',
      phoneNum
    },
    method:'POST'
  })
}

export function WxPay() {
  return Request({
    url: `/wx/miniprogram/pay`,
    data:{},
    method:'POST'
  })
}