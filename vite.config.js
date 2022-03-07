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
})
