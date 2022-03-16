<template v-show="visble">
  <view v-for="row in sourceData">
    <van-cell class="cell-item" :title="row.title" :label="row.address" size="large" />
  </view>
</template>

<script setup>
const props = defineProps({
  sourceData: {
    type: Array,
    default: () => [],
  },
  visible: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="less">
.cell-item {
  &:deep(.van-cell_title) {
    font-size: 5vw;
    .van-cell_label {
      font-size: 4vw;
      width: 60vw;
    }
  }
}
</style>
