<template>
    <div class="table-container" :class="props.isHaveCategories ? 'table-container_categories' : ''">
        <TableCategory 
            v-if="props.isHaveCategories"
            @callAction="(data) => callAction(data)"
        />

        <AppSection 
            ref="sectionRef" 
            class="section__table table-template" 
            :style="`--stickyTop: ${scrollPosition}px`" 
            :class="props.table.loaderState == 'loading' ? 'table-template_loading' : props.table.loaderState == 'filtering' ? 'table-template_filtering' : ''"
        >
            <TableTop 
                :tableTitle="props.table.title"
                @callAction="(data) => callAction(data)"
            />
    
            <TableSocket 
                v-show="socketRows.header.length > 0 || socketRows.body.length > 0"
                :socketRows="socketRows"
                @callAction="(data) => callAction(data)"
            />

            <TableMobile 
                v-if="isMobile"
                :slug="props.slug"
                :isTrash="props.isTrash"
                @callAction="(data) => callAction(data)"
            />
            
            <div v-else class="table-template__body section__scroll-area" :class="[fields.length == 0 || bodyData.length == 0 ? 'table-template__body_empty' : '', props.isDinamyc ? 'table-template__body_dinamyc' : '']">
                <table class="table" ref="tableRef" :class="[props.isPermanentEdit ? 'table_permanent-edit' : '']">
                    <TableHeader
                        v-if="props.table.loaderState != 'loading'"
                        :isTrash="props.isTrash"
                        @callAction="(data) => callAction(data)"
                    />
                    <TableBody 
                        :actionType="props.actionType"
                        :slug="props.slug"
                        :isTrash="props.isTrash"
                        :isPermanentEdit="props.isPermanentEdit"
                        @callAction="(data) => callAction(data)"
                    />
                </table>
                <ScrollButtons />

                <TableTotal v-if="props.isDinamyc"/>
            </div>

            <TableFooter 
                @callAction="(data) => callAction(data)"
            />

            <SectionActions 
                :actionState="actionState"
                @callAction="(data) => callAction(data)"
            />

            <TableWarning 
                @callAction="(data) => callAction(data)"
            />
        </AppSection>
    </div>
</template>

<script setup>
    import './AppTable.scss';
    
    import { ref, onMounted, provide, watch, toRaw } from 'vue'

    import _ from 'lodash'
    import TableTop from './Top/Top.vue'
    import TableBody from './Body/Body.vue'
    import ValidateField from './Validate.js'
    import TableTotal from './Total/Total.vue'
    import TableHeader from './Header/Header.vue'
    import TableFooter from './Footer/Footer.vue'
    import TableSocket from './Socket/Socket.vue'
    import TableMobile from './Mobile/Mobile.vue'
    import TableWarning from './Warning/Warning.vue';
    import TableCategory from './Categories/Categories.vue'
    import ScrollButtons from './ScrollButtons/ScrollButtons.vue';
    import AppSection from '@/components/AppSection/AppSection.vue';
    import SectionActions from '@/components/AppSection/Actions/Actions.vue';

    let fields = ref([])
    let bodyData = ref([])
    let footerData = ref({})
    let actionState = ref(null)
    let backupValues = ref([])
    let socketRows = ref({
        header: [],
        body: []
    })

    const tableRef = ref(null)
    const sectionRef = ref(null)

    let isMobile = ref(false)
    let updatedRows = ref([])
    let invalidRows = ref([])
    let selectAll = ref(false)
    let scrollPosition = ref(300)
    let sortItem = ref({
        key: 'id',
        order: 'asc'
    }) 

    let isShow = ref({
        state: false,
        type: null
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
            options: [],
        },
        activeTab: null
    })

    let skipChecking = ref(false)
    let updatedCategory = ref(null)
    let categories = ref([])

    const props = defineProps({
        table: {
            default: {
                tableKeys: [],
                tableData: [],
                tableFooter: {
                    pages: 0,
                    activePage: 0,
                    count: 25
                },
                loaderState: null,
                title: null
            },
            type: Object
        },
        isTrash: {
            default: false,
            type: Boolean
        },
        isPermanentEdit: {
            default: false,
            type: Boolean
        },
        isDinamyc: {
            default: false,
            type: Boolean
        },
        isNumeric: {
            default: false,
            type: Boolean
        },
        slug: {
            default: 'undefined',
            type: String
        },
        actionType: {
            default: 'view',
            type: String
        },
        isHaveCategories: {
            default: false,
            type: Boolean
        },
        categories: {
            default: [],
            type: Array
        }
    })

    const emit = defineEmits([
        'callAction'
    ])

    provide('menu', menu)
    provide('fields', fields)
    provide('isShow', isShow)
    provide('isShow', isShow)
    provide('sortItem', sortItem)
    provide('tableRef', tableRef)
    provide('bodyData', bodyData)
    provide('selectAll', selectAll)
    provide('sectionRef', sectionRef)
    provide('footerData', footerData)
    provide('categories', categories)
    provide('actionState', actionState)
    provide('isNumeric', props.isNumeric)
    provide('isDinamyc', props.isDinamyc)
    provide('invalidRows', invalidRows)
    provide('backupValues', backupValues)
    provide('skipChecking', skipChecking)
    provide('scrollPosition', scrollPosition)
    provide('updatedCategory', updatedCategory)
    
    onMounted(async () => {
        isMobile.value = window.innerWidth <= 660
        window.addEventListener('resize', checkingWindowWidth);
        sortItem.value = JSON.parse(JSON.stringify(props.table.sortItem))
        footerData.value = JSON.parse(JSON.stringify(props.table.tableFooter))
        fields.value = callAction({action: 'setPropsValues', value: props.table.tableKeys})
        bodyData.value = callAction({action: 'setPropsValues', value: props.table.tableData})
        socketRows.value = JSON.parse(JSON.stringify(props.table.socketRows))
        categories.value = JSON.parse(JSON.stringify(props.categories))
        if (props.isPermanentEdit) {
            bodyData.value.forEach(row => {
                backupValues.value.push(JSON.parse(JSON.stringify(row)))
                row.isEdit = true
                row.isChoose = true
            });
        }
    })

    // Проверка был ли уменьшен размер окна
    const checkingWindowWidth = _.throttle(() => {
        isMobile.value = window.innerWidth <= 660
    }, 100)

    // Вызов действия в таблице
    const callAction = (data) => {
        // Установка значений по умолчанию
        const setPropsValues = (data) => {
            if ([null, undefined].includes(data) || !Array.isArray(data)) {
                return []
            } else {
                return JSON.parse(JSON.stringify(data.filter(p => ![null, undefined].includes(p) && typeof p == 'object' && !Array.isArray(p))))
            }
        }

        // Редактирование строк
        const editRows = () => {
            actionState.value = 'saving'

            bodyData.value.forEach(row => {
                if (row.isChoose) {
                    backupValues.value.push(JSON.parse(JSON.stringify(row)))
                    row.isEdit = true
                }
            });
        }

        // Отмена редактирования полей
        const cancelRows = () => {
            let findedIndex = null
            for (let row of backupValues.value) {
                row.isChoose = false
                findedIndex = bodyData.value.findIndex(p => p.id == row.id)
                bodyData.value[findedIndex] = row
            }

            for (let row of bodyData.value) {
                row.isChoose = false
            }

            if (!props.isPermanentEdit) {
                backupValues.value = []
            } else {
                backupValues.value = JSON.parse(JSON.stringify(bodyData.value))
            }

            invalidRows.value = []
            actionState.value = null
            selectAll.value = false
        }

        // Сохранение редактируемых полей
        const saveRows = () => {
            // Получение обновленных ключей
            const getUpdatedFields = (row, backupRow) => {
                let flag = false
                let updatedRow = {
                    id: row.id
                }

                for (let key in row) {
                    if (!['isEdit', 'isChoose'].includes(key) && !_.isEqual(row[key], backupRow[key])) {
                        flag = true
                        updatedRow[key] = row[key]
                    }
                }

                return flag == false ? null : JSON.parse(JSON.stringify(updatedRow))
            }

            // Валидация полей
            const validateFields = (row) => {
                let flag = false
                let error = null
                let fieldError = {}

                for (let field of fields.value) {
                    error = ValidateField(field, row[field.key])
                    
                    if (error.state) {
                        flag = true
                        fieldError.id = row.id
                        fieldError[field.key] = {
                            value: row[field.key],
                            error: error.text
                        }
                    }
                }

                if (flag) {
                    return fieldError
                } else {
                    return false
                }
            }

            // Проверка строк на валидацию
            const checkingRows = () => {
                for (let backupRow of backupValues.value) {
                findedIndex = bodyData.value.findIndex(p => p.id == backupRow.id)

                let error = validateFields(bodyData.value[findedIndex])

                if (!error) {
                    updatedRows.value.push(getUpdatedFields(bodyData.value[findedIndex], backupRow))
                } else {
                    invalidFlag = true
                    invalidRows.value.push(error)
                }
            }
            }

            // Инициализация сохранения строк
            const initSave = () => {
                // Установка значения по умолчанию
                const transformUpdatedRows = (row) => {
                    for (let key in row) {
                        let findedField = fields.value.find(p => p.key == key)
                        if (findedField != undefined) {
                            if (findedField.type == 'relation') {
                                let findedIndex = bodyData.value.findIndex(p => p.id == row.id)
                                let transformedItem = [null, undefined].includes(row[key]) ? null : row[key].value.filter(p => p != null)
                                bodyData.value[findedIndex][key].value = toRaw(transformedItem)
                                console.log(transformedItem);
                                row[key] = toRaw(transformedItem)
                            } else if (findedField.type == 'select_dropdown') {
                                row[key] = Array.isArray(row[key]) || [null, undefined].includes(row[key]) ? row[key] : [row[key]]
                            }
                        }
                    }
                }

                if (invalidFlag) {
                    isShow.value = {
                        state: true,
                        type: 'validation'
                    }
                } else {
                    actionState.value = null
                    selectAll.value = false
                    updatedRows.value = updatedRows.value.filter(p => p != null)

                    for (let row of updatedRows.value) {
                        transformUpdatedRows(row)
                    }

                    if (!props.isPermanentEdit) {
                        for (let row of bodyData.value) {
                            delete row.isEdit
                            row.isChoose = false
                        }
                        backupValues.value = []
                    } else {
                        backupValues.value = JSON.parse(JSON.stringify(bodyData.value))
                    }

                    if (updatedRows.value.length == 0) {
                        return
                    } else {
                        emit('callAction', {
                            action: 'save',
                            value: updatedRows.value
                        })
                    }
                }
            }

            let findedIndex = null
            let invalidFlag = false 
            invalidRows.value = []
            isShow.value = {
                state: false,
                type: null
            }

            if (!skipChecking.value) {
                updatedRows.value = []
                checkingRows()
            } else {
                updatedRows.value = JSON.parse(JSON.stringify(bodyData.value))
            }

            initSave()
            skipChecking.value = false
        }

        // Инициализация удаления строк таблицы
        const initDeleteRows = (value) => {
            if (typeof value == 'object') {
                let findedIndex = bodyData.value.findIndex(row => row.id == value.id)
                bodyData.value[findedIndex].isChoose = true
            }

            isShow.value = {
                state: true,
                type: 'delete'
            }
        }

        // Удаление строк
        const deleteRows = (type = 'delete') => {
            let data = []

            for (let row of bodyData.value) {
                if (row.isChoose) {
                    data.push(row.id)
                    bodyData.value = bodyData.value.filter(p => p.id != row.id)
                }
            }

            selectAll.value = false
            isShow.value = {
                state: false,
                type: null
            }
            actionState.value = null

            emit('callAction', {action: props.actionType == 'module' ? 'untie' : type, value: data})
        }

        // Инициализация восстановления строк 
        const initRestoreRows = (value) => {
            if (typeof value == 'object') {
                let findedIndex = bodyData.value.findIndex(row => row.id == value.id)
                bodyData.value[findedIndex].isChoose = true
            }

            isShow.value = {
                state: true,
                type: 'restore'
            }
        }

        // Обновление таблицы с помощью сокетов
        const socketUpdate = () => {
            // Обновление тела таблицы
            const updateBody = () => {
                // Обновление значения поля
                const updateFieldValue = (row, updatedRow) => {
                    for (let key in updatedRow) {
                        let findedField = fields.value.find(column => column.key == key)

                        if (findedField.type == 'relation') {
                            row[key].value = updatedRow[key]
                        } else {
                            row[key] = updatedRow[key]
                        }
                    }
                }

                // Установка статуса, что строка была обновлена
                const setUpdatedStatus = (id) => {
                    let findedIndex = bodyData.value.findIndex(row => row.id == id)
                    bodyData.value[findedIndex].isUpdated = true

                    setTimeout(() => {
                        let findedIndex = bodyData.value.findIndex(row => row.id == id)
                        delete bodyData.value[findedIndex].isUpdated
                    }, 3000);
                }

                for (let socketRow of socketRows.value.body) {
                    if (socketRow.isNew) {
                        bodyData.value.unshift(socketRow)
                        setUpdatedStatus(socketRow.id)
                    } else if (socketRow.isDeleted) {
                        bodyData.value = bodyData.value.filter(row => row.id != socketRow.id)
                    } else {
                        let findedIndex = bodyData.value.findIndex(row => row.id == socketRow.id)
                        updateFieldValue(bodyData.value[findedIndex], socketRow)
                        setUpdatedStatus(socketRow.id)
                    }
                    socketRows.value.body = socketRows.value.body.filter(row => row.id != socketRow.id)
                }
            }

            // Обновление шапки таблицы
            const updateHeader = () => {
                // Обновление значения поля
                const updateFieldValue = (column, updatedColumn) => {
                    for (let key in updatedColumn) {
                        column[key] = updatedColumn[key]
                    }
                }

                // Установка статуса, что строка была обновлена
                const setUpdatedStatus = (id) => {
                    let findedIndex = fields.value.findIndex(column => column.id == id)
                    fields.value[findedIndex].isUpdated = true

                    setTimeout(() => {
                        let findedIndex = fields.value.findIndex(column => column.id == id)
                        delete fields.value[findedIndex].isUpdated
                    }, 3000);
                }

                for (let socketColumn of socketRows.value.header) {
                    let findedIndex = fields.value.findIndex(column => column.id == socketColumn.id)

                    if (socketColumn.isNew) {
                            fields.value.unshift(socketColumn)
                    } else if (socketColumn.isDeleted) {
                            fields.value = fields.value.filter(column => column.id != socketColumn.id)
                    } else {
                        updateFieldValue(fields.value[findedIndex], socketColumn)
                        setUpdatedStatus(socketColumn.id)
                    }
                    socketRows.value.header = socketRows.value.header.filter(column => column.id != socketColumn.id)
                } 
            }

            updateBody()
            updateHeader()
            emit('callAction', {action: 'clearSocket', value: null})
        }

        // Получить данные таблицы
        const getTableData = () => {
            emit('callAction', {action: 'getTableData', value: {
                sortItem: sortItem.value,
                footerData: footerData.value
            }})
        }

        // Перемещение строк
        const moveRows = (data) => {
            actionState.value = 'saving'
            skipChecking.value = true
            updatedRows.value =  JSON.parse(JSON.stringify(data))
            bodyData.value = JSON.parse(JSON.stringify(data))
        }
        
        // Удаление строки по иконке
        const removeRow = (id) => {
            actionState.value = 'saving'
            skipChecking.value = true
            bodyData.value = bodyData.value.filter(row => row.id != id)
            updatedRows.value = JSON.parse(JSON.stringify(bodyData.value))
        }

        // Начало редактирования категории
        const initUpdateCategory = (data) => {
            isShow.value = {
                state: true,
                type: 'updateCategory'
            }
            updatedCategory.value = data
        }

        // Начало создания категории
        const initCreateCategory = () => {
            isShow.value = {
                state: true,
                type: 'createCategory'
            }
        }

        // Начало создания подкатегории
        const initCreateSubCategory = (data) => {
            isShow.value = {
                state: true,
                type: 'createSubCategory'
            }
            updatedCategory.value = data
        }

        // Начало удаления категории
        const initDeleteCategory = (data) => {
            isShow.value = {
                state: true,
                type: 'deleteCategory'
            }
            updatedCategory.value = data
        }

        // Удаление категории
        const deleteCategory = (data) => {
            isShow.value = {
                state: false,
                type: null
            }

            emit('callAction', {action: 'deleteCategory', value: data})
        }

        switch (data.action) {
            // Установка значений по умолчанию
            case 'setPropsValues':
                return setPropsValues(data.value)

            // Редактирование полей
            case 'edit':
                editRows()
                break;
        
            // Отмена редактирования полей
            case 'cancel':
                cancelRows()
                break;

            // Сохранение строк таблицы
            case 'save':
                saveRows()
                break;

            // Инициализация удаления строк таблицы
            case 'initDelete':
                initDeleteRows(data.value)
                break;

            // Удаление строк в таблице
            case 'delete':
                deleteRows('delete')
                break;

            // Отвязка строки
            case 'untie':
                deleteRows('untie')
                break;

            // Восстановление строк
            case 'initRestore':
                initRestoreRows(data.value)
                break;

            // Восстановление строк
            case 'restore':
                deleteRows('restore')
                break;

            // Обновление таблицы с помощью сокетов
            case 'socketUpdate':
                socketUpdate()
                break;

            // Получение информации для тела таблицы
            case 'getTableData':
                getTableData()
                break;

            // Перемещение строк
            case 'moveRows':
                moveRows(data.value)
                break;

            // Удаление строки по иконке
            case 'removeRow':
                removeRow(data.value)
                break;

            // Начало редактирования категории
            case 'initUpdateCategory':
                initUpdateCategory(data.value)
                break;

            // Начало создания категории
            case 'initCreateCategory':
                initCreateCategory(data.value)
                break;

            // Начало создания подкатегории
            case 'initCreateSubCategory':
                initCreateSubCategory(data.value)
                break;
            
            // Начало удаления категории
            case 'initDeleteCategory':
                initDeleteCategory(data.value)
                break;

            // Удаление категории
            case 'deleteCategory':
                deleteCategory(data.value)
                break;

            default:
                emit('callAction', data)
                break;
        }
    }

    watch(() => props.table.tableData, () => {
        footerData.value = JSON.parse(JSON.stringify(props.table.tableFooter))
        bodyData.value = callAction({action: 'setPropsValues', value: props.table.tableData})
        if (props.isPermanentEdit) {
            backupValues.value = callAction({action: 'setPropsValues', value: props.table.tableData})
        }
    }, {
        deep: true
    })

    watch(() => props.table.tableKeys, () => {
        fields.value = callAction({action: 'setPropsValues', value: props.table.tableKeys})
    }, {
        deep: true
    })

    watch(() => props.categories, () => {
        categories.value = JSON.parse(JSON.stringify(props.categories))
    }, {
        deep: true
    })

    watch(() => props.table.socketRows, () => {
        socketRows.value = JSON.parse(JSON.stringify(props.table.socketRows))
    }, {
        deep: true
    })

    watch(() => props.table.sortItem, () => {
        sortItem.value = JSON.parse(JSON.stringify(props.table.sortItem))
    })
</script>
