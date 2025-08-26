import { ElementPlusContainer } from '@vitepress-demo-preview/component'
import ProComponents from 'pro-ui'
import DefaultTheme from 'vitepress/theme'

import './custom.css'
import '@vitepress-demo-preview/component/dist/style.css'

// console.log(proComponents, 'proComponents')

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    ctx.app.component('demo-preview', ElementPlusContainer)
    ctx.app.use(ProComponents)
  },
}
