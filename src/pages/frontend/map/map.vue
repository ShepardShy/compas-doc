<template>
    <AppComponent
        :title="'Поле адреса'"
        :component="AppMap"
        :codeProps="AddressProps"
        :codeEmits="AddressEmits"
        @changeValue="(data) => changeValue(data)"
    />
</template>

<script setup>
    import './map.scss'

    import AppMap from "@/components/AppInputs/Map/Map.vue";
    import AddressEmits from "@/data/frontend/inputs/address/codeEmits.json";
    import AppComponent from "@/components/AppComponent/AppComponent.vue";

    import AddressProps from "@/data/frontend/inputs/address/codeProps.json";

    // Изменение значений
    const changeValue = (data) => {
        console.log('Изменение значений', data);
    }
</script>
