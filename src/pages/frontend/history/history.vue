<template>
    <AppComponent 
        :title="null"
        :component="AppHistory"
        :codeProps="codeProps"
        :codeEmits="codeEmits"
        @callAction="(data) => callAction(data)"
    />
</template>

<script setup>
    import './history.scss';

    import AppHistory from '@/components/AppHistory/History.vue';
    import AppComponent from '@/components/AppComponent/AppComponent.vue';
    
    import codeProps from '@/data/frontend/history/codeProps.json';
    import codeEmits from '@/data/frontend/history/codeEmits.js';

    const callAction = async (data) => {
        if (data.action == 'showMore') {
            console.log('Показать еще', data.value)
        }
    }
</script>
