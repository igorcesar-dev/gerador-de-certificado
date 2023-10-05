import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import("../node_modules/bootstrap/dist/css/bootstrap.css")
import("../node_modules/bootstrap/dist/js/bootstrap.js")
import("../node_modules/html2pdf.js")
import("../node_modules/xlsx/xlsx.js")


createApp(App).use(router).mount('#app')
