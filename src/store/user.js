import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      a: 1,
    }
  },
  getters: {
    // 传入state，可以解构
    getNewNumber: state => {
      return state.a + 1
    },
    getSync: state => {
      const useStore = useUserStore()
      return state.a + useStore.getNewNumber
      // 3
    },
  },
  actions: {
    // 修改state
    setUserInfo: num => {
      const useStore = useUserStore()
      useStore.a = num
    },
    // 异步操作
    setAsync: num => {
      const useStore = useUserStore()
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          useStore.a += num
          resolve()
        }, 10000)
      })
    },
  },
})
