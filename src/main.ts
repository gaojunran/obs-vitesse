import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import {createPinia} from "pinia";
import { routes } from 'vue-router/auto-routes'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

const app = createApp(App)
const pinia = createPinia();
const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL),
})
app.use(router)
app.use(pinia)
app.mount('#app')
