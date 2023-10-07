import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import("../node_modules/bootstrap/dist/css/bootstrap.css")
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

createApp(App).use(router).mount('#app')
