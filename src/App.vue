<template>
  <div></div>
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
                uni.setStorageSync('token', result.data.token)
                uni.setStorageSync('userType', result.data.type)
                // 根据不同角色跳转首页
                const url = result.data.type === 'parent' ? `../oldOwner/index` : ''
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

onLaunch(() => {
  // 检查登录状态是否过期
  uni.checkSession({
    success: res => {
      // 判断是否有token
      const token = uni.getStorageSync('token')
      if (!token) {
        // 重新获取用户信息
        getUserInfo()
      } else {
        // 进入页面
        const type = uni.getStorageSync('userType')

        uni.navigateTo({
          url: type === 'parent' ? `../oldOwner/index` : '',
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
/*每个页面公共css */
/* vant - weapp */
@import './wxcomponents/@vant/weapp/dist/common/index.wxss';
@import './assets/font/iconfont.css';
</style>
