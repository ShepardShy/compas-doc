<template>
    <div class="table__item-content_header" >
        <TableHeaderItemContentTitle 
            v-if="props.item.key != 'isChoose'"
            :item="props.item"
        />
        <TableHeaderItemContentCheckbox 
            v-else
            :state="props.state"
            :selectAll="props.selectAll"
            :item="props.item"
            @changeValue="(data) => $emit('changeValue', data)"
        />
        <TableHeaderItemContentSort 
            v-if="props.tableStore.sortItem != null && props.tableStore.sortItem.key == props.item.key"
            :item="props.tableStore.sortItem"
        />

    </div>
</template>

<script setup>
    import './TableHeaderItemContent.scss';
    
    import TableHeaderItemContentSort from './TableHeaderItemContentSort/TableHeaderItemContentSort.vue'
    import TableHeaderItemContentTitle from './TableHeaderItemContentTitle/TableHeaderItemContentTitle.vue';
    import TableHeaderItemContentCheckbox from './TableHeaderItemContentCheckbox/TableHeaderItemContentCheckbox.vue'

    const props = defineProps({
        state: {
            default: "select",
            type: String
        },
        selectAll: {
            default: false,
            type: Boolean
        },
        loaderStatus: {
            default: null,
            type: String
        },
        tableStore: {
            default: null
        },
        sortTab: {
            default: {
                key: 'id',
                sort_order: 'desc'
            },
            type: Object
        },
        item: {
            default: {
                "id": 0,
                "title": "",
                "key": "",
                "width": "40px",
                "enabled": true,
                "hover": false,
                "sort_order": null,
                "type": "",
                "fixed":  false,
                "fixTarget":  null
            },
            type: Object
        }
    })
</script>
