<template>
  <view class="content flex-center">
    <view class="search">
      <view class="search-content">
        <van-search
          :value="searchContent"
          use-action-slot
          placeholder="查找目的地、公交"
          @change="searchChange"
          @search="handleSearch"
        />
      </view>
    </view>
    <view class="modules">
      <view class="module-content flex-center" @click="handleVoice">
        <text class="iconfont icon-route1 module-icon"></text>
        <text class="module-text">语音输入</text>
      </view>

      <view class="module-content flex-center">
        <text class="iconfont icon-route1 module-icon"></text>
        <text class="module-text">二维码</text>
      </view>
    </view>

    <button
      v-if="isVoice"
      class="voicebtn"
      @longtap="test"
      @touchstart="touchStart"
      @touchend="touchEnd"
    ></button>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

const searchContent = ref('')
const isVoice = ref(false)

// 语音插件引入
const plugin = requirePlugin('WechatSI')
const manager = plugin.getRecordRecognitionManager()

const searchChange = e => {
  searchContent.value = e.detail
}

const handleVoice = () => {
  isVoice.value = true
  console.log(isVoice.value)
  manager.start({
    duration: 60000,
    lang: 'zh_CN',
  })
}
const test = () => {
  console.log(121)
}

onLoad(option => {
  searchContent.value = option.searchvalue
})
const handleSearch = () => {}
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
.voicebtn {
  height: 130upx;
  display: block;
  width: 130upx;
  line-height: 130upx;
  border-radius: 65upx;
  font-size: 50upx;
  position: absolute;
  top: 1060upx;
  left: 310upx;
  background-color: #ff6647;
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
