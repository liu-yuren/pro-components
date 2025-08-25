import type { App, Plugin } from 'vue' // 只导入类型，不是值

export type SFCWithInstall<T> = T & Plugin

export function withInstall<T>(comp: any) {
  (comp as SFCWithInstall<T>).install = function (app: App) {
    app.component(comp.name, comp)
  }
  return comp as SFCWithInstall<T>
}
