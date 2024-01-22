<template>
    <div class="table-mobile__section" :class="setClassesRow(props.row)">
        <MobileTableSectionItem
            v-for="item in setTableItems"
            :item="item"
            :row="props.row"
            :selectAll="props.selectAll"
            :state="props.state"
            :loaderStatus="props.loaderStatus"
            :slug="props.slug"
            :indexRow="props.indexRow"
            :trash="props.trash"
            @sortTable="(data) => $emit('sortTable', data)"
            @changeValue="(data) => $emit('changeValue', data)"
            @callAction="(data) => $emit('callAction', data)"
        />
    </div>
</template>

<script setup>
    import './MobileTableSection.scss';

    import MobileTableSectionItem from './MobileTableSectionItem/MobileTableSectionItem.vue';

    const setTableItems = computed(() => {
        if (props.row.state == 'edit') {
            return props.tableStore.tableKeysFiltered
        } else {
            let data = []
            for (let item of props.tableStore.tableKeysFiltered) {
                if ((item.visible_always == undefined || item.visible_always == 1)) {
                    data.push(item)
                } else {
                  if (item.visible_always == 0 && props.row[item.key].value != null) {
                    data.push(item)
                  }  
                } 
            }
            return data
        }
    })

    const props = defineProps({
        row: {
            default: {

            },
            type: Object
        },
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
        },
        indexRow: {
            default: 0,
            type: Number
        }
    })

    // Установка классов для ячейки
    const setClassesRow = (row) => {
        return [
            row.isChoose ? 'table-mobile__section_choosen' : '',
            row.state == 'edit' ? 'table-mobile__section_edit' : '',
        ]
    }
</script>
