import {markRaw, defineAsyncComponent} from 'vue'

export default {
    frontend: [
        {
            id: 10,
            name: 'Инпут',
            slug: 'input',
            component: markRaw(defineAsyncComponent(() => import('@/pages/inputs/inputs.vue')))
        },
        {
            id: 11,
            name: 'Селект',
            slug: 'select',
            component: markRaw(defineAsyncComponent(() => import('@/pages/selects/selects.vue')))
        },
        {
            id: 12,
            name: 'Фильтр',
            slug: 'filter',
            component: markRaw(defineAsyncComponent(() => import('@/pages/filter/filter.vue')))
        },
        {
            id: 13,
            name: 'Автокомплит',
            slug: 'autocomplete',
            component: markRaw(defineAsyncComponent(() => import('@/pages/autocomplete/autocomplete.vue')))
        },
        {
            id: 14,
            name: 'Таблица',
            slug: 'table',
            component: markRaw(defineAsyncComponent(() => import('@/pages/tables/tables.vue')))
        },
        {
            id: 15,
            name: 'Меню',
            slug: 'menu',
            component: markRaw(defineAsyncComponent(() => import('@/pages/menu/menu.vue')))
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