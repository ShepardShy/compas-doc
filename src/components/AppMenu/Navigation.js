import {markRaw, defineAsyncComponent} from 'vue'

export default {
    frontend: [
        {
            id: 10,
            name: 'Инпут',
            component: markRaw(defineAsyncComponent(() => import('@/pages/frontend/inputs/inputs.vue')))
        },
        {
            id: 11,
            name: 'Селект',
            component: markRaw(defineAsyncComponent(() => import('@/pages/frontend/selects/selects.vue')))
        },
        {
            id: 12,
            name: 'Фильтр',
            component: markRaw(defineAsyncComponent(() => import('@/pages/frontend/filter/filter.vue')))
        },
        {
            id: 13,
            name: 'Автокомплит',
            component: markRaw(defineAsyncComponent(() => import('@/pages/frontend/autocomplete/autocomplete.vue')))
        },
        {
            id: 14,
            name: 'Файл',
            component: ''
        },
        {
            id: 15,
            name: 'Таблица',
            component: markRaw(defineAsyncComponent(() => import('@/pages/frontend/tables/tables.vue')))
        },
        {
            id: 16,
            name: 'Меню ошибки',
            component: markRaw(defineAsyncComponent(() => import('@/pages/frontend/warning/warning.vue')))
        }
    ],

    backend: [
        {
            id: 20,
            name: 'Меню',
            component: markRaw(defineAsyncComponent(() => import('@/pages/backend/menu/menu.vue')))
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