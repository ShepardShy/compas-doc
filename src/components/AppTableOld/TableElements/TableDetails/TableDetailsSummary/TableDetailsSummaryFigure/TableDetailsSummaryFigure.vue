<template>
    <figure class="ibg table__item-img" :style="`--table__item-rect: ${props.item.value != undefined && props.item.value.color != undefined ? props.item.value.color : ''}`">
        <img 
            v-if="(props.item.value != undefined && props.item.value.file != '') && (props.item.value.file != null)" 
            :src='`${props.item.value.file}`' 
            :alt='props.item.value.name'
        >

        <figcaption>
            <svg width="4" height="3" viewBox="0 0 4 3" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M0 0H4L2 3L0 0Z" fill="#888888"/> </svg>
        </figcaption>
    </figure>
</template>

<script setup>
    import './TableDetailsSummaryFigure.scss';
    
    const props = defineProps({
        item: {
            default: {
                id: 0,
                title: 'Undefined title',
                typeComponent: 'select',
                key: '',
                disabled: false,
                value: '',
                options: [
                    {
                        id: 0,
                        name: 'Undefined'
                    }
                ]
            },
            type: Object
        }
    })
</script>
