<template>
    <summary>
        <TableDetailsSummaryFigure 
            :item="props.item"
        />
        <span class="table__item-value"> 
            {{ props.item.value == null ? '' : props.item.value.name }} 
        </span>
    </summary>
</template>

<script setup>
    import './TableDetailsSummary.scss';

    import TableDetailsSummaryFigure from './TableDetailsSummaryFigure/TableDetailsSummaryFigure.vue';
    
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
