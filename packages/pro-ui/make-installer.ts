import type { App, Plugin } from 'vue'

const version = '0.0.0-dev.1'

const INSTALLED_KEY = Symbol('INSTALLED_KEY')

export function makeInstaller(components: Plugin[] = []) {
  const install = (app: App) => {
    if (app[INSTALLED_KEY])
      return

    app[INSTALLED_KEY] = true
    components.forEach(c => app.use(c))
  }

  return {
    version,
    install,
  }
}
