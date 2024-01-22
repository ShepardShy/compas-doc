<template>
    <figure class='ibg table__item-sort' :class="props.item.order == 'asc' ? 'table__item-sort_up' : ''">
        <img class="table__item-sort-icon" src='/icons/dropdown.svg' alt=''>
    </figure>
</template>

<script setup>
    import './TableHeaderItemContentSort.scss';
    
    const props = defineProps({
        item: {
            default: {
                key: '',
                order: ''
            },
            type: Object
        }
    })
</script>
