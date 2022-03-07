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
  </view>
</template>

<script setup>
import { ref } from 'vue'

const searchContent = ref('')

const handleSearch = val => {
  console.log(searchContent.value)
}

const searchChange = e => {
  searchContent.value = e.detail
}
</script>

<style lang="less">
.search {
  font-size: 20px;
  width: 100%;
  padding-bottom: 24px;
  padding-top: 32px;
  display: flex;
  justify-content: center;
  background-image: linear-gradient(#ff6647, #f09819, #fff);
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
    height: 44px;
    .van-field__control {
      font-size: 24px;
      height: 38px;
      line-height: 38px;
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

  .module-content {
    width: 40vw;
    height: 40vw;
    background-color: #ff6647;
    color: #ffffff;
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
</style>
