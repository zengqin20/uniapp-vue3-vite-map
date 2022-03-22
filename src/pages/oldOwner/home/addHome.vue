<template>
  <view class="content flex-center">
    <view class="item zindex">
      <van-cell-group>
        <van-field label="地址" :value="inputValue" @change="changeValue">
          <van-button slot="button" size="small" type="primary" @click="handleAuth">
            我的位置
          </van-button>
        </van-field>
      </van-cell-group>
    </view>

    <view class="item-1">
      <van-cell-group>
        <van-field label="名称" :value="nickName" @change="changeName"> </van-field>
      </van-cell-group>
    </view>
    <view class="add-route" @click="handleAddHome">
      <text class="add-text"> 确定</text>
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
import { ref, watch, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { useLocationStore } from '@/store/location.js'
import searchMessage from '@/components/searchMessage'
import { api, postApi } from '@/request/index.js'

const locationStore = useLocationStore()
const isMask = ref(false)
const inputValue = ref('')
const keywordArr = ref([])
const nickName = ref('')
const isEdit = ref(false)
const deleteData = ref({})
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
    region: locationStore.city.match(/(?<=省).+市/g)[0],
  }).then(res => {
    keywordArr.value = res.data
  })
}
const changeValue = e => {
  inputValue.value = e.detail

  isMask.value = Boolean(inputValue.value)
  getKeyword()
}

const changeName = e => {
  nickName.value = e.detail
}

const handleAuth = () => {
  inputValue.value = locationStore.city
}

const handleAddHome = () => {
  // 更新删除数据
  if (isEdit.value) {
    postApi(api.homeDelete, deleteData.value).then(res => {
      console.log(res)
    })
  }

  postApi(api.home, {
    address: inputValue.value,
    nickName: nickName.value,
  }).then(res => {
    if (res.data.update) {
      uni.navigateTo({
        url: `./index`,
      })
    }
  })
}

// 重新赋值
onLoad(e => {
  isEdit.value = false
  const { name, address } = e
  if (name) {
    nickName.value = name
    inputValue.value = address

    deleteData.value = { nickName: name, address }
    isEdit.value = true
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
.zindex {
  z-index: 3;
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
.item-1 {
  &:deep(.van-field__body) {
    height: 10vw;
  }
}

.item,
.item-1 {
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
  }
  &:deep(.van-button) {
    height: 7vw;
    line-height: 6vw;
    font-size: 4vw;
    border-radius: 12px;

    position: relative;
    top: -2px;
    border: 1px solid #fff;
    background-color: #ff6647;
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
