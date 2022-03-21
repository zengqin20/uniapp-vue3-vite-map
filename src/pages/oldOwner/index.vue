<template>
  <view class="content flex-center">
    <view class="search">
      <view class="search-content">
        <van-search
          :value="searchContent"
          use-action-slot
          placeholder="查找目的地、公交"
          @focus="handleSearch"
        />
      </view>
    </view>
    <view class="modules">
      <view class="module-content flex-center" @click="handleCommon">
        <text class="iconfont icon-route1 module-icon"></text>
        <text class="module-text">常用路线</text>
      </view>

      <view class="module-content flex-center">
        <text class="iconfont .icon-yangshi_icon_tongyong_home module-icon"></text>
        <text class="module-text">一键回家</text>
      </view>
    </view>

    <view class="beside" @click="handleMessage" v-if="visible">
      <text class="beside-text"> 附近公交</text>
      <text v-if="!isMessage" class="iconfont icon-xiala down-icon"></text>
      <text v-else class="iconfont icon-xiangshang1 up-icon"></text>
    </view>

    <view class="buses" v-if="isMessage">
      <bus-message :source-data="busData" :visible="isMessage"></bus-message>
    </view>
  </view>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
// import { onLoad } from '@dcloudio/uni-app'
import { api, getApi } from '@/request/index.js'
import busMessage from '@/components/busMessage'
import { useLocationStore } from '@/store/location.js'

// pinia
const locationStore = useLocationStore()

const isMessage = ref(false)
const lng = ref(null)
const lat = ref(null)
const busData = ref([])
const visible = ref(false)

const handleCommon = () => {
  uni.navigateTo({
    url: `./route`,
  })
}

const handleBesideBus = () => {
  // 获取附近公交信息
  getApi(api.beside, {
    lat: lat.value,
    lng: lng.value,
  }).then(res => {
    busData.value = res.data

    visible.value = Boolean(busData.value.length)
  })
}

const getCityMessage = () => {
  getApi(api.cityMessage, {
    lat: lat.value,
    lng: lng.value,
  }).then(res => {
    // 获取当前城市信息 并且更改pinia
    locationStore.city = res.data.city
  })
}

const handleSearch = val => {
  uni.navigateTo({
    url: `./search`,
  })
}

const handleMessage = val => {
  isMessage.value = !isMessage.value
  handleBesideBus()
}

const getLocation = async () => {
  await uni.getLocation({
    type: 'gcj02',
    gecode: true,
    success: res => {
      lng.value = res.longitude
      lat.value = res.latitude
    },
  })
}

watch(
  () => lng.value,
  val => {
    if (val) {
      // 获取附近公交信息
      handleBesideBus()

      // 异步获取城市信息
      locationStore.setCity(lat.value, lng.value)
    }
  }
)
// 监听变化
locationStore.$subscribe((mutation, state) => {
  console.log(state)
})

onMounted(() => {
  getLocation()
})
</script>

<style lang="less">
.buses {
  width: 92%;
  margin-top: 24px;
}
page {
  background-color: #f1f1f1;
}
.search {
  font-size: 20px;
  width: 100%;
  padding-bottom: 24px;
  padding-top: 32px;
  display: flex;
  justify-content: center;
  background-image: linear-gradient(#ff6647, #f09819, #f1f1f1);
}
//ff512f

.search-content {
  width: 92%;

  &:deep(.van-search) {
    border-radius: 12px;
    padding: 4px 6px;
    .van-search__content {
      background-color: #ffffff;
    }
  }

  &:deep(.van-field__body) {
    height: 15vw;
    line-height: 15vw;
    .van-field__control {
      font-size: 8vw;
      height: 8vw;
    }
  }
  &:deep(.field-index--van-field) {
    align-items: center;
    .cell-index--van-cell__left-icon {
      font-size: 24px;
    }
  }
}

.modules {
  width: 92%;
  display: flex;
  justify-content: space-between;
  color: #ffffff;

  .module-content {
    width: 40vw;
    height: 40vw;
    background-color: #ff6647;
    border-radius: 12px;
    justify-content: space-evenly;
    .module-icon {
      font-size: 18vw;
    }
    .module-text {
      font-size: 8vw;
    }
  }
}
.beside {
  width: 92%;
  display: flex;
  margin-top: 24px;
  border: 1px solid #efc5c5;
  border-radius: 12px;
  justify-content: center;
  height: 15vw;
  line-height: 15vw;
  background-color: #fff;
  padding: 8px 0;
  .beside-text {
    font-size: 8vw;
    margin-right: 12px;
  }

  .up-icon {
    font-size: 8vw;
  }
  .down-icon {
    font-size: 10vw;
  }
}
</style>
