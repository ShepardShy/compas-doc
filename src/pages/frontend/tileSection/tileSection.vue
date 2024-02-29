<template>
    <AppTileSection 
        :fields="TileSectionProps.fields.default"
    />

</template>

<script setup>
    import './tileSection.scss';
    
    import AppTileSection from '@/components/AppTileSection/AppTileSection.vue';

    import TileSectionProps from "@/data/frontend/tileSection/codeProps.json";
    // import TileSectionEmits from "@/data/frontend/tileSection/codeEmits.json";

</script>
