<template>
  <view></view>
</template>

<script setup>
import { onMounted } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'

const plugin = requirePlugin('routePlan')
const key = 'X4EBZ-GNV3P-EA6DP-LADBT-H7CTO-VGF4F' // 使用在腾讯位置服务申请的key
const referer = '银发易出行' // 调用插件的app的名称

onLoad(options => {
  // 获取参数
  const { endPoint } = options
  console.log(endPoint)
  wx.navigateTo({
    url: `plugin://routePlan/index?key=${key}&referer=${referer}&endPoint=${endPoint}`,
  })
})
</script>

<style lang="less"></style>
