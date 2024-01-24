<template>
    <AppComponent
        :title="'Поле файлов'"
        :component="AppInputFile"
        :codeProps="InputProps"
        :codeEmits="inputEmits"
        @changeValue="(data) => changeValue(data)"
    />
</template>

<script setup>
    import './file.scss';

    import InputProps from "@/data/inputs/input/codeProps.json";
    import inputEmits from "@/data/inputs/input/codeEmits.json";

    import AppComponent from "@/components/AppComponent/AppComponent.vue";
    import AppInputFile from "@/components/AppInputFile/AppInputFile.vue";

    const changeValue = (data) => {
        console.log('data', data)
    }

</script>