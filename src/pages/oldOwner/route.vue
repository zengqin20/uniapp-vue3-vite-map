<template>
  <view class="content flex-center">
    <view class="no-route">
      <van-button type="primary" size="large" class="add-button">添加常用路线</van-button>

      <view class="text" v-if="isRouteMessage">
        <text class="iconfont icon-xiala"></text>
        <text class="text-info">您还未添加任何路线</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { api, getApi } from '@/request/index.js'

const isRouteMessage = ref(false)

// 查询数据库
onMounted(() => {
  getApi(api.commonRoute, { openId: uni.getStorageSync('openId') }).then(res => {
    isRouteMessage.value = !res.data.isRoute
  })
})
</script>

<style lang="less">
page {
  background-color: #f1f1f1;
}
.no-route {
  width: 92%;
  margin-top: 32px;
  &:deep(.van-button) {
    background: #fff;
    color: black;
    border-radius: 12px;
    border-color: 1px solid black;
    font-size: 8vw;
    .van-button_text {
      height: 8vw;
      font-size: 8vw;
      line-height: 8vw;
    }
  }
}
.text {
  margin-top: 54px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .icon-font {
    font-size: 16vw;
  }
  .text-info {
    font-size: 6vw;
  }
}
</style>
