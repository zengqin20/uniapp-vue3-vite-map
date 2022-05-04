<template>
  <view>
    <button class="paster-body" @touchstart="touchStart" @touchend="touchEnd" @tap="pressTap">
      报警
    </button>
  </view>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import Toast from '@vant/weapp/dist/toast/toast'

const timeStart = ref(null)
const timeEnd = ref(null)

const touchStart = e => {
  timeStart.value = e.timeStamp
  console.log('开始触发')
}
const sendMessage = () => {
  // 发送信息给绑定用户
}

const touchEnd = e => {
  timeEnd.value = e.timeStamp

  console.log('结束触发')
}
const pressTap = e => {
  console.log(1)
  console.log(timeEnd.value - timeStart.value)
  if (timeEnd.value - timeStart.value > 5000) {
    console.log('长按触发报警事件')
    sendMessage()
    Toast({ message: '警示信息已发出', type: 'success', context: this })
  }
}

onLoad(() => {})
</script>

<style lang="less">
.paster-body {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  font-size: 4vw;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ff6647;
  position: relative;
  top: 210px;
  left: 118px;
}
</style>
