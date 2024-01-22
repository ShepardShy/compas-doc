<template>
	<TableItemJson
		v-if="props.item.type == 'json'"
		:item="props.item"
	/>
	<TableItemDefault
		v-else
		:item="props.item"
	/>
</template>

<script setup>
    import './TableItem.scss';
    import TableItemJson from './TableItemJson/TableItemJson.vue';
    import TableItemDefault from './TableItemDefault/TableItemDefault.vue';

    const props = defineProps({
        item: {
            default: {
                id: 0,
                title: "Undefined title",
                typeComponent: "",
                type: "text",
                value: null,
                key: ""
            },
            type: Object
        }
    })

</script>
