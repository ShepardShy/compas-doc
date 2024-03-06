<template>
    <AppWarning class="warning_settings" @closeModal="() => showWarning(false)" :isShow="isShow.state">
        <template #title>
            Создание поля
        </template>

        <template #body>
            <div class="warning__list warning-list">
                <AppSelect 
                    class="warning-list__field"
                    :item="{
                        id: 0,
                        key: 'type',
                        value: edittingField.type,
                        focus: false,
                        required: false,
                        title: 'Тип поля',
                        lockedOptions: [],
                        options: SettingsOptions.types
                    }"
                    :isReadOnly="false"
                    :isHaveNullOption="false"
                    :isMultiple="false"
                    :isFiltered="true"
                    @changeValue="(data) => changeValue(data)"
                />

                <AppSelect 
                    class="warning-list__field"
                    :item="{
                        id: 1,
                        key: 'section_id',
                        value: edittingField.section_id,
                        focus: false,
                        required: false,
                        title: 'Раздел',
                        lockedOptions: [],
                        options: sections
                    }"
                    :isReadOnly="false"
                    :isHaveNullOption="false"
                    :isMultiple="false"
                    :isFiltered="true"
                    @changeValue="(data) => changeValue(data)"
                />

                <AppInput 
                    class="warning-list__field"
                    :item="{
                        id: 2,
                        required: true,
                        substring: null,
                        type: 'text',
                        title: 'Название поля',
                        placeholder: null,
                        value: edittingField.title,
                        key: 'title',
                        focus: false
                    }"
                    :isReadOnly="false"
                    :mask="null"
                    :disabled="false"
                    :enabledAutocomplete="false"
                    @changeValue="(data) => changeValue(data)"
                />

                <AppInput 
                    v-show="edittingField.type == 'number'"
                    class="warning-list__field"
                    :item="{
                        id: 3,
                        required: false,
                        substring: null,
                        type: 'text',
                        title: 'Единица измерения',
                        placeholder: null,
                        value: edittingField.unit,
                        key: 'unit',
                        focus: false
                    }"
                    :isReadOnly="false"
                    :mask="null"
                    :disabled="false"
                    :enabledAutocomplete="false"
                    @changeValue="(data) => changeValue(data)"
                />
            </div>

            <div class="warning__list warning-list warning__list_other" v-if="edittingField.type == 'file'">
                <AppInput 
                    class="warning-list__field"
                    :item="{
                        id: 3,
                        required: false,
                        substring: null,
                        type: 'text',
                        title: 'Название кнопки',
                        placeholder: null,
                        value: edittingField.button_name,
                        key: 'button_name',
                        focus: false
                    }"
                    :isReadOnly="false"
                    :mask="null"
                    :disabled="false"
                    :enabledAutocomplete="false"
                    @changeValue="(data) => changeValue(data)"
                />
            </div>
            
            <div class="warning__list warning-list warning__list_other warning__list_options" v-else-if="['text_group', 'select_dropdown'].includes(edittingField.type)">
                <div class="warning-list__subtitle">
                    Сохраненные элементы
                </div>
                <div class="warning-list__field" v-for="(field, index) in edittingField.options">
                    <AppInput 
                        :item="{
                            id: index,
                            required: false,
                            substring: null,
                            type: 'text',
                            title: null,
                            placeholder: null,
                            value: field.label,
                            key: 'optionsSelect',
                            focus: false
                        }"
                        :isReadOnly="false"
                        :mask="null"
                        :disabled="false"
                        :enabledAutocomplete="false"
                        @changeValue="(data) => changeValue({
                            id: index,
                            key: data.key,
                            value: data.value
                        })"
                    />
                    <IconDelete 
                        @click="changeValue({
                            key: 'optionDelete',
                            id: index
                        })"
                    />
                </div>

                <div class="warning__list-empty" v-show="edittingField.options.length == 0">
                    Пусто
                </div>

                <ButtonText 
                    @click="changeValue({ key: 'addOptionSelect' })"
                >
                    Добавить
                </ButtonText>
            </div>

            <div class="warning__list warning-list warning__list_other warning__list_settigns-statuses warning__list_options" v-else-if="['status'].includes(edittingField.type)">
                <div class="warning-list__subtitle">
                    Сохраненные элементы
                </div>
                <div class="warning-list__field" v-for="(field, index) in edittingField.options">
                    <div class="settings-status">
                        <AppPopup class="settings-status__popup">
                            <template #summary> 
                                <div class="settings-status__summary" :style="`--statusColor: ${field.label.color};`">
                                    <IconPipette />
                                </div>
                            </template>
                            <template #content>
                                <PopupOption class="popup__option_unhover">
                                    <AppColorpicker 
                                        :color="field.label.color"
                                        @changeColor="(data) => changeValue({
                                            key: 'optionsColor',
                                            id: index,
                                            value: data.cssColor
                                        })"
                                    />
                                </PopupOption>
                            </template>
                        </AppPopup>

                        <AppFile 
                            :item="{
                                id: 0,
                                title: '',
                                key: 'optionsIcon',
                                required: false,
                                buttonName: null,
                                value: [field.label]
                            }"
                            :isReadOnly="false"
                            :isShowFileName="false"
                            :isMultiple="false"
                            :isOneFile="false"
                            :isIcon="true"
                            @changeValue="(data) => changeValue({
                                key: 'optionsIcon',
                                id: index,
                                value: data.value[1]
                            })"
                        />
                        <AppInput 
                            :item="{
                                id: index,
                                required: false,
                                substring: null,
                                type: 'text',
                                title: null,
                                placeholder: null,
                                value: field.label.text,
                                key: 'optionsTitle',
                                focus: false
                            }"
                            :isReadOnly="false"
                            :mask="null"
                            :disabled="false"
                            :enabledAutocomplete="false"
                            @changeValue="(data) => changeValue({
                                id: index,
                                key: 'optionsTitle',
                                value: data.value
                            })"
                        />
                    </div>
                    <IconDelete 
                        @click="changeValue({
                            key: 'optionDelete',
                            id: index
                        })"
                    />
                </div>

                <div class="warning__list-empty" v-show="edittingField.options.length == 0">
                    Пусто
                </div>

                <ButtonText @click="changeValue({ key: 'addOptionStatus' })">
                    Добавить
                </ButtonText>
            </div>

            <div class="warning__list warning__list_checkboxes">
                <AppCheckbox 
                    v-if="['text', 'select_dropdown'].includes(edittingField.type)"
                    :item="{
                        id: 5,
                        value: edittingField.is_plural,
                        isHTML: false,
                        required: false,
                        title: 'Множественное',
                        key: 'is_plural'
                    }"
                    :disabled="false"
                    @changeValue="(data) => changeValue(data)"
                />
                <AppCheckbox 
                    :item="{
                        id: 5,
                        value: edittingField.required,
                        isHTML: false,
                        required: false,
                        title: 'Обязательное поле',
                        key: 'required'
                    }"
                    :disabled="false"
                    @changeValue="(data) => changeValue(data)"
                />
                <AppCheckbox 
                    :item="{
                        id: 5,
                        value: edittingField.visible_always,
                        isHTML: false,
                        required: false,
                        title: 'Показывать всегда',
                        key: 'visible_always'
                    }"
                    :disabled="false"
                    @changeValue="(data) => changeValue(data)"
                />
                <AppCheckbox
                    v-if="['text'].includes(edittingField.type)"
                    :item="{
                        id: 5,
                        value: edittingField.is_external_link,
                        isHTML: false,
                        required: false,
                        title: 'Внешняя ссылка',
                        key: 'is_external_link'
                    }"
                    :disabled="false"
                    @changeValue="(data) => changeValue(data)"
                />

                <div class="warning-list__group-field">
                    <AppCheckbox
                        :item="{
                            id: 6,
                            value: edittingField.has_roles_read,
                            isHTML: false,
                            required: false,
                            title: 'Ограничить видимость поля',
                            key: 'has_roles_read'
                        }"
                        :disabled="false"
                        @changeValue="(data) => changeValue(data)"
                    />
                    <AppSelect 
                        v-if="edittingField.has_roles_read"
                        class="warning-list__field"
                        :item="{
                            id: 1,
                            key: 'roles_read',
                            value: edittingField.roles_read,
                            focus: false,
                            required: false,
                            title: 'Роли',
                            lockedOptions: [],
                            options: SettingsOptions.roles
                        }"
                        :isReadOnly="false"
                        :isHaveNullOption="false"
                        :isMultiple="true"
                        :isFiltered="true"
                        @changeValue="(data) => changeValue(data)"
                    />

                </div>

                <div class="warning-list__group-field">
                    <AppCheckbox
                        :item="{
                            id: 6,
                            value: edittingField.has_roles_write,
                            isHTML: false,
                            required: false,
                            title: 'Ограничить редактирование поля',
                            key: 'has_roles_write'
                        }"
                        :disabled="false"
                        @changeValue="(data) => changeValue(data)"
                    />
                    <AppSelect 
                        v-if="edittingField.has_roles_write"
                        class="warning-list__field"
                        :item="{
                            id: 1,
                            key: 'roles_write',
                            value: edittingField.roles_write,
                            focus: false,
                            required: false,
                            title: 'Роли',
                            lockedOptions: [],
                            options: SettingsOptions.roles
                        }"
                        :isReadOnly="false"
                        :isHaveNullOption="false"
                        :isMultiple="true"
                        :isFiltered="true"
                        @changeValue="(data) => changeValue(data)"
                    />
                </div>

                <AppCheckbox
                    v-if="edittingField.type == 'file'"
                    :item="{
                        id: 6,
                        value: edittingField.show_file_name,
                        isHTML: false,
                        required: false,
                        title: 'Показывать название файлов',
                        key: 'show_file_name'
                    }"
                    :disabled="false"
                    @changeValue="(data) => changeValue(data)"
                />
                
                <AppPopup class="settings__popup" v-if="['text', 'number'].includes(edittingField.type)">
                    <template #summary> 
                        <AppCheckbox
                            :item="{
                                id: 6,
                                value: edittingField.set_color,
                                isHTML: false,
                                required: false,
                                title: 'Выбрать цвет',
                                key: 'set_color'
                            }"
                            :disabled="false"
                            :style="`--textColor: ${edittingField.color};`"
                            @changeValue="(data) => changeValue(data)"
                        />
                    </template>
                    <template #content>
                        <PopupOption class="popup__option_unhover">
                            <AppColorpicker 
                                :color="edittingField.color"
                                @changeColor="(data) => changeValue({
                                    key: 'color',
                                    value: data.cssColor
                                })"
                            />
                        </PopupOption>
                    </template>
                </AppPopup>
            </div>

            <div class="warning__actions">
                <AppButton class="button_blue" @click="() => createField()">
                    Сохранить
                </AppButton>
                <AppButton @click="() => showWarning(false)">
                    Отмена
                </AppButton>
            </div>
        </template>
    </AppWarning>
</template>

<script setup>
    import './Create.scss';
    
    import { inject } from 'vue'

    import SettingsOptions from './Create.json'
    import ButtonText from '@/components/AppButton/ButtonText/ButtonText.vue';
    import AppInput from '@/components/AppInputs/Input/Input.vue';
    import AppSelect from '@/components/AppSelects/Select/Select.vue';
    import AppButton from '@/components/AppButton/AppButton.vue';
    import AppWarning from '@/components/AppWarning/AppWarning.vue';
    import IconDelete from '@/components/AppIcons/Delete/Delete.vue';
    import AppColorpicker from '@/components/AppColorPicker/ColorPicker.vue';
    import AppFile from '@/components/AppInputs/File/File.vue';
    import AppPopup from '@/components/AppPopup/Popup.vue';
    import IconPipette from '@/components/AppIcons/Pipette/Pipette.vue';
    import PopupOption from '@/components/AppPopup/PopupOption/PopupOption.vue';
    import AppCheckbox from '@/components/AppInputs/Checkbox/Checkbox.vue';

    const isShow = inject('isShow')
    const sections = inject('sections')
    const edittingField = inject('edittingField')
    
    const emit = defineEmits([
        'callAction'
    ])

    // Показать окно предупреждения
    const showWarning = (state) => {
        isShow.value.state = state
    }    

    // Изменение значения
    const changeValue = (data) => {
        switch (data.key) {
            // Изменение цвета у опции статуса
            case "optionsColor":
                edittingField.value.options[data.id].label.color = data.value
                break;
                
            // Изменение иконки у опции статуса
            case "optionsIcon":
                edittingField.value.options[data.id].label.file = [null, undefined].includes(data.value) ? null : data.value.url
                break;
                
            // Изменение заголовка у опции статуса
            case "optionsTitle":
                edittingField.value.options[data.id].label.text = data.value
                break;
                
            // Удаление опции
            case "optionDelete":
                edittingField.value.options.splice(data.id, 1);
                break;
                
            // Изменение заголовка в опциях селекта
            case "optionsSelect":
                edittingField.value.options[data.id].label = data.value
                break;
                
            // Добавление опции в селект
            case "addOptionSelect":
                edittingField.value.options.push({
                    is_new: true,
                    value: null,
                    label: null
                })
                break;
                
            // Добавление опции в статус
            case "addOptionStatus":
                edittingField.value.options.push({
                    label: {
                        id: null,
                        file: null,
                        is_hidden: 0,
                        color: '#b6b6b6',
                        text: null
                    },
                    value: null,
                    is_new: true
                })
                break;

            case "type":
                edittingField.value[data.key] = data.value

                if (edittingField.value.type == 'status') {
                    edittingField.value.options = [
                        {
                            label: {
                                id: null,
                                file: null,
                                is_hidden: 0,
                                color: '#b6b6b6',
                                text: null
                            },
                            value: null,
                            is_new: true
                        },
                        {
                            label: {
                                id: null,
                                file: null,
                                is_hidden: 0,
                                color: '#b6b6b6',
                                text: null
                            },
                            value: null,
                            is_new: true
                        },
                        {
                            label: {
                                id: null,
                                file: null,
                                is_hidden: 0,
                                color: '#b6b6b6',
                                text: null
                            },
                            value: null,
                            is_new: true
                        }
                    ]
                } else if (['text_group', 'select_dropdown'].includes(edittingField.value.type)) {
                    edittingField.value.options =  [
                        {
                            is_new: true,
                            label: null,
                            value: null
                        },
                        {
                            is_new: true,
                            label: null,
                            value: null
                        },
                        {
                            is_new: true,
                            label: null,
                            value: null
                        }
                    ]
                } else {
                    edittingField.value.options = []
                }
                
                break;
                
            default:
                edittingField.value[data.key] = data.value
                break;
        }
    }

    // Создание поля
    const createField = () => {
        emit('callAction', {
            action: 'createField',
            value: edittingField.value
        })
    }
</script>
