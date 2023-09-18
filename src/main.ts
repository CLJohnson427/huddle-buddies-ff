// Vue
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import App from './App.vue';
import './main.scss';
import router from './router';

// Create Vue App
const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(VueApexCharts);
app.mount('#app');
