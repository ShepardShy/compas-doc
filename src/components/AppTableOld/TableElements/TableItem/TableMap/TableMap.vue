<template>
    <div class="table__item-content">
        <TableMapTitle
            :title="props.item.title"
        />
        <div class="table__item_map select">
            <div class="table__item-content_title">
                Адрес
            </div>
            <TableMapField
                :item="props.item"
                @changeValue="data => $emit('changeValue', data)"
            />
        </div>
    </div>
</template>

<script setup>
    import './TableMap.scss';

    import TableMapTitle from './TableMapTitle/TableMapTitle.vue'
    import TableMapField from './TableMapField/TableMapField.vue'

    const props = defineProps({
        item: {
            default: {},
            type: Object
        }
    })
</script>
