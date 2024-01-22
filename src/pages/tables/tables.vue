<template>
    <AppTable 
        :tableKeys="tablesProps.tableKeys.default"
        :tableData="tablesProps.tableData.default"
    />
</template>

<script setup>
    import './tables.scss';
    
    import AppTable from '@/components/AppTable/AppTable.vue';
    import AppComponent from '@/components/AppComponent/AppComponent.vue';

    import tablesProps from '@/data/tables/codeProps.json';
    import tablesPropsExpensive from '@/data/tables/codePropsExpensive.json';
    
    // Локальный вывод данных в консоль
    const changeValue = (data) => {
        console.log(data);
    }
</script>
