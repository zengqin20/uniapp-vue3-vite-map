<template>
  <view class="content flex-center">
    <view class="route">
      <view class="route-item" v-for="row in parents">
        <view class="home-content">
          <van-icon name="friends-o" size="25px" />
          <text>{{ row.name }}</text>
          <view class="nickname">{{ row.address || `请输入同步地址` }}</view>
          <van-icon name="edit" size="20px" @click="handleAddress(row.name)" />
        </view>
      </view>
    </view>

    <view class="text" v-if="!isHomeMessage">
      <text class="iconfont icon-meiyoushuju"></text>
      <text class="text-info">请先去绑定相关用户</text>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api, getApi } from '@/request/index.js'

const parents = ref([])
const isHomeMessage = ref(false)

const getAddress = () => {
  getApi(api.syncAddress).then(res => {
    isHomeMessage.value = res.data.isAddress
    parents.value = res.data.infos
  })
}

const handleAddress = name => {
  uni.navigateTo({
    url: `./addAddress?name=${name}`,
  })
}
onMounted(() => {
  getAddress()
})

// 查询数据库
</script>

<style scoped lang="less">
page {
  background-color: #f1f1f1;
  color: #fff;
}
.content {
  background-image: linear-gradient(#ff6647, #f09819, #f1f1f1);
}
.nickname {
  margin-left: 12px;
  margin-right: 12px;
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
    margin-top: 28px;
    display: flex;
    justify-content: space-between;
    height: auto;
    font-size: 4vw;
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
