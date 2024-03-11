<template>
    <AppSection class="tile-section">
        <TileHeader 
            @callAction="(data) => callActionSection(data)"
        />

        <TileBody 
            :slug="props.slug"
            @callAction="(data) => callActionFields(data)"
        />

        <TileFooter 
            @callAction="(data) => callActionFields(data)"
        />

        <TileWarning 
            @callAction="(data) => callActionFields(data)"
        />
    </AppSection>
</template>

<script setup>
    import './AppTileSection.scss';

    import { ref, provide, onMounted, watch } from 'vue';

    import AppSection from '@/components/AppSection/AppSection.vue';

    import TileBody from './Body/Body.vue'
    import TileHeader from './Header/Header.vue'
    import TileFooter from './Footer/Footer.vue'
    import TileWarning from './Warning/Warning.vue'

    let section = ref({
        id: 0,
        title: 'Начальное название секции',
        state: false,
        fields: []
    })

    let removingField = ref(null)
    let edittingField = ref(null)

    let hiddenFields = ref([])
    let isShow = ref({
        state: false,
        type: null
    })
   
    const emit = defineEmits([
        'callAction'
    ])

    const props = defineProps({
        section: {
            default: {},
            type: Object
        },
        hiddenFields: {
            default: [],
            type: Array
        },
        slug: {
            default: null,
            type: String
        },
        sections: {
            default: [],
            type: Array
        }
    })

    provide('isShow', isShow)
    provide('section', section)
    provide('hiddenFields', hiddenFields)
    provide('removingField', removingField)
    provide('edittingField', edittingField)
    provide('sections', props.sections)

    // Действие с секцией
    const callActionSection = (data) => {
        // Изменение заголовка
        const changeTitle = (data) => {
            emit('callAction', {
                action: 'changeSectionTitle',
                value: data
            })
        }

        // Удаление секции
        const deleteSection = (data) => {
            emit('callAction', {
                action: 'deleteSection',
                value: data
            })
        }

        // Изменение состояния секции
        const changeState = () => {
            section.value.state = !section.value.state
            
            if (section.value.state) {
                section.value.fields.forEach((field) => {
                    field.isEdit = true
                })
            } else {
                section.value.fields.forEach((field) => {
                    delete field.isEdit
                })
            }

            emit('callAction', {
                action: 'changeState',
                value: section.value.state      
            })
        }

        switch (data.action) {
            // Изменение состояния секции
            case 'changeState':
                changeState()
                break;

            // Изменение заголовка
            case 'changeTitle':
                changeTitle(data.value)
                break;

            // Удаление секции
            case 'delete':
                deleteSection(data.value)
                break;

            default:
                break;
        }
    }

    // Действия с полями
    const callActionFields = (data) => {
        // Получение полей
        const getFields = () => {
            section.value = JSON.parse(JSON.stringify(props.section))
            section.value.state = false
            hiddenFields.value = JSON.parse(JSON.stringify(props.hiddenFields))
        }

        // Изменить видимость поля
        const changeVisibleField = (data) => {
            if (data.state == 'hidden') {
                hiddenFields.value.push(data.field)
                section.value.fields = section.value.fields.filter(field => field.id != data.field.id)
                emit('callAction', {
                    action: 'changeHiddenFields',
                    value: hiddenFields.value
                })
            } else if (data.state == 'visible') {
                section.value.fields.push(data.field)
                hiddenFields.value = hiddenFields.value.filter(field => field.id != data.field.id)
                emit('callAction', {
                    action: 'changeHiddenFields',
                    value: hiddenFields.value
                })
            }
        }

        // Открытие модального окна для создания поля
        const initCreateField = () => {
            edittingField.value = {
                options: [],
                section_id: section.value.id,
                roles_read: [],
                roles_write: [],
                has_roles_read: 0,
                has_roles_write: 0,
                title: null,
                type: 'text',
                visible_always: 1,
                is_plural: 0,
                is_external_link: 0,
                required: 0,
                set_color: 0,
                color: '#000',
                unit: null,
                entity: props.slug
            }

            isShow.value = {
                state: true,
                type: 'create'
            }
        }

        // Создание поля
        const createField = (field) => {
            emit('callAction', {
                action: 'createField',
                value: JSON.parse(JSON.stringify(field))
            })

            field.can_edit = 1
            section.value.fields.push(field)

            isShow.value = {
                state: false,
                type: null
            }
        }

        // Инициализация удаления поля
        const initDelete = () => {
            removingField.value = data.value
            isShow.value = {
                state: true,
                type: 'delete'
            }
        }

        //Удаление поля
        const removeField = () => {
            isShow.value = {
                state: false,
                type: null
            }

            section.value.fields = section.value.fields.filter(field => field.id != removingField.value.id)

            emit('callAction', {
                action: 'removeField',
                value: removingField.value.id
            })

            removingField.value = null
        }
        
        // Перемещение полей между секциями
        const changeOrder = (value) => {
            emit('callAction', {
                action: 'changeOrder',
                value: value
            })
        }

        // Настройки поля
        const editSettingsField = (field) => {
            isShow.value = {
                state: true,
                type: 'settings'
            }
            edittingField.value = JSON.parse(JSON.stringify(field))
            edittingField.value.section_id = section.value.id
        }

        // Обновление настроек поля
        const updateSettings = (keys) => {
            let findedField = section.value.fields.find(field => field.id == keys.id)

            for (let key in keys) {
                findedField[key] = keys[key]
            }

            isShow.value = {
                state: false,
                type: null
            }

            emit('callAction', {
                action: 'updateSettings',
                value: keys
            })
        }

        switch (data.action) {
            // Получение полей
            case 'getFields':
                getFields()
                break;

            // Изменить видимость поля
            case 'changeVisibleField':
                changeVisibleField(data.value)
                break;

            // Открытие модального окна  для создания поля
            case 'initCreateField':
                initCreateField()
                break;

            // Создание поля
            case 'createField':
                createField(data.value)
                break;

            // Перемещение полей между секциями
            case 'changeOrder':
                changeOrder(data.value)
                break;

            // Инициализация удаления поля
            case 'initDelete':
                initDelete(data.value)
                break;

            //Удаление поля
            case 'delete':
                removeField(data.value)
                break;

            // Настройки поля
            case 'editSettings':
                editSettingsField(data.value)
                break;

            // Изменение настроек поля
            case 'updateSettings':
                updateSettings(data.value)
                break;

            default:
                emit('callAction', data)
                break;
        }
    }

    onMounted(() => {
        callActionFields({
            action: 'getFields'
        })
    })

    watch(() => props.hiddenFields, () => {
        hiddenFields.value = JSON.parse(JSON.stringify(props.hiddenFields))
    }, {
        deep: true
    })
</script>
