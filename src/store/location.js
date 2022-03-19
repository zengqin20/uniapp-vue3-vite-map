import { defineStore } from 'pinia'
import { api, getApi } from '@/request/index.js'

export const useLocationStore = defineStore('location', {
  state: () => {
    return {
      city: '',
    }
  },
  getters: {},
  actions: {
    setCity(lat, lng) {
      getApi(api.cityMessage, {
        lat,
        lng,
      }).then(res => {
        const locationStore = useLocationStore()

        // 获取当前城市信息 并且更改pinia
        locationStore.city = res.data.city
      })
    },
  },
})
