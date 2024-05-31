<template>

    <AppComponent 
        :title="'Дата'"
        :component="AppDate"
        :codeProps="DateProps"
        :codeEmits="DateEmits"
        @changeValue="(data) => changeValue(data)"
    />
    <!-- <AppComponent
        :title="'Стандартный инпут'"
        :component="AppInput"
        :codeProps="InputProps"
        :codeEmits="InputEmits"
        @changeValue="(data) => changeValue(data)"
    /> -->

    <!-- <AppComponent 
        :title="'Чекбокс'"
        :component="AppCheckbox"
        :codeProps="checkboxProps"
        :codeEmits="checkboxEmits"
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
        :title="'Поле файлов'"
        :component="AppFile"
        :codeProps="FileProps"
        :codeEmits="FileEmits"
        @changeValue="(data) => changeValue(data)"
    />

    <AppComponent
        :title="'Сгрупированный инпут'"
        :component="InputGroup"
        :codeProps="inputGroupProps"
        :codeEmits="inputGroupEmits"
        @changeValue="(data) => changeValue(data)"
    /> -->
</template>

<script setup>
    import './inputs.scss';
    
    import AppComponent from '@/components/AppComponent/AppComponent.vue';

    import AppInput from '@/components/AppInputs/Input/Input.vue';
    import InputProps from '@/data/frontend/inputs/input/codeProps.json';
    import InputEmits from '@/data/frontend/inputs/input/codeEmits.json';

    import AppCheckbox from '@/components/AppInputs/Checkbox/Checkbox.vue';
    import checkboxProps from '@/data/frontend/inputs/checkbox/codeProps.json';
    import checkboxEmits from '@/data/frontend/inputs/checkbox/codeEmits.json';

    import AppTextarea from '@/components/AppInputs/Textarea/Textarea.vue';
    import textareaProps from '@/data/frontend/inputs/textarea/codeProps.json';
    import textareaEmits from '@/data/frontend/inputs/textarea/codeEmits.json';

    import AppFile from "@/components/AppInputs/File/File.vue";
    import FileProps from "@/data/frontend/inputs/file/codeProps.json";
    import FileEmits from "@/data/frontend/inputs/file/codeEmits.json";

    import AppDate from '@/components/AppInputs/Date/Date.vue';
    import DateProps from "@/data/frontend/inputs/date/codeProps.json";
    import DateEmits from "@/data/frontend/inputs/date/codeEmits.json";

    import InputGroup from '@/components/AppInputs/InputGroup/InputGroup.vue';
    import inputGroupProps from "@/data/frontend/inputs/inputGroup/codeProps.json";
    import inputGroupEmits from "@/data/frontend/inputs/inputGroup/codeEmits.json";

    // Локальный вывод данных в консоль
    const changeValue = (data) => {
        console.log('data', data)
    }
</script>
