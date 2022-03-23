<template>
  <view class="content">
    <text class="iconfont icon-laonianren"></text>
    <text class="iconfont icon-zinv"></text>
  </view>
  <view class="text">银发易出行</view>
</template>
<script setup>
import { onLoad, onShow, onLaunch } from '@dcloudio/uni-app'
import { api, postApi } from '@/request/index.js'

const getUserInfo = () => {
  // 处理登录
  uni.getProvider({
    service: 'oauth',
    success: res => {
      // 获取微信
      if (!res.provider.indexOf('weixin')) {
        // 获取登录
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
                // 重新设置token
                console.log('当数据库存在openID时，返回值有token')
                uni.setStorageSync('token', result.data.token)
                uni.setStorageSync('userType', result.data.type)
                // 根据不同角色跳转首页
                const url = result.data.type === 'parent' ? `../oldOwner/index` : '../child/index'
                uni.navigateTo({
                  url,
                })
              } else {
                // 注册
                console.log('获取用户信息，存入数据库')
                uni.navigateTo({
                  url: `../common/config`,
                })
              }
            })
          },
        })
      }
    },
  })
}

onLoad(() => {
  // 检查登录状态是否过期
  uni.checkSession({
    success: res => {
      // 判断是否有token
      const token = uni.getStorageSync('token')
      if (!token) {
        console.log('无token')
        // 重新获取用户信息
        getUserInfo()
      } else {
        // 进入页面
        const type = uni.getStorageSync('userType')
        console.log('有token，进入')

        uni.navigateTo({
          url: type === 'parent' ? `../oldOwner/index` : '../child/index',
        })
      }
    },
    fail: err => {
      console.log('未登录')
      getUserInfo()
    },
  })
})
</script>

<style>
.iconfont {
  color: #fff;
  font-size: 38vw;
}
page {
  background-image: linear-gradient(#ff6647, #f09819, #f1f1f1);
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 15%;
  position: relative;
  margin-top: -39px;
}
.text {
  margin-left: 27px;
  font-size: 14vw;
  margin-top: 56px;
  color: #fff;
}
</style>
