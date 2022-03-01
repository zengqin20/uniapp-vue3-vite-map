<template>
  <view class="content">
    <view class="text-area">
      <text class="title">1221{{ title }}</text>
    </view>
    <text>{{ a }}</text>
    <van-button type="primary">测试</van-button>
  </view>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useUserStore } from '@/store/user.js'

const useStore = useUserStore()
const a = computed(() => useStore.a)
// 调用action
Promise.resolve(useStore.setAsync(9)).then(res => console.log(a))

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
