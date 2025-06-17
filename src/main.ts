import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/main.css'
import './styles/navbar.css'
import '@fortawesome/fontawesome-free/css/all.min.css'


createApp(App).use(router).mount('#app')
