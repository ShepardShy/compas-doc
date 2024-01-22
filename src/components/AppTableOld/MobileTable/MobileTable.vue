<template>
    <AppPageLoader class="table-loader_before" v-if="props.loaderStatus"/>
    <draggable
        v-else
        tag="div"
        v-model="props.tableStore.tableData"
        :forceFallback="true"
        :itemKey="'tableMobileBody'"
        class="table-mobile"
        handle=".icon__draggable"
        @end="() => dragEnd()"
        @choose="() => chooseRow()"
    >
        <template #item="{ element: row, index: j }">
            <MobileTableSection
                :row="row"
                :slug="props.slug"
                :state="props.state"
                :indexRow="j"
                :trash="props.trash"
                :tableStore="props.tableStore"
                :loaderStatus="props.loaderStatus"
                :selectAll="props.tableStore.selectAll"
                @sortTable="(data) => $emit('sortTable', data)"
                @changeValue="(data) => $emit('changeValue', data)"
                @callAction="(data) => $emit('callAction', data)"
            />
        </template>
    </draggable>
</template>

<script setup>
    import './MobileTable.scss';

    import draggable from 'vuedraggable'
    import commonScripts from '@/helpers/commonScripts';
    import AppPageLoader from '@/components/AppPageLoader/AppPageLoader.vue'
    import MobileTableSection from './MobileTableSection/MobileTableSection.vue';

    const props = defineProps({
        selectAll: {
            default: false,
            type: Boolean
        },
        state: {
            default: 'select',
            type: String
        },
        tableStore: {
            default: null,
        },
        loaderStatus: {
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
        }
    })

    const dragEnd = () => {
        props.tableStore.tableState = 'edit'
    }

    const chooseRow = () => {
        // props.tableRef.classList.add('table_dragging')

        setTimeout(() => {
            commonScripts.hideAllDetails('details')
        }, 10);
    }
</script>
