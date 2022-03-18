import { baseURL } from '@/utils/common'

const request = (options = {}) => {
  return new Promise((resolve, reject) => {
    uni
      .request({
        url: `http://localhost:3000${options.url}` || '',
        method: options.type || 'GET',
        data: options.data || {},
        header: options.header || { 'content-type': 'application/json' },
      })
      .then(data => {
        resolve(data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const getApi = (url, data, options = {}) => {
  options.type = 'GET'
  options.data = data
  options.url = url
  return request(options)
}

export const postApi = (url, data, options = {}) => {
  options.type = 'POST'
  options.data = data
  options.url = url
  return request(options)
}

export const deleteApi = (url, data, options = {}) => {
  options.type = 'DELETE'
  options.data = data
  options.url = url
  return request(options)
}

export const api = {
  // 登录
  login: '/common/login',
  beside: '/api/beside',
  search: '/api/search',
  register: '/common/register',
}
