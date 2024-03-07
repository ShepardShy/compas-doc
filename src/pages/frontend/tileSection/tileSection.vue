<template>
    <AppTileSection 
        :section="TileSectionProps.sections.default[0]"
        :sections="sections"
        :hiddenFields="hiddenFields"
        :slug="'logistic_tasks'"
        @callAction="(data) => callAction(data)"
    />

    <AppTileSection 
        :section="TileSectionProps.sections.default[1]"
        :sections="sections"
        :hiddenFields="hiddenFields"
        :slug="'logistic_tasks'"
        @callAction="(data) => callAction(data)"
    />
</template>

<script setup>
    import './tileSection.scss';
    
    import { ref } from 'vue'

    import AppTileSection from '@/components/AppTileSection/AppTileSection.vue';

    import TileSectionProps from "@/data/frontend/tileSection/codeProps.json";
    // import TileSectionEmits from "@/data/frontend/tileSection/codeEmits.json";

    let hiddenFields = ref([])

    const sections = ref([
        {
            id: TileSectionProps.sections.default[0].id,
            label: TileSectionProps.sections.default[0].title,
            value: TileSectionProps.sections.default[0].id
        },
        {
            id: TileSectionProps.sections.default[1].id,
            label: TileSectionProps.sections.default[1].title,
            value: TileSectionProps.sections.default[1].id
        }
    ])

    const callAction = (data) => {
        // Изменение скрытых полей
        const changeHiddenFields = (value) => {
            hiddenFields.value = value
            console.log('Скрытие/Показ поля', value);
        }

        // Обновление настроек поля
        const updateSettings = (keys) => {
            console.log('Изменение настроек поля', keys);
        }

        // Создание поля
        const createField = async (data) => {
            console.log('Создание поля', data);
        }

        // Удаление секции
        const deleteSection = (data) => {
            let findedSection = TileSectionProps.sections.default[data]            
            hiddenFields.value = JSON.parse(JSON.stringify(findedSection.fields))
            TileSectionProps.sections.default = TileSectionProps.sections.default.filter(section => section.id !== data)
            console.log('Удаление секции', data);
        }

        // Удаление поля
        const removeField = (id) => {
            console.log('Удаление поля', id);
        }

        // Перемещение секции
        const moveSection = (data) => {
            console.log('Перемещение секции', data);
        }

        // Перемещение поля
        const changeOrderField = (data) => {
            console.log('Перемещение поля', data);
        }

        // Изменение заголовка секции
        const changeSectionTitle = (data) => {
            console.log('Изменение заголовка секции', data);
        }

        switch (data.action) {
            // Изменение скрытых полей
            case 'changeHiddenFields':
                changeHiddenFields(data.value)
                break;

            // Изменение настроек поля
            case 'updateSettings':
                updateSettings(data.value)
                break;

            // Удаление секции
            case 'deleteSection':
                deleteSection(data.value)
                break;
                
            // Удаление поля
            case 'removeField':
                removeField(data.value)
                break;

            // Перемещение секции
            case 'moveSection':
                moveSection(data.value)
                break;

            // Перемещение поля
            case 'changeOrder':
                changeOrderField(data.value)
                break;

            // Изменение заголовка поля
            case 'changeSectionTitle':
                changeSectionTitle(data.value)
                break;

            // Создание поля
            case 'createField':
                createField(data.value)
                break;

            default:
                break;
        }
        console.log('callAction', data);
    }
</script>
