import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'packages/components/index.ts'),
      name: 'element-plus/pro-components',
      fileName: 'pro-components',
    },
    rollupOptions: {
      external: ['vue', 'element-plus'],
    }
  },
})
