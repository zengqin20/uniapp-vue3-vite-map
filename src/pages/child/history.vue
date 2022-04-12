<template>
  <map :markers="markers" :polyline="polyline" :longitude="longitude" :latitude="latitude"></map>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api, getApi, postApi } from '@/request/index.js'

const makers = ref([])
const polyline = ref([])
const longitude = ref('')
const latitude = ref('')
const positionArr = ref([])

onMounted(() => {
  console.log(12)
})
</script>

<style lang="less">
page {
  background-color: #f1f1f1;
}
</style>
