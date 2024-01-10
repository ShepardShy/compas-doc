<template>
    <AppComponent 
        :title="'Статус'"
        :component="AppStatus"
        :codeProps="StatusProps"
        :codeEmits="StatusEmits"
        @changeValue="(data) => changeValue(data)"
    /> 
</template>

<script setup>
    import './selects.scss';
    
    import AppComponent from '@/components/AppComponent/AppComponent.vue';

    import AppStatus from '@/components/AppSelects/Status/Status.vue';
    import StatusProps from '@/data/selects/status/codeProps.json';
    import StatusEmits from '@/data/selects/status/codeEmits.json';

    const changeValue = (data) => {
        console.log(data);
    }
</script>
