import instance from './instance'

export const api = {
  // 登录
  login: '/login',
  test: '/test',
}

export function postApi(url, parameter) {
  return instance({
    url,
    method: 'post',
    data: parameter,
  })
}

export function getApi(url, parameter) {
  console.log(1)
  return instance({
    url,
    method: 'get',
    params: parameter,
  })
}

export function deleteApi(url, parameter) {
  return instance({
    url,
    method: 'delete',
    params: parameter,
  })
}

export const a = 1
