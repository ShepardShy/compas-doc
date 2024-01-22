<template>
    <div class="table-mobile__item"
        ref="tableItemRef"
        @mousedown="(event) => otherScripts.clearSelections(LocalTarget, event)"
        :title="TableItemTitle"
        @click="(event) => doubleClick(event, props.row)"
        :class="setClass"
        :style="setStyle"
        :data-key="props.item.key"
        :data-type="props.item.type"
    >
        <component
            v-if="!['status', 'relation'].includes(props.item.type)"
            v-show="props.row.state == 'edit' && (props.row[props.item.key] != undefined && props.item.read_only != 1)"
            class="table__item-content"
            :class="props.item.key == 'actions' ? 'table__item-content_actions' : props.item.type == 'status' ? 'table__item-content_status' : ''"
            :is="props.item.editComponent"
            :item="{
               id: props.row.id.value,
                selected_item: props.row[props.item.key] == undefined ? null : props.row[props.item.key].value,
                title: props.item.title,
                typeComponent: props.item.type,
                type: props.item.type,
                isMobile: false,
                key: props.item.key,
                disabled: TableItemDisabled,
                value: TableItemValue,
                parentSlug: props.slug,
                related_table: props.item.related_table,
                indexRow: props.indexRow,
                state: props.row.state == 'edit' && (props.row[props.item.key] != undefined && props.item.read_only == 0) ? 'edit' : null,
                options: ['status', 'relation'].includes(props.item.type) ? props.item.options : props.row[props.item.key] != undefined ? props.row[props.item.key].newOptions : null,
                external_link: props.row[props.item.key] != undefined ? props.row[props.item.key].external_link : null,
                is_external_link: props.item.is_external_link,
                is_plural: props.item.is_plural,
                is_link: props.item.is_link,
                substring: props.item.substring
            }"
            :isUseEnter="false"
            :isCanCreate="true"
            :isCanAdd="props.item.is_plural ? props.item.is_plural : false"
            @changeTab="(data) => emit('callAction', {action: 'changeTab', item: data})"
            @changeValue="(data) =>  changeValue(data)"
            @showModal="(data) => emit('callAction', {action: 'showModal', item: data})"
            @callAction="(action) => callAction(action)"
            @openDatepicker="() => otherScripts.changePositionElems(null, tableItemRef, null)"
            @dragEnd="(data) => emit('dragEnd', data)"
            @dragStart="(data) => emit('dragStart', data)"
        />
        <component
            v-show="['status', 'relation'].includes(props.item.type) || props.row.state != 'edit' || props.row[props.item.key] == undefined || props.item.read_only == 1"
            class="table__item-content"
            :class="props.item.key == 'actions' ? 'table__item-content_actions' : props.item.type == 'status' ? 'table__item-content_status' : ''"
            :is="props.item.component"
            :item="{
                id: props.row.id.value,
                selected_item: props.row[props.item.key] == undefined ? null : props.row[props.item.key].value,
                title: props.item.title,
                typeComponent: props.item.type,
                type: props.item.type,
                isMobile: false,
                key: props.item.key,
                disabled: TableItemDisabled,
                value: TableItemValue,
                related_table: props.item.related_table,
                parentSlug: props.slug,
                indexRow: props.indexRow,
                state: props.row.state == 'edit' && (props.row[props.item.key] != undefined && props.item.read_only == 0) ? 'edit' : null,
                options: ['status', 'relation'].includes(props.item.type) ? props.item.options : props.row[props.item.key] != undefined ? props.row[props.item.key].newOptions : null,
                external_link: props.row[props.item.key] != undefined ? props.row[props.item.key].external_link : null,
                is_external_link: props.item.is_external_link,
                is_plural: props.item.is_plural,
                is_link: props.item.is_link,
                substring: props.item.substring
            }"
            :isCanCreate="true"
            :isUseEnter="false"
            :enabledAutocomplete="false"
            :isReadOnly="props.row.state == null"
            :isCanAdd="props.item.is_plural ? props.item.is_plural : false"
            @changeTab="(data) => emit('callAction', {action: 'changeTab', item: data})"
            @changeValue="(data) =>  changeValue(data)"
            @showModal="(data) => emit('callAction', {action: 'showModal', item: data})"
            @callAction="(action) => callAction(action)"
            @openDatepicker="() => otherScripts.changePositionElems(null, tableItemRef, null)"
            @dragEnd="(data) => emit('dragEnd', data)"
            @dragStart="(data) => emit('dragStart', data)"
        />
    </div>
</template>

<script setup>
    import './MobileTableSectionItem.scss';

    import setValues from '@/components/AppTable/TableScripts/setValues'
    import setTitles from '@/components/AppTable/TableScripts/setTitles'
    import otherScripts from '@/components/AppTable/TableScripts/otherScripts'

    let LocalTarget = ref(null)
    const tableItemRef = ref(null)

    let clickSetting = ref({
        id: -1,
        delay: 200,
        clicks: 0,
        timer: null
    })

    // Локальный вывод данных в консоль
    const callAction = (action) => {
        if (typeof action == 'string') {
            emit('callAction', {action: action, item: [props.row]})
        } else {
            emit('callAction', action)
        }
    }

    const props = defineProps({
        state: {
            default: "select",
            type: String
        },
        row: {
            default: {},
            type: Object
        },
        indexRow: {
            default: 0,
            type: Number
        },
        slug: {
            default: '',
            type: String
        },
        trash: {
	        default: false,
	        type: Boolean
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

    const emit = defineEmits([
        'changeValue',
        'callAction',
        'dragEnd',
        'dragStart'
    ])

    // Установка значения и превью
    const TableItemValue = computed(() => {
        if (['status', 'relation'].includes(props.item.type)) {
            return props.row[props.item.key].value
        } else {
            return setValues.setValue(props.row, props.item, props.state, props.trash, null)
        }
    })

    // Установка заголовка
    const TableItemTitle = computed(() => {
        if (props.item.type != 'relation' && props.item.type != 'password') {
            return setTitles.setTitle(props.row, props.item)
        }
    })

    // Установка выключенных значений
    const TableItemDisabled = computed(() => {
        return setValues.setDisabled(props.row, props.item, props.state)
    })

    // Установка классов
    const setClass = computed(() => {
        return setValues.setClass(props.item)
    })

    // Установка стилей для ячейки
    const setStyle = computed(() => {
        return [...setValues.setStyle(props.row, props.item), `--colorCell: ${props.item.color};`]
    })

    // Симуляция двойного клика
    const doubleClick = (event, row) => {
        otherScripts.changePositionElems(event, tableItemRef.value, null)

        if (setValues.checkValue(event.target, props.state, 'mobile')) {
            clickSetting.value.clicks++;
            if (clickSetting.value.clicks === 1) {
                clickSetting.value.timer = setTimeout( () => {
                    clickSetting.value.clicks = 0
                }, clickSetting.value.delay);
            } else {
                if ((clickSetting.value.id == row.id) && (row.state != 'edit')) {
                    clearTimeout(clickSetting.value.timer);
                    emit('callAction', {
                        action: 'showModal',
                        item: {
                            id: row.id.value,
                            link: `/objects/${props.slug}/${row.id.value}`,
                            slug: props.slug,
                            modalKey: props.slug,
                            component: markRaw(defineAsyncComponent(() => import('~/components/SelectedObject/SelectedObject.vue')))
                        },
                        slug: props.slug,
                    })
                    window.getSelection().empty();
                    clickSetting.value.clicks = 0;
                }
            }
            clickSetting.value.id = row.id
        }
    }

    // Смена значения
    const changeValue = (data) => {
        emit('changeValue', {
            id: props.row.id,
            subId: data.id != undefined ? data.id : null,
            key: data.key,
            item: props.item,
            value: data.value
        })
    }
</script>
