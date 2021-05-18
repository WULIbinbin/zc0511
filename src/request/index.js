import { request } from '@tarojs/taro'

export const Environment = 'DEV'

export const getConfig = () => {
  const config = {
    DEV: {
      appId: 'wx2671abc7f83d2f0c',
      baseUrl: 'https://r16754555n.51mypc.cn'
    }
  }
  return config[Environment]
}

export function Request({ data = {}, url = '', method = 'GET' }) {
  const { baseUrl } = getConfig()
  return request({
    data,
    method,
    url: baseUrl + url,
  }).then(response => {
    console.log('请求成功===================》》》',response)
    const { statusCode, data } = response
    if (statusCode === 200) {
      return Promise.resolve(data)
    }else{
      return Promise.reject(response)
    }
  }).catch(error => {
    console.warn('服务器异常===============》》》',error)
    return Promise.reject(error)
  })
}