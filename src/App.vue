<template>
  <div></div>
</template>
<script setup>
function onLaunch() {
  console.log('App Launch')
}

function onShow() {
  console.log('App Show')
}

function onHide() {
  console.log('App Hide')
}
</script>

<style>
/*每个页面公共css */
/* vant - weapp */
@import '@/wxcomponents/@vant/weapp/dist/common/index.wxss';
</style>
