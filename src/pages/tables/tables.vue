<template>
    <AppComponent 
        class="component__table"
        :title="'Таблица'"
        :component="AppTable"
        :codeProps="codeProps"
        :codeEmits="codeEmits"
        @callAction="(data) => callAction(data)"
    />
</template>

<script setup>
    import './tables.scss';

    import AppTable from '@/components/AppTable/AppTable.vue';
    import AppComponent from '@/components/AppComponent/AppComponent.vue';

    import codeProps from '@/data/tables/codeProps.json';
    import codeEmits from '@/data/tables/codeEmits.js';

    // Локальный вывод данных в консоль
    const callAction = (data) => {
        console.log(data);
    }
</script>
