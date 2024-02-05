import { createApp } from 'vue'
import App from './App.vue'
import { vMaska } from "maska"

const Vue = createApp(App)
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

Vue
    .directive("maska", vMaska)
    .use(Vue3Toastify, {
        autoClose: 3000,
    })
    .mount('#app')