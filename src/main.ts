import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import router from './router/index'
import store from './store/index'
import './utils/rem'

createApp(App).use(router).use(store).use(ElementPlus).mount('#app')
