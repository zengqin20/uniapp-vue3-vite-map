// 定义常量
export const baseURL = '/api'
export const ACCESS_TOKEN = 'Access-Token'

// 验证
export function validatePhone(value) {
  const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/ // 11位手机号码正则
  return reg.test(value)
}

export function handleRoute(address) {
  const { lat: latitude, lng: longitude } = address.location

  const endPoint = JSON.stringify({
    // 终点
    name: address.title,
    latitude,
    longitude,
  })

  const plugin = requirePlugin('routePlan')
  const key = 'X4EBZ-GNV3P-EA6DP-LADBT-H7CTO-VGF4F' // 使用在腾讯位置服务申请的key
  const referer = '银发易出行' // 调用插件的app的名称

  uni.navigateTo({
    url: `plugin://routePlan/index?key=${key}&referer=${referer}&endPoint=${endPoint}`,
  })
}
