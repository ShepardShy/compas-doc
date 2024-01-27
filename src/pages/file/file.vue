<template>
    <AppComponent
        :title="'Поле файлов'"
        :component="File"
        :codeProps="codeProps"
        :codeEmits="codeEmits"
        @changeValue="(data) => changeValue(data)"
    />

</template>

<script setup>
    import './file.scss';

    import codeProps from "@/data/inputs/file/codeProps.json";
    import codeEmits from "@/data/inputs/file/codeEmits.json";

    import File from "@/components/AppInputs/File/File.vue";
    import AppComponent from "@/components/AppComponent/AppComponent.vue";

    const changeValue = (data) => {
        console.log('data', data)
    }

</script>