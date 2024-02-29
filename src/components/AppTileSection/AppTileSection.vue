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

    </AppSection>
</template>

<script setup>
    import './AppTileSection.scss';

    import { ref, provide, onMounted } from 'vue';

    import AppSection from '@/components/AppSection/AppSection.vue';

    import TileHeader from './Header/Header.vue'
    import TileBody from './Body/Body.vue'
    import TileFooter from './Footer/Footer.vue'

    let section = ref({
        id: 0,
        title: 'Начальное название секции',
        state: false,
        fields: []
    })

    let hiddenFields = ref([])

    provide('section', section)
    provide('hiddenFields', hiddenFields)

    const props = defineProps({
        fields: {
            default: [],
            type: Array
        },
        hiddenFields: {
            default: [],
            type: Array
        },
        slug: {
            default: null,
            type: String
        }
    })


    // Действие с секцией
    const callActionSection = (data) => {
        // Перемещение секции
        const moveSection = (data) => {
            console.log('moveSection', data);
        }

        // Изменение заголовка
        const changeTitle = (data) => {
            console.log('changeTitle', data);
        }

        // Редактирование секции
        const editSection = (data) => {
            console.log('editSection', data);
        }

        // Удаление секции
        const deleteSection = (data) => {
            console.log('deleteSection', data);
        }

        // Изменение состояния секции
        const changeState = () => {
            section.value.state = !section.value.state
        }


        switch (data.action) {
            // Перемещение секции
            case 'move':
                moveSection(data.value)
                break;

            // Изменение состояния секции
            case 'changeState':
                changeState()
                break;

            // Изменение заголовка
            case 'changeTitle':
                changeTitle(data.value)
                break;

            // Редактирование секции
            case 'edit':
                editSection(data.value)
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
            section.value.fields = JSON.parse(JSON.stringify(props.fields))
            hiddenFields.value = JSON.parse(JSON.stringify(props.hiddenFields))
        }

        // Изменить видимость поля
        const changeVisibleField = (data) => {
            console.log('changeVisibleField', data);
        }

        // Создание поля
        const createField = () => {
            console.log('Создание поля');
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

            // Создание поля
            case 'createField':
                createField()
                break;
        
            default:
                break;
        }
    }

    onMounted(() => {
        callActionFields({
            action: 'getFields'
        })
    })

</script>
