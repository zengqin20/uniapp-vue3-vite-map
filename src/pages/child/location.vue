<template>
  <view> 12131231 </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api, getApi } from '@/request/index.js'
import { handleLocation } from '@/utils/common'

const getLocation = () => {
  getApi(api.location).then(res => {
    if (res.data.isLocation) {
      handleLocation(res.data.location)
    } else {
      console.log('暂无位置信息可展示')
    }
  })
}

onMounted(() => {
  getLocation()
})
</script>

<style lang="less">
page {
  background-color: #f1f1f1;
}
</style>
