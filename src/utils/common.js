// 定义常量
export const baseURL = '/api'
export const ACCESS_TOKEN = 'Access-Token'

// localStorage方法

// localStorage 方法
export const ls = {
  setItem(key, value) {
    window.localStorage.setItem(key, value)
  },
  getItem(key) {
    return window.localStorage.getItem(key)
  },
  remove(key) {
    window.localStorage.removeItem(key)
  },
  clear() {
    window.localStorage.clear()
  },
}
