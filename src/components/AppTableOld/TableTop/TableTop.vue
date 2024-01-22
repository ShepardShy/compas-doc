<template>
    <div class="section__top table__top">
        <SectionIconDragTwoLines
            v-if="props.isDragging"
        />

        <div class="section__top-group">
            <div class="table__title" v-if="props.showTitle">
                {{ props.title }}
            </div>

            <div class="table__tabs" v-if="props.showTabs">
                <div
                    v-for="tab in props.tabs"
                    class="table__tab"
                    @click="() => $emit('changeTab', tab)"
                    :class="props.activeTab.key == tab.key ? 'table__tab_active' : ''"
                >
                    {{ tab.title }}
                </div>
            </div>
        </div>

        <div class="section__top-group">
            <TableSettings
                :isSortedSection="props.isSortedSection"
                :saveSettings="props.saveSettings"
                :tableRef="props.tableRef != null ? props.tableRef.tableRef : null"
                :scrollBlock="props.scrollBlock"
                :tableStore="props.tableStore"
                @sortTable="(data) => $emit('sortTable', data)"
                @callAction="(data) => $emit('callAction', data)"
                @updateTableKeys="() => $emit('updateTableKeys', true)"
                @updateTableKeysOrder="(data) => $emit('updateTableKeysOrder', data)"
            />
        </div>
    </div>
</template>

<script setup>
    import './TableTop.scss';

    import TableSettings from '@/components/AppTable/TableSettings/TableSettings.vue';
    import SectionIconDragTwoLines from '@/components/AppSection/SectionIconDragTwoLines/SectionIconDragTwoLines.vue';

    const props = defineProps({
        tableRef: {
            default: null
        },
        scrollBlock: {
            default: null
        },
        tableStore: {
            default: null
        },
        showTitle: {
            default: false,
            type: Boolean
        },
        showTabs: {
            default: false,
            type: Boolean
        },
        tabs: {
            default: [],
            type: Array
        },
        title: {
            default: '',
            type: String
        },
        activeTab: {
            default: null,
            type: Object
        },
        loaderStatus: {
            default: false,
            type: Boolean
        },
        isDragging: {
            default: false,
            type: Boolean
        },
        isSortedSection: {
            default: true,
            type: Boolean
        },
        saveSettings: {
            default: false,
            type: Boolean
        }
    })
</script>
