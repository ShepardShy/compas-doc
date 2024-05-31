<template>
    <AppComponent
        :title="'Стандартный автокомплит'"
        :component="AppAutocomplete"
        :codeProps="localProps"
        :codeEmits="AutocompleteEmits"
        @changeValue="(data) => changeValue(data)"
        @createOption="(data) => createOption(data)"
        @searchOptions="(data) => searchOptions(data)"
    />

</template>

<script setup>
    import './autocomplete.scss';
    
    import { ref } from 'vue'

    import AppComponent from '@/components/AppComponent/AppComponent.vue';

    import AppAutocomplete from '@/components/AppAutocomplete/Input.vue';
    import AutocompleteProps from '@/data/frontend/autocomplete/input/codeProps.json';
    import AutocompleteEmits from '@/data/frontend/autocomplete/input/codeEmits.json';

    const backupOptions = AutocompleteProps.item.default.options
    const localProps = ref(null)

    // Изменение значений
    const changeValue = (data) => {
        console.log('Изменение значений', data);
    }

    // Поиск опций
    const searchOptions = (data) => {

        /* Удалить код и вставить свой метод на поиск опций */

        let findedOptions = backupOptions.filter(option => option.label.text.toLowerCase().includes(data.value.toLowerCase())) 
        localProps.value.item.default.options = findedOptions
        console.log('Поиск опций', findedOptions);
    }

    // Создание опции
    const createOption = (data) => {
        console.log('Создание опции', data);
    }

    // Инициализация пропсов для компонентов
    localProps.value = JSON.parse(JSON.stringify(AutocompleteProps))
</script>
