
import App from './App.vue'
import router from './router';
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { loadFonts } from './plugins/webfontloader';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css';

const vuetify = createVuetify({
  components,
  directives,
})
loadFonts();
const app = createApp(App)
const pinia = createPinia();


app.use(pinia).use(router).use(vuetify).mount('#app')
