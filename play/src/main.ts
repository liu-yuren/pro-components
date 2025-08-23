import { createApp } from 'vue'
import ProComponents from '../../packages'

import App from './App.vue'

const app = createApp(App)
app.use(ProComponents)
app.mount('#app')
