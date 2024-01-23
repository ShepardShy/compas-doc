<template>
    <tbody class="table__body">
        <tr class="table__row" v-for="row in bodyData" :class="row.isChoose ? 'table__row_choosed' : row.isEdit ? 'table__row_edit' : ''">
            <td class="table__item" v-for="item in fields"  @click="(event) => doubleClick(event, row, item)" :data-key="item.key" :class="[item.fixed ? 'table__item_fixed' : '', !item.enabled ? 'table__item_hidden' : '']" :style="`--colorItem: ${item.color};`">
                <div class="table-item__content">
                        <AppCheckbox 
                            v-if="item.type == 'checkbox'"
                            :item="{
                                key: item.key,
                                type: item.type,
                                id: row.id,
                                title: item.title,
                                substring: item.unit,
                                value: row[item.key],
                                is_link: item.is_link,
                                is_plural: item.is_plural,
                                hiddenOptions: item.choosed,
                                related_table: item.related_table,
                                is_external_link: item.is_external_link,
                                options: ['status', 'relation'].includes(item.type) ? item.options : null,
                                external_link: row[item.key] != undefined ? row[item.key].external_link : null,
                            }"
                            :isCanCreate="true"
                            :isUseEnter="false"
                            :enabledAutocomplete="false"
                            :isReadOnly="Boolean(item.read_only || !row.isEdit)"
                            :isCanAdd="Boolean(item.is_plural)"
                            @changeValue="(data) => changeValue(row.id, data)"
                        />
                        <AppRelation 
                            v-else-if="item.type == 'relation'"
                            :item="{
                                key: item.key,
                                type: item.type,
                                id: row.id,
                                title: item.title,
                                substring: item.unit,
                                value: row[item.key],
                                is_link: item.is_link,
                                is_plural: item.is_plural,
                                hiddenOptions: item.choosed,
                                related_table: item.related_table,
                                is_external_link: item.is_external_link,
                                options: ['status', 'relation'].includes(item.type) ? item.options : null,
                                external_link: row[item.key] != undefined ? row[item.key].external_link : null,
                            }"
                            :isCanCreate="true"
                            :isUseEnter="false"
                            :enabledAutocomplete="false"
                            :isReadOnly="Boolean(item.read_only || !row.isEdit)"
                            :isCanAdd="Boolean(item.is_plural)"
                            @changeValue="(data) => changeValue(row.id, data)"
                        />
                        <AppTextarea 
                            v-else-if="['number', 'password', 'text'].includes(item.type)"
                            :item="{
                                key: item.key,
                                type: item.type,
                                id: row.id,
                                title: item.title,
                                substring: item.unit,
                                value: [null, undefined].includes(row[item.key]) ? null : String(row[item.key]),
                                is_link: item.is_link,
                                is_plural: item.is_plural,
                                hiddenOptions: item.choosed,
                                related_table: item.related_table,
                                is_external_link: item.is_external_link,
                                options: ['status', 'relation'].includes(item.type) ? item.options : null,
                                external_link: row[item.key] != undefined ? row[item.key].external_link : null,
                            }"
                            :isCanCreate="true"
                            :isUseEnter="false"
                            :enabledAutocomplete="false"
                            :isReadOnly="Boolean(item.read_only || !row.isEdit)"
                            :isCanAdd="Boolean(item.is_plural)"
                            @changeValue="(data) => changeValue(row.id, data)"
                        />
                        <FormValue 
                            v-else-if="item.type == 'json'"
                            :value="row[item.key]"
                            :isHTML="true"
                            :isLink="false"
                        />
                        <AppActions 
                            v-else-if="item.type == 'actions'"
                            :slug="row.isEdit ? 'edit' : 'routes'"
                            @callAction="(data) => emit('callAction', {action: data.value, value: row})"
                        />
                        <AppStatus 
                            v-else-if="item.type == 'status'"
                            :item="{
                                    key: item.key,
                                    type: item.type,
                                    id: row.id,
                                    title: item.title,
                                    substring: item.unit,
                                    value: row[item.key],
                                    is_link: item.is_link,
                                    is_plural: item.is_plural,
                                    hiddenOptions: item.choosed,
                                    related_table: item.related_table,
                                    is_external_link: false,
                                    options: item.options,
                                    external_link: null,
                                }"
                                :isCanCreate="false"
                                :isHaveNullOption="false"
                                :isUseEnter="false"
                                :enabledAutocomplete="false"
                                :isReadOnly="Boolean(item.read_only || !row.isEdit)"
                                :isCanAdd="Boolean(item.is_plural)"
                                @changeValue="(data) => changeValue(row.id, data)"
                        />
                </div>
            </td>
        </tr>
    </tbody>
</template>

<script setup>
    import './Body.scss';
    
    import { inject, ref } from 'vue'

    import AppActions from './Actions/Actions.vue'
    import FormValue from '@/components/AppForm/FormValue/FormValue.vue'
    import AppCheckbox from "@/components/AppInputs/Checkbox/Checkbox.vue"
    import AppTextarea from "@/components/AppInputs/Textarea/Textarea.vue"
    import AppRelation from "@/components/AppSelects/Relation/Relation.vue"
    import AppStatus from '@/components/AppSelects/Status/Status.vue'

    const fields = inject('fields')
    const bodyData = inject('bodyData')

    let clickSetting = ref({
        id: -1,
        delay: 500,
        clicks: 0,
        timer: null
    })

    const emit = defineEmits([
        'callAction'
    ])

    // Изменение значения в поле
    const changeValue = (id, data) => {
        let findedRow = bodyData.value.find(row => row.id == id)

        findedRow[data.key] = data.value
        findedRow.isEdit = true
    }

    // Симуляция двойного клика
    const doubleClick = (event, row, item) => {
        clickSetting.value.clicks++;
        if (clickSetting.value.clicks === 1) {
            clickSetting.value.timer = setTimeout( () => {
            clickSetting.value.clicks = 0
            }, clickSetting.value.delay);
        } else {
            let regexp = /<\/?[a-z][\s\S]*>/i
            if (!row.isEdit && item.key != 'actions' && regexp.test(event.target.innerHTML)) {
                emit('callAction', {action: 'showModal', value: row})
            }
            window.getSelection().empty();
            clearTimeout(clickSetting.value.timer);  
            clickSetting.value.clicks = 0;
        }   
        clickSetting.value.id = item.id
    } 
</script>
