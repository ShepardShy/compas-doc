<template>
    <td class="table__item" ref="itemRef" @click="(event) => doubleClick(event, props.row)" :data-key="props.item.key" :class="[props.item.fixed ? 'table__item_fixed' : '', !props.item.enabled ? 'table__item_hidden' : '']" :style="`--colorItem: ${props.item.color};`">
        <div class="table-item__content">
                <AppCheckbox 
                    v-if="props.item.type == 'checkbox'"
                    :item="{
                        key: props.item.key,
                        type: props.item.type,
                        id: props.row.id,
                        title: props.item.title,
                        substring: props.item.unit,
                        value: props.row[props.item.key],
                        is_link: props.item.is_link,
                        is_plural: props.item.is_plural,
                        hiddenOptions: props.item.choosed,
                        related_table: props.item.related_table,
                        is_external_link: props.item.is_external_link,
                        options: ['status', 'relation'].includes(props.item.type) ? props.item.options : null,
                        external_link: props.row[props.item.key] != undefined ? props.row[props.item.key].external_link : null,
                    }"
                    :isCanCreate="true"
                    :isUseEnter="false"
                    :enabledAutocomplete="false"
                    :isReadOnly="Boolean(props.item.read_only || !props.row.isEdit)"
                    :isCanAdd="Boolean(props.item.is_plural)"
                    @changeValue="(data) => changeValue(props.row.id, data)"
                />
                <AppRelation 
                    v-else-if="props.item.type == 'relation'"
                    :item="{
                        key: props.item.key,
                        type: props.item.type,
                        id: props.row.id,
                        title: props.item.title,
                        substring: props.item.unit,
                        value: props.row[props.item.key],
                        is_link: props.item.is_link,
                        is_plural: props.item.is_plural,
                        hiddenOptions: props.item.choosed,
                        related_table: props.item.related_table,
                        is_external_link: props.item.is_external_link,
                        options: ['status', 'relation'].includes(props.item.type) ? props.item.options : null,
                        external_link: props.row[props.item.key] != undefined ? props.row[props.item.key].external_link : null,
                    }"
                    :isCanCreate="true"
                    :isUseEnter="false"
                    :enabledAutocomplete="false"
                    :isReadOnly="Boolean(props.item.read_only || !props.row.isEdit)"
                    :isCanAdd="Boolean(props.item.is_plural)"
                    @openLink="(data) => openLink(data, props.item.related_table)"
                    @click="() => openPopup(true)"
                    @clickOutside="() => openPopup(false)"
                    @changeValue="(data) => changeValue(props.row.id, data)"
                />
                <AppTextarea 
                    v-else-if="['number', 'password', 'text'].includes(props.item.type)"
                    :item="{
                        key: props.item.key,
                        type: props.item.type,
                        id: props.row.id,
                        title: props.item.title,
                        substring: props.item.unit,
                        value: [null, undefined].includes(props.row[props.item.key]) ? null : typeof props.row[props.item.key] == 'object' ? props.row[props.item.key] : String(props.row[props.item.key]),
                        is_link: props.item.is_link,
                        is_plural: props.item.is_plural,
                        hiddenOptions: props.item.choosed,
                        related_table: props.item.related_table,
                        is_external_link: props.item.is_external_link,
                        options: ['status', 'relation'].includes(props.item.type) ? props.item.options : null,
                        external_link: props.row[props.item.key] != undefined ? props.row[props.item.key].external_link : null,
                    }"
                    :isCanCreate="true"
                    :isUseEnter="false"
                    :enabledAutocomplete="false"
                    :isCanAdd="Boolean(props.item.is_plural)"
                    :isLink="Boolean(props.item.is_external_link)"
                    :isReadOnly="Boolean(props.item.read_only || !props.row.isEdit)"
                    @changeValue="(data) => changeValue(props.row.id, data)"
                />
                <FormValue 
                    v-else-if="item.type == 'json'"
                    :value="props.row[props.item.key]"
                    :isHTML="true"
                    :isLink="Boolean(props.item.is_external_link)"
                />
                <AppActions 
                    v-else-if="item.type == 'actions'"
                    :slug="props.row.isEdit ? 'edit' : 'routes'"
                    @callAction="(data) => data.value == 'showModal' ? openLink(props.row, props.slug) : emit('callAction', {action: data.value, value: props.row})"
                />
                <AppStatus 
                    v-else-if="props.item.type == 'status'"
                    :item="{
                            key: props.item.key,
                            type: props.item.type,
                            id: props.row.id,
                            title: props.item.title,
                            substring: props.item.unit,
                            value: props.row[props.item.key],
                            is_link: props.item.is_link,
                            is_plural: props.item.is_plural,
                            hiddenOptions: props.item.choosed,
                            related_table: props.item.related_table,
                            is_external_link: false,
                            options: props.item.options,
                            external_link: null,
                        }"
                        :isCanCreate="false"
                        :isHaveNullOption="false"
                        :isUseEnter="false"
                        :enabledAutocomplete="false"
                        :isReadOnly="Boolean(props.item.read_only || !props.row.isEdit)"
                        :isCanAdd="Boolean(props.item.is_plural)"
                        @click="() => openPopup(true)"
                        @clickOutside="() => openPopup(false)"
                        @changeValue="(data) => changeValue(props.row.id, data)"
                />
                <AppSelect 
                    v-else-if="props.item.type == 'select_dropdown'"
                    :item="{
                        id: props.row.id,
                        key: props.item.key,
                        value: props.row[props.item.key],
                        focus: false,
                        required: Boolean(props.item.required),
                        title: props.item.title,
                        options: props.item.options,
                        lockedOptions: []
                    }"
                    :isReadOnly="Boolean(props.item.read_only || !props.row.isEdit)"
                    :isHaveNullOption="true"
                    :isMultiply="Boolean(props.item.is_plural)"
                    :isFiltered="true"
                    @click="() => openPopup(true)"
                    @clickOutside="() => openPopup(false)"
                    @changeValue="(data) => changeValue(props.row.id, data)"
                />
        </div>
    </td>
</template>

<script setup>
    import './Item.scss';
    
    import { inject, ref } from 'vue'

    import AppActions from '../Actions/Actions.vue'
    import FormValue from '@/components/AppForm/FormValue/FormValue.vue'
    import AppCheckbox from "@/components/AppInputs/Checkbox/Checkbox.vue"
    import AppTextarea from "@/components/AppInputs/Textarea/Textarea.vue"
    import AppRelation from "@/components/AppSelects/Relation/Relation.vue"
    import AppStatus from '@/components/AppSelects/Status/Status.vue'
    import AppSelect from '@/components/AppSelects/Select/Select.vue'

    const actionState = inject('actionState')
    const itemRef = ref(null)
    const bodyData = inject('bodyData')
    
    let clickSetting = ref({
        id: -1,
        delay: 500,
        clicks: 0,
        timer: null
    })

    const props = defineProps({
        item: {
            default: {
                id: 2249,
                title: "Файл",
                key: "fail_2249",
                width: "325px",
                enabled: true,
                type: "file",
                is_plural: 0,
                external_link: 1,
                is_external_link: 0,
                is_link: 0,
                required: 0,
                fixed: false,
                index: 7,
                fixTarget: "0px",
                read_only: 0,
                unit: "",
                mask: "",
                can_edit: 0,
                color: "#000",
                is_hidden: 0,
                visible_always: 1,
                options: []
            },
            type: Object
        },
        row: {},
        isTrash: {
            default: false,
            type: Boolean
        },
        slug: {
            default: '',
            type: String
        }
    })

    const emit = defineEmits([
        'callAction'
    ])

    const openPopup = (state) => {
        if (state) {
            itemRef.value.closest('.table__item').classList.add('table__item_clicked')
        } else {
            itemRef.value.closest('.table__item').classList.remove('table__item_clicked')
        }
    }

    // Изменение значения в поле
    const changeValue = (id, data) => {
        let findedRow = bodyData.value.find(row => row.id == id)
        findedRow[data.key] = data.value

        if (data.key == 'isChoose') {
            if (data.value) {
                actionState.value = props.isTrash ? 'restoring' : 'editting'
            } else if (bodyData.value.filter(p => p.isChoose).length == 0) {
                actionState.value = null
            }
        }
    }

    const openLink = (data, slug) => {
        emit('callAction', {
            action: 'showModal',
            value: {
                id: data.id,
                slug: slug
            }
        })
    }

    // Симуляция двойного клика
    const doubleClick = (event) => {
        clickSetting.value.clicks++;
        if (clickSetting.value.clicks === 1) {
            clickSetting.value.timer = setTimeout( () => {
            clickSetting.value.clicks = 0
            }, clickSetting.value.delay);
        } else {
            let regexp = /<\/?[a-z][\s\S]*>/i
            if (!props.row.isEdit && props.item.key != 'actions' && regexp.test(event.target.innerHTML)) {
                openLink(props.row, props.slug)
            }
            window.getSelection().empty();
            clearTimeout(clickSetting.value.timer);  
            clickSetting.value.clicks = 0;
        }   
        clickSetting.value.id = props.item.id
    }
</script>
