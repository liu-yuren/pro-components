import type { App } from 'vue'
import components from './components'

// 按需引入
export * from './components'

export function install(app: App) {
  console.log(app)
  console.log(install, 'install')

  // 如果组件已经注册过，则不再注册
  components.forEach((component) => {
    // 检查组件是否已经注册过
    if (!app._context.components[component.name]) {
      app.component(component.name, component)
    }
  })
}

export default install
