<template>
    <AppTable 
        :tableKeys="codePropsMedium.tableKeys.default"
        :tableData="codePropsMedium.tableData.default"
        :tableFooter="codePropsMedium.tableFooter.default"
        :loaderState="null"
        :isTrash="false"
        :slug="'documentation'"
        @callAction="(data) => callAction(data)"
    />
</template>

<script setup>
    import './tables.scss';
    
    import AppTable from '@/components/AppTable/AppTable.vue';
    import AppComponent from '@/components/AppComponent/AppComponent.vue';

    import tablesProps from '@/data/tables/codeProps.json';
    import tablesPropsChip from '@/data/tables/codePropsChip.json';
    import tablesPropsEmpty from '@/data/tables/codePropsEmpty.json';
    import codePropsMedium from '@/data/tables/codePropsMedium.json';
    import tablesPropsExpensive from '@/data/tables/codePropsExpensive.json';

    // Локальный вывод данных в консоль
    const callAction = (data) => {
        console.log(data);
    }
</script>
