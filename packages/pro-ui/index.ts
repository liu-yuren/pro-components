import type { App } from 'vue'
import components from './components'

// 按需引入
export * from './components'
export * from '@pro-components/components'
export * from '@pro-components/utils'

export function install(app: App) {
  components.forEach((component: any) => {
    //  如果组件已经注册过，则不再注册
    if (!app._context.components[component.name]) {
      app.component(component.name, component)
    }
  })
}

export default install
