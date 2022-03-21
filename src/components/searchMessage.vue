<template>
  <view>
    <view v-for="(row, key) in sourceData" :id="key" @tap="handleClick">
      <van-cell class="cell-item" :title="row.title" :label="row.address" size="large" />
    </view>
  </view>
</template>

<script setup>
import { onMounted, watch } from 'vue'
import { handleRoute } from '@/utils/common'

const props = defineProps({
  sourceData: {
    type: Array,
    default: () => [],
  },
  eventType: {
    type: String,
    default: 'route',
  },
})

const emit = defineEmits(['ok'])

const handleEvent = address => {
  const type = props.eventType
  if (type === 'route') {
    handleRoute(address)
  } else if (type === 'address') {
    emit('ok', address)
  }
}

const handleClick = e => {
  const address = props.sourceData[Number(e.currentTarget.id)]
  handleEvent(address)
}
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
