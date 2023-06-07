
import App from './App.vue'
import router from './router';
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { loadFonts } from './plugins/webfontloader';
import vuetify from './plugins/vuetify';
import 'vuetify/dist/vuetify.css';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const app = createApp(App)
const pinia = createPinia();


app.use(pinia).use(router).use(vuetify).mount('#app')
