<template>
    <AppComponent 
        class="component_menu"
        :component="AppMenu"
        :codeProps="menuProps"
        :codeEmits="menuEmits"
        @callAction="(data) => callAction(data)"
    />
</template>

<script setup>
    import './menu.scss';

    import AppMenu from '@/components/AppMenu/AppMenu.vue';
    import AppComponent from '@/components/AppComponent/AppComponent.vue';
    
    import menuProps from '@/data/frontend/menu/codeProps.json';
    import menuEmits from '@/data/frontend/menu/codeEmits.json';

    // Вызов действия
    const callAction = (data) => {
        console.log('Вызов действия', data);
    }
</script>
