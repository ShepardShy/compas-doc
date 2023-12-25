import { markRaw, defineAsyncComponent } from 'vue'

export default {
        fields: {
            default: [
                {
                    id: 0,
                    mask: null,
                    key: 'Input',
                    value: null,
                    type: 'text',
                    enabled: true,
                    title: 'Текстовое поле',
                    component: markRaw(defineAsyncComponent(() => import('@/components/AppInputs/Input/Input.vue')))
                },
                {
                    id: 1,
                    mask: null,
                    key: 'Textarea',
                    value: null,
                    type: 'text',
                    enabled: true,
                    title: 'Текстареа',
                    component: markRaw(defineAsyncComponent(() => import('@/components/AppInputs/Textarea/Textarea.vue')))
                }
            ],
            type: Array
        },
        saves: {
            default: [
                {
                    id: -1,
                    title: 'Скрытый фильтр',
                    is_hidden: 1,
                    sort: 0,
                    fields: [
                        {
                            id: 0,
                            key: 'Input',
                            value: null,
                        }
                    ]
                },
                {
                    id: 0,
                    title: 'Фильтр 1',
                    is_hidden: 0,
                    sort: 0,
                    fields: [
                        {
                            id: 0,
                            key: 'Input',
                            value: '11111',
                        }
                    ]
                },
                {
                    id: 1,
                    title: 'Фильтр 2',
                    is_hidden: 0,
                    sort: 1,
                    fields: []
                },        
                {
                    id: 2,
                    title: 'Фильтр 3',
                    is_hidden: 0,
                    sort: 2,
                    fields: [
                        {
                            id: 0,
                            key: 'Input',
                            value: '3333',
                        },
                        {
                            id: 1,
                            key: 'Textarea',
                            value: '3333',
                        }
                    ]
                },
            ],
            type: Array
        },
        tabs: {
            default: {
                q: 'Заполненный поиск'
            },
            type: Object
        }
}

