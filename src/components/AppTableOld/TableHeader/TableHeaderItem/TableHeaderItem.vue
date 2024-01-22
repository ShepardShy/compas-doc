<template>
    <th
        class="table__item table__item_draggable"
        ref="tableItemRef"
        :title="props.item.title"
        :class="setClass"
        :style="setStyle"
        :data-key="props.item.key"
        @click="() => doubleClick(props.item)"
    >
        <TableHeaderItemContent
            :item="props.item"
            :sortTab="props.sortTab"
            :state="props.state"
            :tableStore="props.tableStore"
            :selectAll="props.selectAll"
            :loaderStatus="props.loaderStatus"
            @sortTable="(data) => $emit('sortTable', data)"
            @changeValue="(data) => $emit('changeValue', data)"
        />
        <div 
            class="table__item_dragging"
            :draggable="setIsDragging"
            @dragover.prevent
            @dragenter.prevent
            @dragend="() => $emit('dragEnd', tableItemRef)"
            @dragstart="(event) => $emit('dragStart', {event, tableItemRef})"
        ></div>

        <TableHeaderItemBorder />
        </th>
</template>

<script setup>
    import './TableHeaderItem.scss';

    import TableHeaderItemBorder from './TableHeaderItemBorder/TableHeaderItemBorder.vue';
    import TableHeaderItemContent from './TableHeaderItemContent/TableHeaderItemContent.vue'

    const tableItemRef = ref()

    let clickSetting = ref({
        id: -1,
        delay: 500,
        clicks: 0,
        timer: null
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
        loaderStatus: {
            default: null,
            type: String
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
        },
        tableRef: {
            default: null
        },
        scrollBlock: {
            default: null
        },
        tableHeight: {
            default: '',
            type: String
        },
        tableStore: {
            default: null
        }
    })

    const emit = defineEmits([
        'sortTable'
    ])

    // Установка классов
    const setClass = computed(() => {
        return [
            props.item.fixed ? 'table__item_fixed' : '',
            props.item.read_only ? 'table__item_read-only' : '',
            props.item.isSticky ? 'table__item_sticky' : '',
            props.item.type == 'actions' ? 'table__item_checkbox' : '',
            props.item.type == 'checkbox' ? 'table__item_actions' : '',
        ]
    })

    // Установка стилей
    const setStyle = computed(() => {
        let fixTarget = Number(props.item.fixTarget.replace('px', ''))

        return [
            `--tableHeight: ${props.tableHeight};`,
            `--cellLeft: ${fixTarget <= 0 ? 0 : fixTarget}px;`
        ]
    })

    const setIsDragging = computed(() => {
        if (props.item.isSticky) {
            return false
        } else {
            return true
        }
    })

    // Симуляция двойного клика
    const doubleClick = (item) => {
        clickSetting.value.clicks++;
        if (clickSetting.value.clicks === 1) {
            clickSetting.value.timer = setTimeout( () => {
            clickSetting.value.clicks = 0
            }, clickSetting.value.delay);
        } else {
            if ((clickSetting.value.id == item.id) && (item.key != 'isChoose') && (item.key != 'actions')) {
                emit('sortTable', item)
            }
            window.getSelection().empty();
            clearTimeout(clickSetting.value.timer);  
            clickSetting.value.clicks = 0;
        }   
        clickSetting.value.id = item.id
    }  
</script>
