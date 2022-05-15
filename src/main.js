// Vue
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// Tailwind CSS
// import 'tailwindcss/tailwind.css'
import './main.scss';

// PrimeVue
import 'primevue/resources/themes/md-light-indigo/theme.css';  // Theme
import 'primevue/resources/primevue.min.css';                  // Core css
import 'primeicons/primeicons.css';                            // Icons
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import InputText from 'primevue/inputtext';
import Menubar from 'primevue/menubar';

// Set the LeagueId and the NFL State in the Vuex Store.
store.commit('setLeagueId', process.env.VUE_APP_LEAGUE_ID);
store.dispatch('getNflState', 'nfl')

// Create Vue App
const app = createApp(App);
app.use(store).use(router);
app.use(PrimeVue);
app.component('Button', Button);
app.component('Divider', Divider);
app.component('InputText', InputText);
app.component('Menubar', Menubar);
app.mount('#app');
