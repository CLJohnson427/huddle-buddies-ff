// Vue
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Tailwind CSS
// import 'tailwindcss/tailwind.css'
import './main.scss'

// PrimeVue
import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import Menubar from 'primevue/menubar';
import 'primevue/resources/themes/md-light-indigo/theme.css'  // Theme
import 'primevue/resources/primevue.min.css'                  // Core css
import 'primeicons/primeicons.css'                            // Icons

// Create Vue App
const app = createApp(App)
app.use(store).use(router)
app.use(PrimeVue)
app.component('Button', Button);
app.component('Menubar', Menubar);
app.mount('#app')
