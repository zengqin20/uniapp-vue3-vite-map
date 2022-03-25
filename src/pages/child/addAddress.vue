<template>
  <view class="content flex-center">
    <view class="item">
      <van-cell-group>
        <van-field label="地址" :value="inputValue" @change="changeValue"> </van-field>
      </van-cell-group>
    </view>
    <view class="add-route" @click="handleAddHome">
      <text class="add-text"> 更新</text>
    </view>
  </view>
  <view>
    <van-overlay :show="isMask" @click="handleHide">
      <view class="wrapper">
        <search-message
          :source-data="keywordArr"
          event-type="address"
          @ok="handleAddress"
        ></search-message>
      </view>
    </van-overlay>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

import { useLocationStore } from '@/store/location.js'
import searchMessage from '@/components/searchMessage'
import { api, postApi } from '@/request/index.js'

const isMask = ref(false)
const inputValue = ref('')
const keywordArr = ref([])
const name = ref('')

const handleAddress = data => {
  inputValue.value = data.address
}

const handleHide = () => {
  isMask.value = false
}

const getKeyword = () => {
  const keyword = inputValue.value || null
  postApi(api.search, {
    keyword,
    region: '成都市',
  }).then(res => {
    keywordArr.value = res.data
  })
}

const changeValue = e => {
  inputValue.value = e.detail

  isMask.value = Boolean(inputValue.value)
  getKeyword()
}

const handleAddHome = () => {
  postApi(api.syncAddress, {
    address: inputValue.value,
    nickName: name.value,
  }).then(res => {
    if (res.data.addAddress) {
      uni.navigateTo({
        url: `./index?name=sync`,
      })
    }
  })
}

onLoad(e => {
  if (e.name) {
    name.value = e.name
  }
})
</script>

<style lang="less">
page {
  background-color: #f1f1f1;
}

&:deep(.van-hairline--top-bottom:after, .van-hairline--bottom:after) {
  border: unset !important;
}

&:deep(.van-cell:after) {
  border: unset !important;
}

&:deep(.van-field__label) {
  font-size: 5vw;
  width: 40px;
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
  height: 10vw;
  line-height: 10vw;
  background-color: #fff;
  color: #8c7070;
  padding: 8px 0;
  .add-text {
    font-size: 7vw;
  }
}

.item {
  z-index: 3;

  margin: 24px 0;
  width: 92%;
  background-color: #fff;

  &:deep(.field-index--van-field) {
    height: 15vw;
    font-size: 6vw;
    line-height: 9vw;
    justify-content: space-around;
    .van-cell__title {
      width: 52px;
      padding-left: 12px;
      max-height: unset !important;
      min-width: unset !important;
      flex: unset !important;
    }
    .van-field__body {
      height: 10vw;
      position: relative;
      top: -3px;
    }
  }
}
.wrapper {
  width: 92%;
  background: white;
  margin: 0 auto;
  position: relative;
  top: 72px;
  height: 350px;
  overflow: auto;
  border-radius: 0 0 12px 12px;
}
</style>
