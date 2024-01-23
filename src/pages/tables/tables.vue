<template>
    <AppTable 
        :tableKeys="tablesProps.tableKeys.default"
        :tableData="tablesProps.tableData.default"
        :tableFooter="tablesProps.tableFooter.default"
        :loaderState="null"
        @callAction="(data) => callAction(data)"
    />
</template>

<script setup>
    import './tables.scss';
    
    import AppTable from '@/components/AppTable/AppTable.vue';
    import AppComponent from '@/components/AppComponent/AppComponent.vue';

    import tablesProps from '@/data/tables/codeProps.json';
    import tablesPropsChip from '@/data/tables/codePropsChip.json';
    import codePropsMedium from '@/data/tables/codePropsMedium.json';
    import tablesPropsExpensive from '@/data/tables/codePropsExpensive.json';

    // Локальный вывод данных в консоль
    const callAction = (data) => {
        console.log(data);
    }
</script>
