import { createApp } from 'vue'
import App from './App.vue'
import { vMaska } from "maska"

const Vue = createApp(App)

Vue
    .directive("maska", vMaska)
    .mount('#app')
