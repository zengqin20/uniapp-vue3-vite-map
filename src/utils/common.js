// 定义常量
export const baseURL = '/api'
export const ACCESS_TOKEN = 'Access-Token'

// 验证
export function validatePhone(value) {
  const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/ // 11位手机号码正则
  return reg.test(value)
}
