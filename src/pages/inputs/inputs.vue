<template>
    <AppComponent 
        :title="'Стандартный инпут'"
        :component="AppInput"
        :codeProps="InputProps"
        :codeEmits="inputEmits"
        @changeValue="(data) => changeValue(data)"
    />

    <AppComponent 
        :title="'Текстария'"
        :component="AppTextarea"
        :codeProps="textareaProps"
        :codeEmits="textareaEmits"
        @changeValue="(data) => changeValue(data)"
    />

    <AppComponent 
        :title="'Чекбокс'"
        :component="AppCheckbox"
        :codeProps="checkboxProps"
        :codeEmits="checkboxEmits"
    /> 
    <!-- <AppDateInput /> -->
</template>

<script setup>
    import './inputs.scss';
    
    import AppComponent from '@/components/AppComponent/AppComponent.vue';

    import AppInput from '@/components/AppInputs/Input/Input.vue';
    import InputProps from '@/data/inputs/input/codeProps.json';
    import inputEmits from '@/data/inputs/input/codeEmits.json';

    import AppCheckbox from '@/components/AppInputs/Checkbox/Checkbox.vue';
    import checkboxProps from '@/data/inputs/checkbox/codeProps.json';
    import checkboxEmits from '@/data/inputs/checkbox/codeEmits.json';

    import AppTextarea from '@/components/AppInputs/Textarea/Textarea.vue';
    import textareaProps from '@/data/inputs/textarea/codeProps.json';
    import textareaEmits from '@/data/inputs/textarea/codeEmits.json';

    // import AppDateInput from '@/components/AppInputs/Date/AppDateInput/AppDateInput.vue';

    // Локальный вывод данных в консоль
    const changeValue = (data) => {
        InputProps.item.default.value = data.value
    }
</script>
