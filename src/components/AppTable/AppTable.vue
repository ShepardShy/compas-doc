<template>
    <AppSection ref="sectionRef" class="section__table table-template">
        <TableTop 
            @saveFields="(data) => saveFields(data)"
        />

        <div class="table-template__body">
            <table class="table" ref="tableRef">
                <TableHeader />
                <tbody class="table__body">
                    <tr class="table__row" v-for="row in data">
                        <td class="table__item" v-for="item in fields" :data-key="item.key" :class="[item.fixed ? 'table__item_fixed' : '', !item.enabled ? 'table__item_hidden' : '']" :style="`--colorItem: ${item.color};`">
                            <AppCheckbox 
                                v-if="item.type == 'checkbox'"
                                :item="{
                                    key: item.key,
                                    type: item.type,
                                    id: row.id.value,
                                    title: item.title,
                                    substring: item.unit,
                                    value: row[item.key],
                                    is_link: item.is_link,
                                    is_plural: item.is_plural,
                                    hiddenOptions: item.choosed,
                                    related_table: item.related_table,
                                    is_external_link: item.is_external_link,
                                    options: ['status', 'relation'].includes(item.type) ? item.options : null,
                                    external_link: row[item.key] != undefined ? row[item.key].external_link : null,
                                }"
                                :isCanCreate="true"
                                :isUseEnter="false"
                                :enabledAutocomplete="false"
                                :isReadOnly="Boolean(item.read_only || row.state == null)"
                                :isCanAdd="Boolean(item.is_plural)"
                            />
                            <AppRelation 
                                v-else-if="item.type == 'relation'"
                                :item="{
                                    key: item.key,
                                    type: item.type,
                                    id: row.id.value,
                                    title: item.title,
                                    substring: item.unit,
                                    value: row[item.key],
                                    is_link: item.is_link,
                                    is_plural: item.is_plural,
                                    hiddenOptions: item.choosed,
                                    related_table: item.related_table,
                                    is_external_link: item.is_external_link,
                                    options: ['status', 'relation'].includes(item.type) ? item.options : null,
                                    external_link: row[item.key] != undefined ? row[item.key].external_link : null,
                                }"
                                :isCanCreate="true"
                                :isUseEnter="false"
                                :enabledAutocomplete="false"
                                :isReadOnly="Boolean(item.read_only || row.state == null)"
                                :isCanAdd="Boolean(item.is_plural)"
                            />
                            <AppTextarea 
                                v-else-if="['number', 'password', 'text'].includes(item.type)"
                                :item="{
                                    key: item.key,
                                    type: item.type,
                                    id: row.id.value,
                                    title: item.title,
                                    substring: item.unit,
                                    value: [null, undefined].includes(row[item.key]) ? null : String(row[item.key]),
                                    is_link: item.is_link,
                                    is_plural: item.is_plural,
                                    hiddenOptions: item.choosed,
                                    related_table: item.related_table,
                                    is_external_link: item.is_external_link,
                                    options: ['status', 'relation'].includes(item.type) ? item.options : null,
                                    external_link: row[item.key] != undefined ? row[item.key].external_link : null,
                                }"
                                :isCanCreate="true"
                                :isUseEnter="false"
                                :enabledAutocomplete="false"
                                :isReadOnly="Boolean(item.read_only || row.state == null)"
                                :isCanAdd="Boolean(item.is_plural)"
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="table-template__footer">

        </div>
    </AppSection>
</template>

<script setup>
    import './AppTable.scss';
    
    import { ref, onMounted, provide } from 'vue'

    import TableTop from './Top/Top.vue'
    import TableHeader from './Header/Header.vue'
    import AppSection from '@/components/AppSection/AppSection.vue';
    import AppCheckbox from "@/components/AppInputs/Checkbox/Checkbox.vue"
    import AppRelation from "@/components/AppSelects/Relation/Relation.vue"
    import AppTextarea from "@/components/AppInputs/Textarea/Textarea.vue"
    
    let fields = ref([])
    let data = ref([])
    const tableRef = ref(null)
    let selectAll = ref(false)
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
        }
    })

    provide('menu', menu)
    provide('fields', fields)
    provide('sortItem', sortItem)
    provide('tableRef', tableRef)
    provide('selectAll', selectAll)
    
    onMounted(async () => {
        fields.value = JSON.parse(JSON.stringify(props.tableKeys))
        data.value = JSON.parse(JSON.stringify(props.tableData))
    })

    // Сохранение шапки таблицы
    const saveFields = (data) => {
        console.log('Сохранение шапки таблицы', {
            role: data,
            fields: fields.value
        });
    }
</script>
