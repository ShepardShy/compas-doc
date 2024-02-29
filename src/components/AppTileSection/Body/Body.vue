<template>
    <div class="tile-section__body">
        <div class="tile-section__item" v-for="field of section.fields">
            <IconDrag />

            <AppCheckbox 
                    v-if="field.type == 'checkbox'"
                    :item="{
                        isHTML: false,
                        id: field.id,
                        key: field.key,
                        title: field.title,
                        value: field.value,
                        required: Boolean(field.required)
                    }"
                    :disabled="actionState == 'saving'"
                    @changeValue="(data) => changeValue(field.id, data)"
                />

            <AppRelation 
                v-else-if="field.type == 'relation'"
                :item="{
                    focus: false,
                    id: field.id,
                    placeholder: null,
                    key: field.key,
                    title: field.title,
                    value: field.value,
                    required: Boolean(field.required),
                    options: ['status', 'relation'].includes(field.type) ? field.options : null,
                    lockedOptions: field.choosed,
                }"
                :isCanCreate="true"
                :isMultiple="Boolean(field.is_plural)"
                :isReadOnly="Boolean(!field.isEdit)"
                @changeValue="(data) => changeValue(field.id, data)"
                @openLink="(data) => callAction({action: 'openLink', value: {id: data.id, slug: field.related_table}})"
                @showAll="() => callAction({action: 'openLink', value: {id: field.id, slug: props.slug, tab: field.related_table}})"
                @createOption="() => emit('callAction', {action: 'createOption', value: field.related_table})"
            />
            <AppTextarea 
                v-else-if="['number', 'password', 'text'].includes(field.type)"
                :item="{
                    focus: false,
                    id: field.id,
                    placeholder: null,
                    key: field.key,
                    type: field.type,
                    title: field.title,
                    substring: field.unit,
                    required: Boolean(field.required),
                    external_link: ![null, undefined].includes(field.value) && field.value != '' ? field.value.external_link : null,
                    value: [null, undefined].includes(field.value) ? null : typeof field.value == 'object' ? String(field.value.value) : String(field.value),
                }"
                :disabled="false"
                :isUseEnter="false"
                :mask="field.mask"
                :isLink="Boolean(field.is_external_link)"
                :isReadOnly="Boolean(!field.isEdit)"
                @changeValue="(data) => changeValue(field.id, data)"
            />
            <AppStatus 
                v-else-if="field.type == 'status'"
                :item="{
                    focus: false,
                    id: field.id,
                    key: field.key,
                    title: field.title,
                    options: field.options,
                    value: field.value,
                    required: Boolean(field.required),
                }"
                :isCanCreate="false"
                :isHaveNullOption="false"
                :isReadOnly="Boolean(!field.isEdit)"
                @changeValue="(data) => changeValue(field.id, data)"
            />
            <AppSelect 
                v-else-if="field.type == 'select_dropdown'"
                :item="{
                    id: field.id,
                    key: field.key,
                    value: field.value,
                    focus: false,
                    required: Boolean(field.required),
                    title: field.title,
                    options: field.options,
                    lockedOptions: []
                }"
                :isReadOnly="Boolean(!field.isEdit)"
                :isHaveNullOption="true"
                :isMultiple="Boolean(field.is_plural)"
                :isFiltered="true"
                @changeValue="(data) => changeValue(field.id, data)"
            />
            <AppFile 
                v-else-if="field.type == 'file'"
                :item="{
                    id: field.id,
                    title: field.title,
                    key: field.key,
                    required: Boolean(field.required),
                    buttonName: null,
                    value: field.value
                }"
                :isReadOnly="true"
                :isShowFileName="false"
                :isMultiple="false"
                :isOneFile="true"
                @changeValue="(data) => changeValue(field.id, data)"
            />
            <AppDate 
                v-else-if="field.type == 'date'"
                :item="{
                    id: field.id,
                    required: true,
                    title: field.title,
                    placeholder: null,
                    value: field.value,
                    key: field.key,
                    focus: false
                }"
                :isMultiple="Boolean(field.is_plural)"
                :isReadOnly="Boolean(!field.isEdit)"
                @changeValue="(data) => changeValue(data)"
            />

            <AppInputGroup 
                v-if="field.type == 'text_group'"
                :item="{
                    id: field.id,
                    required: Boolean(field.required),
                    substring: field.id,
                    type: 'text',
                    title: field.title,
                    placeholder: null,
                    value: null,
                    key: field.key,
                    focus: false,
                    subfields: field.subfields
                }"
                :isReadOnly="Boolean(!field.isEdit)"
                @changeValue="(data) => changeValue(data)"
            />

            <AppPopup class="tile-section__settings" :closeByClick="true">
                <template #summary>
                    <IconSettings />
                </template>
                <template #content>
                    <PopupOption>
                        Настроить
                    </PopupOption>
                    <PopupOption>
                        <AppCheckbox 
                            :item="{
                                id: 0,
                                value: true,
                                isHTML: false,
                                required: false,
                                title: 'Показывать всегда',
                                key: 'visible_always'
                            }"
                        />
                    </PopupOption>
                    <PopupOption>
                        Скрыть
                    </PopupOption>
                    <PopupOption class="popup__option_red">
                        Удалить
                    </PopupOption>
                </template>
            </AppPopup>
        </div>
    </div>
</template>

<script setup>
    import './Body.scss';
    
    import AppPopup from '@/components/AppPopup/Popup.vue';
    import IconDrag from '@/components/AppIcons/Drag/Drag.vue';
    import IconSettings from '@/components/AppIcons/Settings/Settings.vue';
    import PopupOption from '@/components/AppPopup/PopupOption/PopupOption.vue';

    import AppDate from '@/components/AppInputs/Date/Date.vue'
    import AppFile from '@/components/AppInputs/File/File.vue'
    import AppStatus from '@/components/AppSelects/Status/Status.vue'
    import AppSelect from '@/components/AppSelects/Select/Select.vue'
    import AppCheckbox from "@/components/AppInputs/Checkbox/Checkbox.vue"
    import AppTextarea from "@/components/AppInputs/Textarea/Textarea.vue"
    import AppRelation from "@/components/AppSelects/Relation/Relation.vue"
    import AppInputGroup from '@/components/AppInputs/InputGroup/InputGroup.vue';

    import { inject } from 'vue';
    const section = inject('section')

    const props = defineProps({
        slug: {
            default: null,
            type: String
        }
    })

    const emit = defineEmits([
        'callAction'
    ])
</script>
