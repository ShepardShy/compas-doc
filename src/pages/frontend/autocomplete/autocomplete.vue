<template>
<!--    <AppComponent-->
<!--        :title="'Стандартный автокомплит'"-->
<!--        :component="AppAutocomplete"-->
<!--        :codeProps="localProps"-->
<!--        :codeEmits="AutocompleteEmits"-->
<!--        @changeValue="(data) => changeValue(data)"-->
<!--        @createOption="(data) => createOption(data)"-->
<!--        @searchOptions="(data) => searchOptions(data)"-->
<!--    />-->

    <AppComponent
        :title="'Поле адреса'"
        :component="Address"
        :codeProps="localPropsAddress"
        :codeEmits="AddressEmits"
        @searchOptions="(data) => searchOptionsAddress(data)"
        @changeValue="(data) => changeValueAddress(data)"
    />

</template>

<script setup>
    import './autocomplete.scss';
    
    import { ref, onMounted } from 'vue'

    import AppComponent from '@/components/AppComponent/AppComponent.vue';

    import AppAutocomplete from '@/components/AppAutocomplete/Input/Input.vue';
    import AutocompleteProps from '@/data/frontend/autocomplete/input/codeProps.json';
    import AutocompleteEmits from '@/data/frontend/autocomplete/input/codeEmits.json';

    import Address from "@/components/AppInputs/Address/Address.vue";
    import AddressProps from '@/data/frontend/inputs/address/codeProps.json';
    import AddressEmits from '@/data/frontend/inputs/address/codeEmits.json';

    const backupOptions = AutocompleteProps.item.default.options
    let localProps = ref(null)
    let localPropsAddress = ref(null)

    // Изменение значений
    const changeValue = (data) => {
        console.log('Изменение значений', data);
    }

    const changeValueAddress = (data) => {
        console.log('Изменение значений', data);
        localPropsAddress.value.item.default.value = data.value
    }

    // Поиск опций
    const searchOptions = (data) => {

        /* Удалить код и вставить свой метод на поиск опций */

        let findedOptions = backupOptions.filter(option => option.label.text.toLowerCase().includes(data.value.toLowerCase())) 
        localProps.value.item.default.options = findedOptions
        console.log('Поиск опций', findedOptions);
    }

    const searchOptionsAddress = (data) => {

        /* Удалить код и вставить свой метод на поиск опций */

        // let findedOptions = backupOptions.filter(option => option.label.text.toLowerCase().includes(data.value.toLowerCase()))
        // localProps.value.item.default.options = findedOptions
        console.log('searchOptionsAddress');
    }

    // Создание опции
    const createOption = (data) => {
        console.log('Создание опции', data);
    }

    // Инициализация пропсов для компонентов
    localProps.value = JSON.parse(JSON.stringify(AutocompleteProps))
    localPropsAddress.value = JSON.parse(JSON.stringify(AddressProps))
</script>
