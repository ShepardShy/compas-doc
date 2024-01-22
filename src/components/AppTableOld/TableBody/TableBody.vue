<template>
    <draggable
        tag="tbody"
        v-model="props.tableStore.tableData"
        :forceFallback="true"
        :itemKey="'tableBody'"
        class="table__body"
        :group="localDrag ? 'local' : props.group"
        :handle="props.canDragRow ? '.table__item:not(.table__item_actions)' : '.icon__draggable'"
        @end="(event) => dragEnd(event)"
        @choose="(event) => dragRow(event)"
        @unchoose="() => props.tableRef.classList.remove('table_dragging')"
    >
        <template #item="{ element: row, index: j }">
            <TableRow class="table__row" :data-id="j" :class="setClassesRow(row, j)" :style="setStyleRow(row, j)" >
                <TableBodyItem
                    v-for="(elem, i) in filteredItems"
                    :row="row"
                    :item="elem"
                    :state="props.state"
                    :slug="props.slug"
                    :trash="props.trash"
                    :indexRow="j"
                    :tableStore="props.tableStore"
                    :style="setStyleCell(elem, i)"
                    :class="setClassesCell(elem, i)"
                    @changeValue="(data) => $emit('changeValue', data)"
                    @callAction="(data) => $emit('callAction', data)"
                />
            </TableRow>
        </template>
    </draggable>
</template>

<script setup>
    import './TableBody.scss';

    import draggable from 'vuedraggable'
    import TableRow from '../TableRow/TableRow.vue';
    import commonScripts from '@/helpers/commonScripts';
    import TableBodyItem from './TableBodyItem/TableBodyItem.vue';

    const props = defineProps({
        state: {
            default: "select",
            type: String
        },
        tableRef: {
            default: null
        },
        scrollBlock: {
            default: null
        },
        tableStore: {
            default: null
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
        }
    })

    const emit = defineEmits([
        'callAction',
        'dragEnd'
    ])

    const filteredItems = ref([])

    let localDrag = ref(false)
    let draggableRow = ref(null)

    // Установка стилей для меню селекта, если это два последних элемента в таблице
    const setStyleCell = (item, i) => {
        let styles = []

        if ((i == props.tableStore.tableKeysFiltered.length - 1) || (i == props.tableStore.tableKeysFiltered.length - 2)) {
            if (item != undefined) {
                if (item.key == 'actions') {
                    styles.push(Number(item.width.replace('px', '')) < 220 ? `--offsetDetails: -160px` : '--offsetDetails: 15px')
                }
                if ((i == props.tableStore.tableKeysFiltered.length - 1) || (i == props.tableStore.tableKeysFiltered.length - 2)) {
                    styles.push(Number(item.width.replace('px', '')) < 220 ? `--offsetDetails: ${item.width.replace('px', '') - 210}px` : '--offsetDetails: 10px')
                }
            }
        }

        styles.push(`--colorCell: ${item.color};`)

        return styles
    }

    // Установка классов для ячейки
    const setClassesCell = (item, i) => {
        if ((i == props.tableStore.tableKeysFiltered.length - 1) || (i == props.tableStore.tableKeysFiltered.length - 2)) {
            return 'table__item_last'
        }
    }

    // Установка классов для ячейки
    const setStyleRow = (row, j) => {
        return `--columnIndex: ${props.tableStore.tableData.length - j};`
    }

    // Установка классов для ячейки
    const setClassesRow = (row, j) => {
        return [
            row.isChoose ? 'table__row_choosen' : '',
            row.state == 'edit' ? 'table__row_edit' : '',
            row.isDragging ? 'sortable-ghost' : '',
            props.tableStore.tableData.length >= 8 && j >= props.tableStore.tableData.length - 8 ? 'table__row_upper' : ''
        ]
    }

    const dragEnd = (event) => {
        props.tableStore.tableState = 'edit'
        let toDragTable = event.originalEvent.target.closest('table')
        let response = {
            event: event,
            type: null,
            value: null,
            slug: null,
            key: null,
            item: null
        }

        // Строка перемещается в другую таблицу
        if (event.from.closest('table').getAttribute('data-key') != event.to.closest('table').getAttribute('data-key')) {
            response.type = 'otherTable'
            response.slug = event.to.closest('table').getAttribute('data-slug')
            response.key =  event.to.closest('table').getAttribute('data-key')
            response.item = event.item.__draggable_context.element
        } else if (event.from.closest('table').getAttribute('data-key') == event.to.closest('table').getAttribute('data-key')) {
            if (toDragTable != null && toDragTable.getAttribute('data-paste') == 'true') {
                response.type = 'pasteTable'
                response.item = draggableRow.value
                response.key =  event.from.closest('table').getAttribute('data-key')
                response.value = event.originalEvent.target.closest('.table__row').getAttribute('data-id')
            } else {
                // Строка перемещается внутри таблицы 
                response.type = 'insideTable'
                response.value = event.to.__draggable_component__.modelValue
            }
        }

        
        draggableRow.value = null
        emit('dragEnd', response)
    }

    const dragRow = (event) => {
        props.tableRef.classList.add('table_dragging')
        draggableRow.value = event.item.__draggable_context.element

        if (event.originalEvent.target.closest('.icon__draggable') != null) {
            localDrag.value = true
        } else {
            localDrag.value = false
        }

        setTimeout(() => {
            commonScripts.hideAllDetails('details')
        }, 10);
    }

    onMounted(() => {
	    filteredItems.value = props.tableStore.tableKeysFiltered
    })

    watch(() => props.tableStore.tableKeysFiltered, () => {
	    filteredItems.value = Object.assign([], props.tableStore.tableKeysFiltered)
    })
</script>

