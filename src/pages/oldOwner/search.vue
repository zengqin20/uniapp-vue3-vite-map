<template>
  <view class="content flex-center">
    <view class="search">
      <view class="search-content">
        <van-search
          :value="searchContent"
          placeholder="查找目的地、公交"
          @change="searchChange"
          @search="handleSearch"
        />
      </view>
    </view>

    <view class="modules">
      <view class="module-content flex-center" @click="handleVoice">
        <text class="iconfont icon-yuyin module-icon"></text>
        <text class="module-text">语音输入</text>
      </view>

      <view class="module-content flex-center">
        <text class="iconfont icon-31erweima module-icon"></text>
        <text class="module-text">二维码</text>
      </view>
    </view>

    <view>
      <van-overlay :show="isMask" @click="handleHide">
        <view class="wrapper">
          <search-message :source-data="keywordArr"></search-message>
        </view>
      </van-overlay>
    </view>

    <view><record-text :visible="recordVisible" @ok="handleRecord"></record-text></view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api, getApi, postApi } from '@/request/index.js'
import searchMessage from '@/components/searchMessage'
import recordText from '@/components/recordText'
import { useLocationStore } from '@/store/location.js'
import { handleRoute } from '@/utils/common'

const searchContent = ref('')
const isMask = ref(false)
const keywordArr = ref([])
const recordVisible = ref(false)

// pinia
const locationStore = useLocationStore()

const handleHide = () => {
  isMask.value = false
}

// 语音识别内容 回填数据
const handleRecord = val => {
  searchContent.value = val
}

// 获取权限
const handleVoice = () => {
  uni.authorize({
    scope: 'scope.record',
    success: res => {
      recordVisible.value = true
    },
  })
}

const getKeyword = () => {
  const keyword = searchContent.value || null
  postApi(api.search, {
    keyword,
    region: locationStore.city.match(/(?<=省).+市/g)[0],
  }).then(res => {
    keywordArr.value = res.data
  })
}

const searchChange = e => {
  searchContent.value = e.detail

  isMask.value = Boolean(searchContent.value)
  getKeyword()
}

const handleSearch = () => {
  // 获取第一目标地点
  const address = keywordArr.value[0]

  handleRoute(address)
}
</script>

<style lang="less">
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
  z-index: 2;
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
    .cell-indx--van-cell__left-icon {
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
.wrapper {
  width: 92%;
  background: white;
  margin: 0 auto;
  position: relative;
  top: 99px;
  height: 350px;
  overflow: auto;
  border-radius: 0 0 12px 12px;
}

// .voicepad {
//   height: 250upx;
//   width: 680upx;
//   background: #fff;
//   margin: 30upx auto;
//   border-radius: 8upx;
//   color: #cccccc;
//   padding: 20upx;
//   font-size: 35upx;
// }
</style>
