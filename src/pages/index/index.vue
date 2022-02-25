<template>
  <view class="content">
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
    <text>sadasdsdads12312312</text>
    <van-button type="primary">测试</van-button>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const title = ref('hello')
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
