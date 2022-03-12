import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ['vant', 'vuex', 'vue'],
  },
  plugins: [uni()],
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.vue'],
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  },
  // 开启less支持
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        // 引入全局less
        additionalData: `@import "${path.resolve(__dirname, 'src/style/common.less')}";`,
      },
    },
  },
  // 服务器
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  // 设置反向代理
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
    },
  },
})
