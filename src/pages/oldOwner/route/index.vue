<template>
  <view class="content flex-center">
    <view class="route" v-if="!isRouteMessage">
      <view class="route-item" v-for="row in routes">
        <view class="start">{{ row.start }}</view>
        <view class="iconfont icon-jiantou_xiangyou"></view>
        <view class="end">{{ row.end }}</view>
      </view>
    </view>
    <view class="add-route" @click="handleAddRoute">
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
const routes = ref([])

const handleAddRoute = () => {
  uni.navigateTo({
    url: `./addRoute`,
  })
}

// 查询数据库
onMounted(() => {
  getApi(api.commonRoute).then(res => {
    isRouteMessage.value = !res.data.isRoute

    routes.value = res.data.route
  })
})
</script>

<style lang="less">
page {
  background-color: #f1f1f1;
  color: #fff;
}
.content {
  background-image: linear-gradient(#ff6647, #f09819, #f1f1f1);
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
  color: #8c7070;

  .icon-tianjia {
    font-size: 9vw;
    padding-top: 2px;
  }
  .add-text {
    font-size: 7vw;
  }
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
.route {
  width: 92%;
  .route-item {
    margin-bottom: 19px;
    display: flex;
    justify-content: space-between;
    height: auto;
    font-size: 5vw;
    border: 1px solid #fff;
    border-radius: 12px;
    padding: 4px 8px;

    .iconfont {
      font-size: 14vw;
      height: inherit;
      align-items: center;
      display: flex;
      position: relative;
      right: 4px;
    }
    .start,
    .end {
      width: 40%;
    }
  }
}
</style>
