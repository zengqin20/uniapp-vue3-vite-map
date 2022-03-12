import axios from 'axios-miniprogram'
import { baseURL, ls } from '@/utils/common.js'

const instance = axios

instance.defaults.baseURL = baseURL
instance.defaults.headers = {
  'content-type': 'application/json',
}

// 请求拦截器
instance.interceptors.request.use(config => {
  // 使用jwt
  //   const token = ls.getItem(ACCESS_TOKEN)
  //   if (token) config.headers['Authorization'] = `Bearer${token}`

  console.log('request拦截器')
  console.log(config)
  return config
})

// 响应拦截器
// 错误统一处理
instance.interceptors.response.use(
  res => res,
  err => {
    console.log(err.response)
  }
)

export default instance
