<template>
    <AppComponent
        :title="'Поле адреса'"
        :component="AppMap"
        :codeProps="localPropsAddress"
        :codeEmits="AddressEmits"
        @changeValue="(data) => changeValue(data)"
    />
</template>

<script setup>
    import './map.scss'

    import AppMap from "@/components/AppInputs/Map/Map.vue";
    import AddressEmits from "@/data/frontend/inputs/address/codeEmits.json";
    import AppComponent from "@/components/AppComponent/AppComponent.vue";

    import {ref} from "vue";

    import AddressProps from "@/data/frontend/inputs/address/codeProps.json";

    const localPropsAddress = ref(null)

    // Изменение значений
    const changeValue = (data) => {
        localPropsAddress.value.item.default.value = data
        console.log('Изменение значений', data);
    }

    // Инициализация пропсов для компонентов
    localPropsAddress.value = JSON.parse(JSON.stringify(AddressProps))
</script>
