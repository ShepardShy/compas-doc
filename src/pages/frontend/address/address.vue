<template>
    <AppComponent
        :title="'Поле адреса'"
        :component="AppAddress"
        :codeProps="localPropsAddress"
        :codeEmits="AddressEmits"
        @searchOptions="(data) => searchOptions(data)"
        @changeValue="(data) => changeValue(data)"
        @selectPoints="(data) => selectPoints(data)"
    />
</template>

<script setup>
    import './address.scss'

    import AppAddress from "@/components/AppInputs/Address/Address.vue";
    import AddressEmits from "@/data/frontend/inputs/address/codeEmits.json";
    import AppComponent from "@/components/AppComponent/AppComponent.vue";

    import {ref} from "vue";

    import AddressProps from "@/data/frontend/inputs/address/codeProps.json";

    const localPropsAddress = ref(null)

    // Поиск опций
    const searchOptions = (data) => {

        /* Вставить свой метод на поиск опций */

        console.log('Поиск опций', data);
    }

    // Изменение значений
    const changeValue = (data) => {
        localPropsAddress.value.item.default.value = data.value
        console.log('Изменение значений', data);
    }

    // Получение точек попадающих в лассо
    const selectPoints = (data) => {
        console.log('Выбранные точки', data);
    }

    // Инициализация пропсов для компонентов
    localPropsAddress.value = JSON.parse(JSON.stringify(AddressProps))
</script>
