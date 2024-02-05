import { createApp } from 'vue'
import App from './App.vue'
import { vMaska } from "maska"
import VueRouter from 'vue-router'
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const Vue = createApp(App)

Vue
    .directive("maska", vMaska)
    .use(VueRouter)
    .use(Vue3Toastify, {
        autoClose: 3000,
    })
    .mount('#app')