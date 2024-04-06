import App from '@/App.vue'
import '@/style.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

// Create Vue App
const app = createApp(App)
app.use(createPinia())
app.mount('#app')
