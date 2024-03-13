import {markRaw, defineAsyncComponent} from 'vue'

export default {
    frontend: [
        {
            id: 8,
            name: 'Кнопки',
            slug: 'buttons',
            component: markRaw(defineAsyncComponent(() => import('@/pages/frontend/buttons/buttons.vue')))
        },
        {
            id: 9,
            name: 'Заголовки',
            slug: 'headers',
            component: markRaw(defineAsyncComponent(() => import('@/pages/frontend/headers/headers.vue')))
        },
        {
            id: 10,
            name: 'Инпут',
            slug: 'input',
            component: markRaw(defineAsyncComponent(() => import('@/pages/frontend/inputs/inputs.vue')))
        },
        {
            id: 11,
            name: 'Селект',
            slug: 'select',
            component: markRaw(defineAsyncComponent(() => import('@/pages/frontend/selects/selects.vue')))
        },
        {
            id: 12,
            name: 'Фильтр',
            slug: 'filter',
            component: markRaw(defineAsyncComponent(() => import('@/pages/frontend/filter/filter.vue')))
        },
        {
            id: 13,
            name: 'Автокомплит',
            slug: 'autocomplete',
            component: markRaw(defineAsyncComponent(() => import('@/pages/frontend/autocomplete/autocomplete.vue')))
        },
        {
            id: 14,
            name: 'Таблица',
            slug: 'table',
            component: markRaw(defineAsyncComponent(() => import('@/pages/frontend/tables/tables.vue')))
        },
        {
            id: 15,
            slug: 'menu',
            name: 'Меню',
            component: markRaw(defineAsyncComponent(() => import('@/pages/frontend/menu/menu.vue')))
        },
        {
            id: 16,
            name: 'Меню ошибки',
            slug: 'menu-warning',
            component: markRaw(defineAsyncComponent(() => import('@/pages/frontend/warning/warning.vue')))
        },
        {
            id: 17,
            name: 'Адрес',
            slug: 'address',
            component: markRaw(defineAsyncComponent(() => import('@/pages/frontend/address/address.vue')))
        },
        {
            id: 18,
            name: 'Секция',
            slug: 'tile-section',
            component: markRaw(defineAsyncComponent(() => import('@/pages/frontend/tileSection/tileSection.vue')))
        },
        {
            id: 19,
            name: 'История',
            slug: 'history',
            component: markRaw(defineAsyncComponent(() => import('@/pages/frontend/history/history.vue')))
        },
        {
            id: 23,
            name: 'Плашки',
            slug: 'tabs',
            component: markRaw(defineAsyncComponent(() => import('@/pages/frontend/tabs/tabs.vue')))
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
            name: 'Страница с таблицей',
            component: markRaw(defineAsyncComponent(() => import('@/pages/backend/pageTable/pageTable.vue')))
        },
        {
            id: 22,
            name: 'Детальная страница',
            component: markRaw(defineAsyncComponent(() => import('@/pages/backend/details/details.vue')))
        },
    ]
}