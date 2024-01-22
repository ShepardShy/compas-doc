<template>
    <table class="table" ref="tableRef" :data-paste="props.isCanPasteRow" :data-key="props.tableStore.key" :data-slug="props.slug">
        <TableHeader
            :state="props.state"
            :tableRef="tableRef"
            :loaderStatus="props.loaderStatus"
            :selectAll="props.selectAll"
            :tableStore="props.tableStore"
            :scrollBlock="props.scrollBlock"
            @sortTable="(data) => $emit('sortTable', data)"
            @changeValue="(data) => $emit('changeValue', data)"
            @mousedown="() => otherScripts.clearClickedItems(tableRef)"
        />

        <TableBody
            :trash="props.trash"
            :tableStore="props.tableStore"
            :state="props.state"
            :tableRef="tableRef"
            :slug="props.slug"
            :scrollBlock="props.scrollBlock"
            :group="props.group"
            :canDragRow="props.canDragRow"
            @dragEnd="(event) => $emit('dragEnd', event)"
            @changeValue="(data) => $emit('changeValue', data)"
            @callAction="(action) => $emit('callAction', action)"
            @chooseDragRow="(data) => $emit('chooseDragRow', data)"
            v-click-out-side="(event) => otherScripts.clearClickedItems(tableRef, event)"
        />
    </table>
</template>

<script setup>
    import './AppTable.scss';

    import resizableGrid from '@/components/AppTable/TableFunctions.js'

    import TableHeader from './TableHeader/TableHeader.vue';
    import TableBody from './TableBody/TableBody.vue';

    import { clickOutSide as vClickOutSide } from '@mahdikhashan/vue3-click-outside'
    import otherScripts from "./TableScripts/otherScripts";

    const tableRef = ref()

    const props = defineProps({
        selectAll: {
            default: false,
            type: Boolean
        },
        state: {
            default: 'select',
            type: String
        },
        scrollBlock: {
            default: null
        },
        tableStore: {
            default: null,
        },
        loaderStatus: {
            default: false,
            type: Boolean
        },
        loaderTable: {
            default: false,
            type: Boolean
        },
        slug: {
            default: '',
            type: String
        },
        trash: {
	        default: false,
	        type: Boolean
        },
        group: {
            default: null,
            type: String
        },
        canDragRow: {
            default: false,
            type: Boolean
        },
        isCanPasteRow: {
            default: false,
            type: Boolean
        }
    })

    onMounted(() => {
		// Инициализация возможности изменения размера таблицы
        if (tableRef.value != null) {
            resizableGrid(props.tableStore, tableRef.value)
        }
    })

    defineExpose({
        tableRef
    })
</script>
