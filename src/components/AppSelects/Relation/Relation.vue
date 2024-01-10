<template>
    <figure class='ibg relation__icon'>
        <img :src='activeOption.file' :alt='activeOption.text' v-if="![null, undefined].includes(activeOption.file) && activeOption.file != ''">
        <figcaption v-else :style="`--backgroundColor: ${activeOption.color}`">
            {{ activeOption.text.substring(0, 1) }}
        </figcaption>
    </figure>
</template>

<script setup>
    import './Relation.scss';
    
</script>
