<template>
  <view class="content flex-center">
    <view class="route" v-if="isHomeMessage">
      <view class="route-item">
        <view class="home-content">
          <view class="iconfont icon-yangshi_icon_tongyong_home"></view>
          <view class="nickname">{{ address }}</view>
        </view>
      </view>
    </view>
    <view class="add-route" @click="handleAddress">
      <text class="iconfont icon-tianjia"></text>
      <text class="add-text"> 更新同步地址</text>
    </view>
    <view class="text" v-if="!isHomeMessage">
      <text class="iconfont icon-meiyoushuju"></text>
      <text class="text-info">您还未添加任何地址</text>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api, getApi } from '@/request/index.js'

const isHomeMessage = ref(false)
const address = ref('')

const getAddress = () => {
  getApi(api.syncAddress).then(res => {
    isHomeMessage.value = res.data.isAddress
    address.value = res.data.address
  })
}

const handleAddress = () => {
  uni.navigateTo({
    url: `./addAddress`,
  })
}
onMounted(() => {
  console.log(1)
  getAddress()
})

// 查询数据库
</script>

<style lang="less">
page {
  background-color: #f1f1f1;
  color: #fff;
}
.content {
  background-image: linear-gradient(#ff6647, #f09819, #f1f1f1);
}
.nickname {
  font-size: 6vw;
  margin-left: 12px;
}
.add-route {
  width: 92%;
  display: flex;
  margin-top: 36px;
  border: 1px solid #d89292;
  border-radius: 12px;
  justify-content: center;
  height: 8vw;
  line-height: 8vw;
  background-color: #fff;
  padding: 8px 0;
  color: #8c7070;

  .icon-tianjia {
    font-size: 7vw;
  }
  .add-text {
    font-size: 5vw;
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
.home-content {
  display: flex;
  align-items: center;
}
.route {
  width: 92%;
  margin-top: 24px;
  .route-item {
    margin-bottom: 19px;
    display: flex;
    justify-content: space-between;
    height: auto;
    font-size: 5vw;
    border: 1px solid #fff;
    border-radius: 12px;
    padding: 8px 12px;
    .iconfont {
      font-size: 7vw;
      height: inherit;
      align-items: center;
      display: flex;
      position: relative;
      right: 4px;
    }
  }
}
</style>
