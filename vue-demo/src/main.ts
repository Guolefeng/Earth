import './styles/base.less'

import { createApp } from 'vue'
import store from './stores'

import ArcoVue from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.css'

import App from './App.vue'
import router from './router'


const app = createApp(App)

app.use(ArcoVue)
app.use(store)
app.use(router)

app.mount('#app')
