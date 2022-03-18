<template>
  <van-notify id="van-notify" />

  <view class="content">
    <view class="user-type">
      <view class="text"> 角色 </view>
      <van-radio-group
        direction="horizontal"
        :value="userType"
        @change="changeType"
        class="radio-group"
      >
        <van-radio name="parent" :value="userType" checked-color="#ff6647"> 老年人 </van-radio>

        <van-radio name="child" :value="userType" checked-color="#ff6647">子女</van-radio>
      </van-radio-group>
    </view>
    <view class="bottom">
      <van-cell-group>
        <van-field
          label="用户名"
          placeholder="请输入用户名"
          :value="userName"
          @change="changeName"
          :error-message="nameError"
        >
          <van-button slot="button" size="small" type="primary" @click="handleAuth">
            用户名授权
          </van-button>
        </van-field>
      </van-cell-group>
    </view>
    <view class="bottom">
      <van-cell-group>
        <van-field
          label="手机号"
          placeholder="请输入手机号"
          :error-message="phoneError"
          :value="phone"
          @change="changePhone"
        />
      </van-cell-group>
    </view>

    <van-button
      class="submit-button"
      type="primary"
      size="large"
      color="#ff6647"
      @click="handleSubmit"
      >确认</van-button
    >
  </view>
</template>

<script setup>
import { ref } from 'vue'
// import { onLoad, onShow } from '@dcloudio/uni-app'
import Notify from '@vant/weapp/dist/notify/notify'
import { validatePhone } from '@/utils/common'
import { api, postApi } from '@/request/index.js'

const userType = ref('parent')
const userName = ref('')
const phone = ref('')
const phoneError = ref('')
const nameError = ref('')

const changeType = e => {
  userType.value = e.detail
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

const handleAuth = () => {
  uni.getUserProfile({
    desc: '获取你的昵称、地区以及性别',
    success: resInfo => {
      userName.value = resInfo.userInfo.nickName
    },
    fail: err => {
      console.log(err)
    },
  })
}

const handleSubmit = () => {
  if (!phone.value || !userName.value) {
    Notify({ type: 'primary', message: '请完善基本信息', duration: 3000, background: '#ff6647' })
    return
  }
  // 发送请求
  const data = {
    type: userType.value,
    name: userName.value,
    phone: phone.value,
    openId: uni.getStorageSync('openId'),
  }

  // 注册
  postApi(api.register, data, {
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-Requested-With': 'xmlhttprequest',
  }).then(res => {
    if (res.data.session) {
      // 调用登录接口
      uni.login({
        provider: 'weixin',
        success: loginRes => {
          // 置换token
          postApi(
            api.login,
            {
              code: loginRes.code,
            },
            {
              'Content-Type': 'application/x-www-form-urlencoded',
              'X-Requested-With': 'xmlhttprequest',
            }
          ).then(result => {
            // 根据返回值，确定是否登录过，查询数据库

            uni.setStorageSync('openId', result.data.openId)
            if (result.data.token) {
              // 设置token
              uni.setStorageSync('token', result.data.token)
              // 根据不同角色跳转首页
              const url = result.data.type === 'parent' ? '../oldOwner/index' : ''
              uni.navigateTo({
                url,
              })
            }
          })
        },
      })
    }
  })
}
</script>

<style lang="less">
.bottom {
  margin-bottom: 44px;

  &:deep(.van-button) {
    background-color: #ff6647;
    border: 1px solid;
    border-radius: 12px;
    width: 84px;
  }
}
.content {
  border: 1px solid #eadbdb;
  border-radius: 12px;
  background-color: #fff;
}
page {
  background-color: #f1f1f1;
}
.radio-group {
  font-size: 5vw;
  display: flex;
  &:deep(.van-radio) {
    height: 10vw;
    padding-right: 12px;
    .van-radio__label {
      color: #c0c0d0;
    }
  }
  .iconfont {
    font-size: 5vw;
  }
}
.user-type {
  margin-top: 12px;
  margin-bottom: 40px;
  display: flex;
  .text {
    line-height: 10vw;
    height: 10vw;
    font-size: 5vw;
    margin: 0 21px 0 16px;
    color: #646566;
    width: 78px;
  }
}
&:deep(.van-cell-group) {
  height: 10vw;
}

&:deep(.van-field__label) {
  font-size: 5vw;
}
&:deep(.van-button) {
  border-radius: 24px;
  width: 96%;
}
&:deep(.van-hairline--top-bottom:after, .van-hairline--bottom:after) {
  border: unset !important;
}

&:deep(.van-cell:after) {
  border: unset !important;
}
.auth-button {
  &:deep(.van-button) {
    width: 53vw;
    border-radius: 15px;
    background-color: #ff6647;
    color: #ffff;
    font-size: 6vw;
    display: flex;
    position: relative;
    top: 50%;
    margin-top: -22px;
  }
}
.van-notify > text {
  font-size: 6vw;
}
</style>
