<template>
  <view class="text" v-if="!isLocation">
    <text class="iconfont icon-meiyoushuju"></text>
    <text class="text-info">请先去绑定相关用户</text>
  </view>

  <view v-else class="users"
    ><text class="bind-text">可查看位置信息</text>
    <view class="bind-user" v-for="row in names" @click="handleRoute(row.location)">
      {{ row.name }}</view
    >
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api, getApi } from '@/request/index.js'
import { handleLocation } from '@/utils/common'

const isLocation = ref(false)
const names = ref([])

const handleRoute = location => {
  // handleLocation(location)
  handleLocation({ latitude: 30.796937, longitude: 104.269833 })
}

const getLocation = () => {
  getApi(api.location).then(res => {
    if (res.data.isLocation) {
      isLocation.value = true
      names.value = res.data.infos
    } else {
      isLocation.value = false
    }
  })
}

onMounted(() => {
  getLocation()
})
</script>

<style lang="less">
.users {
  background-image: linear-gradient(#ff6647, #f09819, #f1f1f1);
  padding: 24px;
  height: 16vw;
  display: flex;
  align-items: center;
  .bind-user {
    margin-left: 16px;
    width: 14vw;
    border: 1px solid;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    height: 7vw;
    align-items: center;
  }
  .iconfont {
    font-size: 6vw;
    color: #8c7070;
  }
}
page {
  background-color: #f1f1f1;
  color: #fff;
}
.content {
  background-image: linear-gradient(#ff6647, #f09819, #f1f1f1);
}

.text {
  color: #8c7070;
  margin-top: 54px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .icon-meiyoushuju {
    font-size: 32vw;
    margin-bottom: 24px;
  }
  .text-info {
    font-size: 6vw;
  }
}
</style>
