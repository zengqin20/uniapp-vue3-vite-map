<template>
  <view class="content flex-center">
    <view class="route" v-if="!isHomeMessage">
      <view class="route-item" v-for="(row, key) in homes">
        <view class="home-content" @click="handleRouteHome" :id="key">
          <view class="iconfont icon-yangshi_icon_tongyong_home"></view>
          <view class="nickname">{{ row.nickName }}</view>
        </view>

        <view class="icon">
          <van-button class="change-icon" size="small" @click="e => handleChange(e, key)">
            修改
          </van-button>
          <van-button class="delete-icon" size="small" @click="e => handleDelete(e, key)">
            删除
          </van-button>
        </view>
      </view>
    </view>
    <view class="add-route" @click="handleAddRoute">
      <text class="iconfont icon-tianjia"></text>
      <text class="add-text"> 添加住址</text>
    </view>
    <view class="text" v-if="isHomeMessage">
      <text class="iconfont icon-meiyoushuju"></text>
      <text class="text-info">您还未添加任何地址</text>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api, getApi, postApi } from '@/request/index.js'
import { handleRoute } from '@/utils/common'

const isHomeMessage = ref(false)
const homes = ref([])

const getHomes = () => {
  getApi(api.home).then(res => {
    isHomeMessage.value = !res.data.isHome

    homes.value = res.data.home
  })
}

const handleChange = (e, index) => {
  const { nickName, address } = homes.value[index]
  uni.navigateTo({
    url: `./addHome?name=${nickName}&address=${address}`,
  })
}
const handleDelete = (e, index) => {
  const data = homes.value[index]
  postApi(api.homeDelete, data).then(res => {
    if (res.data.update) {
      // 重新请求数据
      getHomes()
    }
  })
}

const handleAddRoute = () => {
  uni.navigateTo({
    url: `./addHome`,
  })
}

// 路线
const handleRouteHome = e => {
  const { address: title, lngLocation: location } = homes.value[Number(e.currentTarget.id)]
  handleRoute({
    title,
    location,
  })
}

// 查询数据库
onMounted(() => {
  getHomes()
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
.nickname {
  font-size: 6vw;
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
.delete-icon,
.change-icon {
  &:deep(.van-button) {
    color: #8c7070;
    border-radius: 12px;
    margin-left: 12px;
    font-size: 5vw;
  }
}
</style>
