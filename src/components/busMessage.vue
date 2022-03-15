<template v-show="visble">
  <view v-for="row in sourceData" class="bus-message">
    <text class="bus-name">{{ row.busStation }}</text>
    <view class="route" v-for="item in row.route">
      <text class="route-name">{{ item.name }}</text>
      <text class="route-minute" :class="{ arrived: isArrived(item.time) }">{{
        Number.isNaN(Number(item.time)) ? item.time : `距离${item.time}分钟`
      }}</text>
    </view>
  </view>
</template>

<script setup>
import { computed, ref } from 'vue'

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
/*eslint-disable*/
const isArrived = computed(() => {
  return time => {
    if (time === '即将到达') return true
  }
})
/*eslint-disable*/
</script>

<style lang="less">
.bus-message {
  background-color: #ffffff;

  padding: 4px 8px;
  border-radius: 12px;
  border: 1px solid #efc5c5;
  margin-bottom: 12px;
  color: #353232;
}
.bus-name {
  font-size: 8vw;
}
.route {
  padding: 8px 0;
  font-size: 6vw;
  display: flex;
  justify-content: space-between;

  .route-name {
    color: #793a3a;
  }
  .route-minute {
    color: #ff6647;
  }
}
.arrived {
  color: #17d800 !important;
}
</style>