<template>
  <van-notify id="van-notify" />

  <view>
    <view class="bottom">
      <van-cell-group>
        <van-field
          label="用户名"
          left-icon="user-circle-o"
          placeholder="请输入对方用户名"
          :value="userName"
          @change="changeName"
          :error-message="nameError"
        >
        </van-field>
      </van-cell-group>
    </view>
    <view class="bottom">
      <van-cell-group>
        <van-field
          label="手机号"
          placeholder="请输入对方手机号"
          left-icon="phone-o"
          :error-message="phoneError"
          :value="phone"
          @change="changePhone"
        />
      </van-cell-group>
    </view>

    <van-button type="primary" size="large" color="#ff6647" @click="handleSubmit">确认</van-button>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Notify from '@vant/weapp/dist/notify/notify'
import { api, getApi, postApi } from '@/request/index.js'
import { validatePhone } from '@/utils/common'

const userName = ref('')
const phone = ref('')
const phoneError = ref('')
const nameError = ref('')

const handleSubmit = () => {
  if (!phone.value || !userName.value) {
    Notify({ type: 'primary', message: '请完善基本信息', duration: 3000, background: '#ff6647' })
    return
  }

  // 发送请求
  const data = {
    name: userName.value,
    phone: phone.value,
  }

  postApi(api.bindParent, data, {
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-Requested-With': 'xmlhttprequest',
  }).then(res => {})
}

const changePhone = e => {
  phone.value = e.detail
  // 校验
  if (!e.detail) {
    phoneError.value = '手机号不能为空'
  } else if (!validatePhone(e.detail)) {
    phoneError.value = '请输入正确格式'
  } else {
    phoneError.value = ''
  }
}

const changeName = e => {
  userName.value = e.detail
  if (!e.detail) {
    nameError.value = '用户名不能为空'
  } else {
    nameError.value = ''
  }
}
onMounted(() => {
  console.log('bindParent')
})
</script>

<style lang="less">
page {
  width: 100%;
}
</style>
