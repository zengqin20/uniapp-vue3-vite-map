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
      <view class="module-content flex-center">
        <text class="iconfont icon-route1 module-icon"></text>
        <text class="module-text">常用路线</text>
      </view>

      <view class="module-content flex-center">
        <text class="iconfont icon-route1 module-icon"></text>
        <text class="module-text">一键回家</text>
      </view>
    </view>

    <view class="beside" @click="handleBesideBus">
      <text class="beside-text"> 附近公交</text>
      <text v-if="!isMessage" class="iconfont icon-xiala down-icon"></text>
      <text v-else class="iconfont icon-xiangshang1 up-icon"></text>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const searchContent = ref('')
const isMessage = ref(false)

const handleSearch = val => {
  console.log(searchContent.value)
}

const searchChange = e => {
  searchContent.value = e.detail
}

const handleBesideBus = () => {
  isMessage.value = !isMessage.value
  console.log(isMessage.value)
  if (isMessage.value === false) return
  console.log(isMessage)
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
