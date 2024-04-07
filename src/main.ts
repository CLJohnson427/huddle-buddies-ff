import App from '@/App.vue'
import '@/global.css'
import router from '@/router/index'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

// Create Vue App
const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(VueApexCharts)
app.mount('#app')
