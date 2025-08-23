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

    // Redirect function shorthands
    // For example `/useDark` to `/core/useDark`
    ctx.router.onBeforeRouteChange = (to: string) => {
      const name = to.replace(/\.html$/i, '').replace(/^\//, '')
      if (name.includes('/'))
        return
      const fn = functions.find(f => f.name === name)
      if (!fn)
        return

      setTimeout(() => ctx.router.go(`/${fn.package}/${fn.name}/`), 0)
      // Abort the navigation
      return false
    }
    // app.use(proComponents as any)
  },
}
