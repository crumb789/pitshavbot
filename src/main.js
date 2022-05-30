import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vueResource from 'vue-resource'
import '@/assets/style.scss'


createApp(vueResource)

createApp(App).use(store).use(router).mount('#app')

