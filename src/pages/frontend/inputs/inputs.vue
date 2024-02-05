<template>
    <AppComponent
        :title="'Поле файлов'"
        :component="AppFile"
        :codeProps="FileProps"
        :codeEmits="FileEmits"
        @changeValue="(data) => changeValueFile(data)"
    />

    <AppComponent
        :title="'Стандартный инпут'"
        :component="AppInput"
        :codeProps="InputProps"
        :codeEmits="InputEmits"
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
<<<<<<< HEAD:src/pages/inputs/inputs.vue
    import InputProps from '@/data/inputs/input/codeProps.json';
    import InputEmits from '@/data/inputs/input/codeEmits.json';
=======
    import InputProps from '@/data/frontend/inputs/input/codeProps.json';
    import inputEmits from '@/data/frontend/inputs/input/codeEmits.json';
>>>>>>> main:src/pages/frontend/inputs/inputs.vue

    import AppCheckbox from '@/components/AppInputs/Checkbox/Checkbox.vue';
    import checkboxProps from '@/data/frontend/inputs/checkbox/codeProps.json';
    import checkboxEmits from '@/data/frontend/inputs/checkbox/codeEmits.json';

    import AppTextarea from '@/components/AppInputs/Textarea/Textarea.vue';
    import textareaProps from '@/data/frontend/inputs/textarea/codeProps.json';
    import textareaEmits from '@/data/frontend/inputs/textarea/codeEmits.json';

    import AppFile from "@/components/AppInputs/File/File.vue";
    import FileProps from "@/data/inputs/file/codeProps.json";
    import FileEmits from "@/data/inputs/file/codeEmits.json";

    // import AppDateInput from '@/components/AppInputs/Date/AppDateInput/AppDateInput.vue';

    // Локальный вывод данных в консоль
    const changeValue = (data) => {
        InputProps.item.default.value = data.value
        console.log('data', data)
    }

    // Локальный вывод данных в консоль
    const changeValueFile = (data) => {
        // FileProps.isReadOnly = false
        console.log('data', data)
    }

</script>
