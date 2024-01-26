<template>
<!--    <AppComponent-->
<!--        :title="'Поле файлов'"-->
<!--        :component="AppInputFile"-->
<!--        :codeProps="InputProps"-->
<!--        :codeEmits="inputEmits"-->
<!--        @changeValue="(data) => changeValue(data)"-->
<!--    />-->

    <AppFile
        :item="inputProps"
        @changeValue="(data) => changeValue(data)"
    />

</template>

<script setup>
    import './file.scss';

    import inputProps from "@/data/inputs/file/codeProps.json";
    // import inputEmits from "@/data/inputs/file/codeEmits.json";

    import AppFile from "@/components/AppInputFile/AppFile.vue";

    const changeValue = (data) => {
        console.log('data', data)
    }

</script>