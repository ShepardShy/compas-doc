import { createApp } from 'vue'
import App from './App.vue'
import { vMaska } from "maska"
import { createYmaps } from 'vue-yandex-maps';
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const Vue = createApp(App)

Vue
    .directive("maska", vMaska)
    .use(createYmaps({
        apikey: 'ef7607ff-665a-4e98-a65b-c73d97c69005',
        lang: 'ru_RU'
    }))
    .use(Vue3Toastify, {
        autoClose: 3000,
    })
    .mount('#app')