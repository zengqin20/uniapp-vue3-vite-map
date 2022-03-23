<template>
  <van-notify id="van-notify" />

  <view v-if="isMessage" class="users">
    <text class="bind-text">已绑定用户</text>
    <van-tag class="bind-user" size="large" round color="#ff6647">{{ nickName }}</van-tag>
    <text class="iconfont icon-tianjia"></text>
  </view>

  <view v-else>
    <view class="text">
      <text class="iconfont .icon-meiyoushuju"></text>
      <text class="text-info">您还未绑定任何用户</text>
    </view>
    <view class="bottom">
      <van-cell-group>
        <van-field
          label="绑定对象"
          left-icon="user-circle-o"
          placeholder="请输入对方昵称"
          :value="parentName"
          @change="changeUser"
          :error-message="userError"
        >
        </van-field>
      </van-cell-group>
    </view>
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

    <van-button type="primary" size="large" color="#ff6647" @click="handleSubmit"
      >绑定用户</van-button
    >
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Notify from '@vant/weapp/dist/notify/notify'
import { api, getApi, postApi } from '@/request/index.js'
import { validatePhone } from '@/utils/common'

const userName = ref('')
const parentName = ref('')
const phone = ref('')
const phoneError = ref('')
const nameError = ref('')
const userError = ref('')
const nickName = ref('')
const isMessage = ref(false)

const getInfo = () => {
  isMessage.value = false
  getApi(api.bindParent).then(res => {
    if (res.data.isBind) {
      nickName.value = res.data.nickName
      isMessage.value = true
    }
  })
}

const handleSubmit = () => {
  if (!phone.value || !userName.value) {
    Notify({ type: 'primary', message: '请完善基本信息', duration: 3000, background: '#ff6647' })
    return
  }

  // 发送请求
  const data = {
    name: userName.value,
    phone: phone.value,
    nickName: parentName.value,
  }

  postApi(api.bindParent, data, {
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-Requested-With': 'xmlhttprequest',
  }).then(res => {
    if (res.data.isBind) {
      getInfo()
    }
  })
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

const changeUser = e => {
  parentName.value = e.detail
  if (!e.detail) {
    userError.value = '昵称不能为空'
  } else {
    userError.value = ''
  }
}

onMounted(() => {
  getInfo()
})
</script>

<style lang="less">
page {
  width: 100%;
}
.text {
  display: flex;
  margin: 28px 0;
  flex-direction: column;
  align-items: center;
  .iconfont {
    font-size: 35vw;
  }
}
.bottom {
  margin-bottom: 16px;
}
.users {
  padding: 24px;
  height: 16vw;
  display: flex;
  align-items: center;
  .bind-user {
    margin: 0 20px 0 36px;
  }
  .iconfont {
    font-size: 6vw;
    color: #ff6647;
  }
}
</style>
