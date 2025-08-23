import type { App } from 'vue'
// import * as proComponents from '@pro-components/components'
import { ElementPlusContainer } from '@vitepress-demo-preview/component'
import DefaultTheme from 'vitepress/theme'

import '@vitepress-demo-preview/component/dist/style.css'

// console.log(proComponents, 'proComponents')

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    ctx.app.component('demo-preview', ElementPlusContainer)
    // app.use(proComponents as any)
  },
}
