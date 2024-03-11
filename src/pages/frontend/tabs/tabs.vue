<template>
    <AppComponent 
        :title="'Плашки'"
        :component="AppTabs"
        :codeProps="codeProps"
        :codeEmits="codeEmits"
        @callAction="(data) => callAction(data)"
    />
</template>

<script setup>
    import './tabs.scss';

    import AppTabs from '@/components/AppTabs/Tabs.vue';
    import AppComponent from '@/components/AppComponent/AppComponent.vue';

    import codeProps from "@/data/frontend/tabs/codeProps.json";
    import codeEmits from "@/data/frontend/tabs/codeEmits.js";

    const callAction = (data) => {
        console.log(data);
    }
    
</script>
