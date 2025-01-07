import { createApp } from 'vue';
import App from './App.vue';
import vuetify from '/src/plugins/vuetify';
import router from './router';
import { createPinia } from 'pinia';
import './styles/index.css';

const app = createApp(App);
app.use(vuetify).use(router).use(createPinia()).mount('#app');
