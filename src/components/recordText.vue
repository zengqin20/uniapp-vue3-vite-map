<template>
  <view v-if="visible">
    <button
      class="paster-body"
      :class="{ animation: isActive }"
      @touchstart="touchStart"
      @touchend="touchEnd"
    >
      语音识别
    </button>
  </view>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

const emit = defineEmits(['ok'])
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
})

const isActive = ref(false)

// 语音插件引入
const plugin = requirePlugin('WechatSI')
const manager = plugin.getRecordRecognitionManager()

const handleVoice = () => {
  manager.start({
    duration: 60000,
    lang: 'zh_CN',
  })
}

// 初始化语音
const initRecord = () => {
  // 新的识别内容返回
  manager.onRecongnize = res => {
    console.log('识别内容')
  }

  // 结束返回callback
  manager.onStop = res => {
    console.log('识别录音内容')
    const { result } = res

    emit('ok', result)
  }
}

const touchStart = e => {
  isActive.value = true

  // 开始录音
  manager.start({
    lang: 'zh_CN',
  })
  console.log('开始录音')
}

const touchEnd = e => {
  isActive.value = false

  // 结束录音
  manager.stop()
  console.log('结束录音')
}

// 初始化获取权限
onLoad(() => {
  initRecord()
})
</script>

<style lang="less">
.ripple::before {
  content: '';
  position: absolute;
  top: 10px;
  left: 10px;
  width: 100px;
  height: 100px;
  border: 10px solid rgba(0, 110, 255, 0.3);
  border-radius: 50%;
  opacity: 0;
  animation: ripple 2s linear 1s infinite;
}

.ripple::after {
  content: '';
  position: absolute;
  top: 20px;
  left: 20px;
  width: 80px;
  height: 80px;
  border: 10px solid rgba(0, 110, 255, 0.8);
  border-radius: 50%;
  opacity: 0;
  animation: ripple 2s linear 1s infinite;
}
.animation {
  animation: ripple2 1.5s linear infinite;
}
.paster-body {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  font-size: 4vw;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ff6647;
  position: relative;
  top: 192px;
}

@keyframes ripple2 {
  0% {
    box-shadow: 0 0 0 0 rgba(#ff6647, 0.3), 0 0 0 1px rgba(#ff6647, 0.3),
      0 0 0 3px rgba(#ff6647, 0.3), 0 0 0 5px rgba(#ff6647, 0.3);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(#ff6647, 0.3), 0 0 0 10px rgba(#ff6647, 0.3),
      0 0 0 30px rgba(#ff6647, 0), 0 0 0 50px rgba(#ff6647, 0);
  }
}

@keyframes ripple {
  0% {
    transform: scale(1);
    opacity: 0;
  }

  25% {
    transform: scale(1.25);
    opacity: 0.1;
  }

  50% {
    transform: scale(1.5);
    opacity: 0.3;
  }

  75% {
    transform: scale(1.75);
    opacity: 0.5;
  }

  100% {
    transform: scale(2);
    opacity: 0;
  }
}
</style>
