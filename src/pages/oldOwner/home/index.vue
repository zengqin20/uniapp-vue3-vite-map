<template>
  <view class="content flex-center">
    <view class="add-route" @click="handleAdd">
      <text class="iconfont icon-tianjia"></text>
      <text class="add-text"> 添加常用路线</text>
    </view>

    <view class="text" v-if="isRouteMessage">
      <text class="iconfont icon-meiyoushuju"></text>
      <text class="text-info">您还未添加任何路线</text>
    </view>
  </view>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { api, getApi } from '@/request/index.js'

const isRouteMessage = ref(false)

const handleAdd = () => {
  uni.navigateTo({
    url: `./addHome`,
  })
}

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
  color: #1d0f0c;
}
.add-route {
  width: 92%;
  display: flex;
  margin-top: 36px;
  border: 1px solid #d89292;
  border-radius: 12px;
  justify-content: center;
  height: 12vw;
  line-height: 12vw;
  background-color: #fff;
  padding: 8px 0;
  .icon-tianjia {
    font-size: 9vw;
    padding-top: 2px;
  }
  .add-text {
    font-size: 7vw;
  }
}
.text {
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
