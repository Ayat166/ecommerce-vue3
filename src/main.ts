import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './styles/main.css'
import './styles/navbar.css'
// import '@fortawesome/fontawesome-free/css/all.min.css'
import App from './App.vue'
import router from './router'
import store from './stores'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(store)
app.mount('#app')
