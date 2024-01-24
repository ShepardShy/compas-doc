<template>
    <div class="form-item__value form-item__value_multiply" :class="activeOptions == null || activeOptions.length == 0 ? 'form-item__value_empty' : ''" v-if="props.isMultiply && props.isReadOnly">
        <div class="select__active-option-tab" v-for="tab in activeOptions">
            {{ tab.label }}
        </div>
    </div>

    <FormValue 
        v-else-if="props.isReadOnly"
        :value="activeOptions == null || activeOptions.value == null ? null : activeOptions.label"
        :isHTML="false"
        :isLink="false"
    />

    <AppPopup 
        v-else
        class="select__popup" 
        :closeByClick="false" 
        ref="popupRef" 
        :class="props.isMultiply ? 'select__popup_multiply' : ''"
        :isReadOnly="props.isReadOnly"
        @click="(event) => props.isReadOnly ? event.preventDefault() : null"
    >
        <template #summary> 
            <AppInput
                ref="inputRef"
                :item="{
                    id: props.item.id,
                    title: null,
                    type: 'text',
                    focus: false,
                    key: props.item.key,
                    placeholder: null,
                    value: props.isReadOnly ? activeOptions == null ? null : activeOptions.label : search,
                    substring: props.isReadOnly ? null : ' '
                }"
                :isReadOnly="props.isReadOnly"
                :enabledAutocomplete="false"
                @changeValue="(data) => callAction({action: 'searchOptions', value: data.value})"
                @mousedown="(event) => props.isReadOnly ? event.preventDefault() : callAction({action: 'showContent', value: true})"
                @keydown.space="(event) => {event.preventDefault(); callAction({action: 'searchOptions', value: event.target.value + ' '})}"
            > 
                <div class="select__active-option active-option" v-show="!props.isReadOnly && (props.isMultiply || ([null, undefined].includes(search) || search == ''))">
                    <template v-if="props.isMultiply && activeOptions != null">
                        <div class="select__active-option-tab" v-for="tab in activeOptions">
                            {{ tab.label }}

                            <IconDelete 
                                @click="(event) => callAction({action: 'changeValue', value: tab.value, event: event})"
                            />
                        </div>

                        <div class="active-option__mirror">
                            <div class="form-item__mirror">
                                {{ search }}
                            </div>
                            <input 
                                ref="mirrorRef" 
                                type="text" 
                                :value="search"
                                @input="(e) => callAction({action: 'searchOptions', value: e.target.value})"
                            >
                        </div>
                    </template> 
                    <template v-else>
                        {{ activeOptions == null ? nullOption.label : activeOptions.label }}
                    </template>
                </div>
            </AppInput>
        </template>
        <template #content>
            <PopupOption v-show="!props.isMultiply || options.length == 0" @click="() => callAction({action: 'changeValue', value: null})">
                Не выбрано
            </PopupOption>
            <PopupOption 
                class="popup-option__root" 
                v-for="option in options" 
                :class="option.value == activeOptions.value || multiplyValues.includes(option.value) ? 'popup__option_active' : '', ![null, undefined].includes(props.item.lockedOptions) && props.item.lockedOptions.includes(option.value) ? 'popup__option_disabled' : ''" 
                @click="() => callAction({action: 'changeValue', value: option.value})"
            >
                <div class="popup-option__text">
                    {{ option.label }}
                </div>
            </PopupOption>
        </template>
    </AppPopup>
</template>

<script setup>
    import './SelectField.scss';

    import { ref, onMounted, watch } from 'vue'
    
    import AppPopup from '@/components/AppPopup/Popup.vue';
    import AppInput from '@/components/AppInputs/Input/Input.vue';
    import IconDelete from '@/components/AppIcons/Delete/Delete.vue';
    import PopupOption from '@/components/AppPopup/PopupOption/PopupOption.vue';
    import FormValue from '@/components/AppForm/FormValue/FormValue.vue';

    const props = defineProps({
        item: {
            default: {
                id: 0,
                required: false,
                title: 'Select title',
                value: null,
                focus: false,
                key: null,
                options: [],
                lockedOptions: []
            },
            type: Object
        },
        isReadOnly: {
            default: false,
            type: Boolean
        },
        isMultiply: {
            default: false,
            type: Boolean
        },
        isHaveNullOption: {
            default: true,
            type: Boolean
        }
    })
    
    const emit = defineEmits([
        'changeValue',
    ])
    
    const popupRef = ref(null)
    const inputRef = ref(null)
    const mirrorRef = ref(null)
    const nullOption = {
        label: "Не выбрано",
        value: null
    }

    let options = ref([])
    let search = ref(null)
    let backupOptions = ref([])
    let multiplyValues = ref([])
    let activeOptions = ref(null)

    // Действия с автокомплитом
    const callAction = (data) => {
        // Открытие/скрытие всплывающего окна
        const showContent = (state) => {
            if (state) {
                setTimeout(() => {
                    if (props.isMultiply) {
                        mirrorRef.value.focus()
                    } else {
                        inputRef.value.inputRef.inputRef.focus()
                    }
                }, 10);
            } else {
                popupRef.value.popupRef.removeAttribute('open')
            }
        }

        // Получение опций
        const getOptions = () => {
            // Проверка на пустой объект
            const isEmpty = (obj) => {
                for (const prop in obj) {
                    if (Object.hasOwn(obj, prop)) {
                    return false;
                    }
                }
                return true;
            }

            let localOptions = props.item.options == null ? [] : props.item.options.filter(p => p != null && typeof p == 'object' && !Array.isArray(p) && !isEmpty(p)).sort((prev, next) => prev.label.sort - next.label.sort)
            options.value = JSON.parse(JSON.stringify(localOptions))
        }

        // Установка выбранной опции
        const setActiveOptions = (value) => {
            search.value = ''

            // Нахождение выбранной опции
            const findOption = (value) => {
                let findedOption = options.value == null ? null : options.value.find(option => option.value == value)
                if (Array.isArray(value) || [null, undefined].includes(findedOption)) {
                    return nullOption 
                } else {
                    return findedOption
                }
            }

            if (props.isMultiply) {
                let data = []

                for (let item of multiplyValues.value) {
                    data.push(findOption(item))
                }

                activeOptions.value = data.filter(option => option.value != null)
            } else {
                activeOptions.value = findOption(value)
            }
        }

        // Поиск опций
        const searchOptions = (value) => {
            search.value = value
            options.value = backupOptions.value.filter(option => option.label.toLowerCase().includes(search.value.toLowerCase()))
        }

        // Изменить значение поля
        const changeValue = (value, event = null) => {
            if (value == null || (![null, undefined].includes(props.item.lockedOptions) && !props.item.lockedOptions.includes(value))) {
                search.value = null
                options.value = backupOptions.value
                
                if (props.isMultiply) {
                    if (multiplyValues.value.includes(value)) {
                        multiplyValues.value = multiplyValues.value.filter(option => option != value)
                        showContent(true)
                    } else {
                        multiplyValues.value.push(value)
                    }

                    setTimeout(() => {
                        mirrorRef.value.focus()
                    }, 10);

                    emit('changeValue', {
                        key: props.item.key,
                        value: multiplyValues.value
                    })
                } else {
                    showContent(false)

                    emit('changeValue', {
                        key: props.item.key,
                        value: value
                    })
                }

                setActiveOptions(value)

            }
        }

        switch (data.action) {
            // Отображение всплывающего окна
            case 'showContent':
                showContent(data.value)
                break;

            // Установка выбранной опции
            case 'setActiveOptions':
                setActiveOptions(data.value)
                break;

            // Поиск опций
            case 'searchOptions':
                searchOptions(data.value)
                break;

            // Изменить значение поля
            case 'changeValue':
                changeValue(data.value, data.event)
                break;

            // Получение опций
            case 'getOptions': 
                getOptions()
                break;

            default:
                break;
        }
    }

    onMounted(() => {
        callAction({
            action: 'getOptions',
            value: null
        })
        backupOptions.value = JSON.parse(JSON.stringify(options.value))

        if (props.isMultiply) {
            if ([null, undefined].includes(props.item.value) || typeof props.item.value == 'string') {
                multiplyValues.value = []
            } else {
                multiplyValues.value = [...new Set(props.item.value)]
            }
        }

        callAction({
            action: 'setActiveOptions',
            value: props.item.value
        })
    })

    watch(() => props.item.options, () => {
        callAction({
            action: 'getOptions',
            value: null
        })    
    })

    watch(() => props.item.value, () => {
        callAction({
            action: 'getOptions',
            value: null
        })
        callAction({
            action: 'setActiveOptions',
            value: props.item.value
        })
    })
</script>
