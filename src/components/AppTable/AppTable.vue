<template>
    <AppSection 
        ref="sectionRef" 
        class="section__table table-template" 
        :style="`--stickyTop: ${scrollPosition}px`" 
        :class="loaderState == 'loading' ? 'table-template_loading' : loaderState == 'filtering' ? 'table-template_filtering' : ''"
    >
        <TableTop 
            @callAction="(data) => emit('callAction', data)"
        />

        <div class="table-template__body">
            <table class="table" ref="tableRef">
                <TableHeader />
                <TableBody 
                    @callAction="(data) => emit('callAction', data)"
                />
            </table>
            <ScrollButtons />
        </div>

        <TableFooter 
            @callAction="(data) => emit('callAction', data)"
        />
    </AppSection>
</template>

<script setup>
    import './AppTable.scss';
    
    import { ref, onMounted, provide } from 'vue'

    import _ from 'lodash'
    import TableTop from './Top/Top.vue'
    import TableBody from './Body/Body.vue'
    import TableHeader from './Header/Header.vue'
    import TableFooter from './Footer/Footer.vue'
    import ScrollButtons from './ScrollButtons/ScrollButtons.vue';
    import AppSection from '@/components/AppSection/AppSection.vue';

    let fields = ref([])
    let bodyData = ref([])
    let footerData = ref({})

    const tableRef = ref(null)
    const sectionRef = ref(null)

    let selectAll = ref(false)
    let scrollPosition = ref(0)
    let sortItem = ref({
        key: 'id',
        order: 'asc'
    }) 

    let menu = ref({
        tabs: [
            {
                tab: 'enabled',
                title: 'Отображение столбцов',
            },
            {
                tab: 'fixed',
                title: 'Фиксирование столбцов',
            },
            {
                tab: 'order',
                title: 'Порядок столбцов',
            }
        ],
        saves: {
            isShow: false,
            activeTab: null,
            tabs: [
                {
                    tab: 'myself',
                    key: 'myself',
                    title: 'Применить для себя',
                },
                {
                    tab: 'roles',
                    key: 'roles',
                    title: 'Применить для роли',
                },
                {
                    tab: 'all',
                    key: 'all',
                    title: 'Применить для всех',
                }
            ],
            options: [
                {
                    id: 0,
                    sort: 0,
                    key: 'key_11',
                    title: 'Role 3.1',
                    enabled: true
                },
                {
                    id: 1,
                    sort: 0,
                    key: 'key_21',
                    title: 'Role 3.2',
                    enabled: false
                },
                {
                    id: 2,
                    sort: 0,
                    key: 'key_31',
                    title: 'Role 3.3',
                    enabled: false
                }
            ],
        },
        activeTab: null
    })

    const props = defineProps({
        tableKeys: {
            default: [
                {
                    id: 0,
                    index: 0,
                    key: "key",
                    title: null,
                    type: "text",
                    width: "0px",
                    fixed: false,
                    enabled: true,
                    sort_order: null
                }
            ],
            type: Array
        },
        tableData: {
            default: [],
            type: Array
        },
        tableFooter: {
            default: {
                pages: 0,
                activePage: 0,
                count: 25
            },
            type: Object
        },
        loaderState: {
            default: null,
            type: String
        }
    })

    const emit = defineEmits([
        'callAction'
    ])

    provide('menu', menu)
    provide('fields', fields)
    provide('sortItem', sortItem)
    provide('tableRef', tableRef)
    provide('bodyData', bodyData)
    provide('selectAll', selectAll)
    provide('sectionRef', sectionRef)
    provide('footerData', footerData)
    provide('scrollPosition', scrollPosition)
    
    onMounted(async () => {
        footerData.value = JSON.parse(JSON.stringify(props.tableFooter))
        fields.value = JSON.parse(JSON.stringify(props.tableKeys))
        bodyData.value = JSON.parse(JSON.stringify(props.tableData))
    })
</script>
