import {markRaw, defineAsyncComponent} from 'vue'

export default {
    frontend: [
        {
            id: 10,
            name: 'Инпут',
            component: markRaw(defineAsyncComponent(() => import('@/pages/inputs/inputs.vue')))
        },
        {
            id: 11,
            name: 'Селект',
            component: ''
        },
        {
            id: 12,
            name: 'Фильтр',
            component: markRaw(defineAsyncComponent(() => import('@/pages/filter/filter.vue')))
        },
        {
            id: 13,
            name: 'Файл',
            component: ''
        }
    ],

    backend: [
        {
            id: 20,
            name: 'Фильтр',
            component: ''
        },
        {
            id: 21,
            name: 'Детальная страница',
            component: ''
        },
        {
            id: 22,
            name: 'Страница с таблицей',
            component: ''
        },
        {
            id: 23,
            name: 'Корзина',
            component: ''
        }
    ]
}