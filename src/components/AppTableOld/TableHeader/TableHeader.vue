<template>
    <thead class="table__header" ref="tableHeader">
        <TableRow>
            <TableHeaderItem
                v-for="item in props.tableStore.tableKeysFiltered"
                :key="item.key"
                :item="item"
                :tableStore="props.tableStore"
                :tableRef="props.tableRef"
                :state="props.state"
                :selectAll="props.selectAll"
                :loaderStatus="props.loaderStatus"
                :sortTab="sortTab"
                :scrollBlock="props.scrollBlock"
                :tableHeight="tableHeight"
                @dragEnd="(tableItemRef) => dragEnd(tableItemRef, item)"
                @dragStart="(event) => dragStart(event, item)"
                @mousedown="() => commonScripts.hideAllDetailsMain('details')"
                @sortTable="(data) => sortTable(data)"
                @changeValue="(data) => emit('changeValue', data)"
            />
        </TableRow>
    </thead>
</template>

<script setup>
    import './TableHeader.scss';

    import _ from 'lodash'
    import TableRow from '../TableRow/TableRow.vue'
    import commonScripts from '@/helpers/commonScripts';
    import TableHeaderItem from './TableHeaderItem/TableHeaderItem.vue';
    import SectionScrollBlockScripts from '@/components/AppSection/AppSectionScrollBlock/SectionScrollBlockScripts.js';
    import TableScripts from "@/components/AppTable/TableScripts";

    let table = ref(null)
    const tableHeader = ref(null)
    let prevDraggableItem = ref({
		item: null,
	    count: 0
    })
    let currentDaggableItem = ref(null)
    let prevMouseCoords = ref(null)
    let tableHeight = ref(null)
    let tableCopy = ref(null)

    let sortTab = ref({
        key: 'id',
        sort_order: 'desc'
    })

    const props = defineProps({
        state: {
            default: "select",
            type: String
        },
        selectAll: {
            default: false,
            type: Boolean
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
        loaderStatus: {
            default: false,
            type: Boolean
        }
    })

    const emit = defineEmits([
        'sortTable',
        'changeValue'
    ])

    onMounted(() => {
        table.value = tableHeader.value.closest('.table')
    })

    // Сортировка таблицы
    const sortTable = (item) => {
        let sortedField = props.tableStore.tableKeys.find(p => p.key == item.key)

        for (let item of props.tableStore.tableKeys) {
            item.sort_order = null
        }

        if (props.tableStore.sortItem == null || props.tableStore.sortItem.key != item.key) {
            sortTab.value.sort_order = 'desc'
            sortedField.sort_order = 'desc'
        } else {
            if (props.tableStore.sortItem.order == 'desc') {
                sortTab.value.sort_order = 'asc'
                sortedField.sort_order = 'asc'
            } else {
                sortTab.value.sort_order = 'desc'
                sortedField.sort_order = 'desc'
            }
        }

        props.tableStore.sortItem = {
            key: sortedField.key,
            order: sortedField.sort_order
        }
        sortTab.value.key = item.key
        emit('sortTable', sortTab.value)
    }

    const onMouseMove = (e) => {
        e = e || window.event;
        var dragX = e.pageX
        if (prevMouseCoords.value != dragX) {
            getElemCoords(dragX, e)
        }
        prevMouseCoords.value = dragX
    }

    // Локальный вывод данных в консоль
    const dragStart = (event, item) => {
        let startX = event.event.offsetX
        let startY = event.event.offsetY
        currentDaggableItem.value = item

        copyTable()
        setTableHeight()
        document.addEventListener("dragover", onMouseMove);
        commonScripts.cloningDraggableTableColumn(event.event, tableCopy.value, item.key, startX, startY)

        let tableCells = tableCopy.value.querySelectorAll('.table__item');

        for (let cell of tableCells) {
            if (cell.getAttribute('data-key') == currentDaggableItem.value.key) {
                cell.classList.add('sortable-ghost')
            }
        }
    }

    // Установка высоты таблицы
    const setTableHeight = () => {
        tableHeight.value = `${props.tableRef.offsetHeight - 10}px`
    }

    const dragEnd = () => {
        commonScripts.removingDraggableComponent()
        currentDaggableItem.value = null
        prevDraggableItem.value = {
	        item: null,
	        count: 0
        }
        setTableKeysPosition()
        props.tableRef.classList.remove('table_hidden')
        tableCopy.value.remove()
        document.removeEventListener("dragover", onMouseMove);
        
        setTimeout(() => {
            TableScripts.setStoreTableKeysMargin(table.value, props.tableStore)
            SectionScrollBlockScripts.setStickyPosition(props.tableRef, props.scrollBlock.scrollBlock, props.tableStore)
        }, 10);
    }

    const getElemCoords = (posX, event) => {
        let itemListParent = tableCopy.value.querySelector('thead tr');
        let itemList = tableCopy.value.querySelectorAll('thead tr .table__item');

        let tableBodyListParent = tableCopy.value.querySelectorAll('tbody tr');
        let fromIndex = [...itemList].findIndex(p => p.getAttribute('data-key') == currentDaggableItem.value.key)

        let stopDrag = false

        let hoverElementIndex = [...itemList].findIndex((elem, index) => {
            let itemCoords = elem.getBoundingClientRect();
            let startCoord = itemCoords.x
            let center = (itemCoords.x + (itemCoords.x + itemCoords.width)) / 2
            let endCoord = itemCoords.x + itemCoords.width
            let coord = (startCoord + center) / 2

            if ((posX >= coord && posX <= endCoord) && ((posX > center + 3 && fromIndex > index) || (posX < center - 3 && fromIndex < index))) {
                stopDrag = true
            }

            return posX >= coord && posX <= endCoord
        })

        if (stopDrag || hoverElementIndex === -1) return

        if (fromIndex > hoverElementIndex) {
            itemListParent.insertBefore(itemList[fromIndex], itemList[hoverElementIndex]);

            for (let row of [...tableBodyListParent]) {
                row.insertBefore(row.children[fromIndex], row.children[hoverElementIndex]);
            }
        } else if (fromIndex < hoverElementIndex) {
            itemListParent.insertBefore(itemList[hoverElementIndex], itemList[fromIndex]);

            for (let row of [...tableBodyListParent]) {
                row.insertBefore(row.children[hoverElementIndex], row.children[fromIndex]);
            }
        } else {
            return
        }
    }

    const setTableKeysPosition = () => {
        let itemList = tableCopy.value.querySelectorAll('thead tr .table__item');
        let item = null
        let data = []
        itemList.forEach((element, index) => {
            item = props.tableStore.tableKeysFiltered.find(p => p.key == element.getAttribute('data-key'))
            item.index = index
            data.push(item)
        });

        props.tableStore.changedColumns = props.tableStore.tableKeysFiltered = data.sort((next, prev) => next.index - prev.index)
    }

    const copyTable = () => {
        tableCopy.value = props.tableRef.cloneNode(true);
        tableCopy.value.classList.add('table_copy')
        props.tableRef.classList.add('table_hidden')
        
        setTimeout(() => {
            props.scrollBlock.scrollBlock.appendChild(tableCopy.value)
        }, 100);
    }
</script>
