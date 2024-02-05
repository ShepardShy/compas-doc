<template>
    <AppComponent 
        v-if="localProps != null"
        :title="'Стандартный автокомплит'"
        :component="AppAutocomplete"
        :codeProps="localProps"
        :codeEmits="inputEmits"
        @changeValue="(data) => changeValue(data)"
        @createOption="(data) => createOption(data)"
        @searchOptions="(data) => searchOptions(data)"
    />
</template>

<script setup>
    import './autocomplete.scss';
    
    import { ref, onMounted } from 'vue'

    import AppComponent from '@/components/AppComponent/AppComponent.vue';

    import AppAutocomplete from '@/components/AppAutocomplete/Input/Input.vue';
    import InputProps from '@/data/frontend/autocomplete/input/codeProps.json';
    import inputEmits from '@/data/frontend/autocomplete/input/codeEmits.json';

    const backupOptions = InputProps.item.default.options
    let localProps = ref(null)

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

    onMounted(() => {
        localProps.value = JSON.parse(JSON.stringify(InputProps))
    })
</script>
