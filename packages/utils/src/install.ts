export function withInstall(component) {
  component.install = (app) => {
    app.component(component.name, component)
  }

  return component
}

