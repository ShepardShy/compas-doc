<template>
    <AppComponent 
        :title="'Статус'"
        :component="AppStatus"
        :codeProps="StatusProps"
        :codeEmits="StatusEmits"
        @changeValue="(data) => changeValue(data)"
    />

    <AppComponent 
        :title="'Селект'"
        :component="AppSelect"
        :codeProps="SelectProps"
        :codeEmits="SelectEmits"
        @changeValue="(data) => changeValue(data)"
    /> 

    <AppComponent 
        :title="'Ответственный'"
        :component="AppRelation"
        :codeProps="RelationProps"
        :codeEmits="RelationEmits"
        @showAll="(data) => showAll(data)"
        @openLink="(data) => openLink(data)"
        @changeValue="(data) => changeValue(data)"
        @createOption="(data) => createOption(data)"
    /> 
</template>

<script setup>
    import './selects.scss';
    
    import AppComponent from '@/components/AppComponent/AppComponent.vue';

    import AppRelation from '@/components/AppSelects/Relation/Relation.vue';
    import RelationProps from '@/data/frontend/selects/relation/codeProps.json';
    import RelationEmits from '@/data/frontend/selects/relation/codeEmits.json';

    import AppStatus from '@/components/AppSelects/Status/Status.vue';
    import StatusProps from '@/data/frontend/selects/status/codeProps.json';
    import StatusEmits from '@/data/frontend/selects/status/codeEmits.json';

    import AppSelect from '@/components/AppSelects/Select/Select.vue';
    import SelectProps from '@/data/frontend/selects/select/codeProps.json';
    import SelectEmits from '@/data/frontend/selects/select/codeEmits.json';

    // Изменение значения
    const changeValue = (data) => {
        console.log('Изменение значения', data);
    }

    // Показать все опции
    const showAll = (data) => {
        console.log('Показать все опции', data);
    }

    // Создание опции
    const createOption = (data) => {
        console.log('Создание опции', data);
    } 

    // Открытие ссылки
    const openLink = (data) => {
        console.log('Открытие ссылки', data);
    }
</script>
