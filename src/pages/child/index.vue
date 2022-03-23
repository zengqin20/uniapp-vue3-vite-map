<template>
  <view class="content flex-center">
    <history v-if="activeItem === 'history'"></history>
    <location v-if="activeItem === 'location'"></location>
    <sync v-if="activeItem === 'sync'"></sync>
    <bind-parent v-if="activeItem === 'bindparent'"></bind-parent>
  </view>
  <van-tabbar :active="activeItem" @change="onChange" active-color="#ff6647">
    <van-tabbar-item name="location" icon="friends-o">实时定位</van-tabbar-item>
    <van-tabbar-item name="history" icon="search">历史轨迹</van-tabbar-item>
    <van-tabbar-item name="sync" icon="setting-o">同步</van-tabbar-item>
    <van-tabbar-item name="bindparent" icon="friends-o">家人</van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api, getApi, postApi } from '@/request/index.js'
import history from '@/pages/child/history'
import sync from '@/pages/child/sync'
import location from '@/pages/child/location'
import bindParent from '@/pages/child/bindParent'

const activeItem = ref('location')

const onChange = e => {
  activeItem.value = e.detail
}
</script>

<style lang="less">
page {
  background-color: #f1f1f1;
  color: #fff;
}
</style>
