import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: 'packages/pro-ui/index.ts',
      name: 'MyLibrary',
      fileName: format => `lib.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled into library
      external: ['vue', 'element-plus'],
    },
  },
})
