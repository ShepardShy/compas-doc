<template>
    <figure class="ibg table__item-img" :style="`--table__item-rect: ${props.option.color != undefined ? props.option.color : ''}`">
        <img 
            v-if="(props.option.file != '') && (props.option.file != null)" 
            :src='`${props.option.file}`' 
            :alt='props.option.name'
        >
    </figure>
</template>

<script setup>
    import './TableDetailsOptionFigure.scss';

    const props = defineProps({
        option: {
            default: {
                id: 0,
                name: 'Undefined'
            },
            type: Object
        }
    })
</script>
