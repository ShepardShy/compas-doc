<template>
    <FormItem
        class="form-item__relation" 
        :required="props.item.required"
    >
        <FormLabel
            v-show="props.item.title != null && props.item.title != ''"
            :title="props.item.title"
        />    

        <AppPopup 
            class="relation__popup" 
            :closeByClick="false" 
            ref="popupRef" 
            @click="(event) => props.isReadOnly ? event.preventDefault() : null"
        >
            <template #summary> 
                <slot name="icon"></slot>
                <AppInput
                    :item="{
                        id: 0,
                        key: 'search',
                        value: search,
                        type: 'text',
                        focus: false,
                        placeholder: null,
                        title: null,
                        substring: props.isReadOnly ? null : activeOption.id == null ? ' ' : `ID: ${activeOption.id}`
                    }"
                    :mask="null"
                    :disabled="false"
                    :isReadOnly="props.isReadOnly"
                    :enabledAutocomplete="false"
                    @changeValue="(data) => callACtion({action: 'searchOptions', value: data.value})"
                    @mousedown="(event) => props.isReadOnly ? event.preventDefault() : callACtion({action: 'showContent', value: true})"
                    @keydown.space="(event) => {event.preventDefault(); callACtion({action: 'searchOptions', value: event.target.value + ' '})}"
                />
                <slot name="link"></slot>
                <div class="relation__active-option" v-show="!props.isReadOnly && ([null, undefined].includes(search) || search == '')">
                    {{ activeOption.text }}
                </div>
            </template>
            <template #content>
                <PopupOption @click="() => callACtion({action: 'changeValue', value: null})">
                    Не выбрано
                </PopupOption>
                <PopupOption 
                    class="popup-option__root" 
                    v-for="option in options" 
                    :class="option.value == activeOption.id ? 'popup__option_active' : '', props.item.lockedOptions.includes(option.value) ? 'popup__option_disabled' : ''" 
                    @click="() => callACtion({action: 'changeValue', value: option.value})"
                >
                    <div class="popup-option__text">
                        {{ option.label.text }}
                    </div>

                    <span class="popup-option__substring">
                        ID: {{ option.label.id }}
                    </span>
                </PopupOption>
                <PopupOption v-if="isCanCreate" class="popup__option_create" @click="() => callACtion({action: 'createOption', value: true})">
                    Создать
                </PopupOption>
            </template>
        </AppPopup>
    </FormItem>
</template>

<script setup>
    import './Input.scss';
    
    import { ref, onMounted, watch } from 'vue'

    import AppPopup from '@/components/AppPopup/Popup.vue';
    import AppInput from '@/components/AppInputs/Input/Input.vue';
    import FormItem from '@/components/AppForm/FormItem/FormItem.vue';
    import FormLabel from '@/components/AppForm/FormLabel/FormLabel.vue';
    import PopupOption from '@/components/AppPopup/PopupOption/PopupOption.vue';

    const popupRef = ref(null)
    const nullOption = {
        id: null,
        sort: 0,
        text: "Не выбрано"
    }
    let activeOption = ref(nullOption)
    let search = ref(null)
    let options = ref([])
    let backupOptions = ref([])

    const props = defineProps({
        item: {
            default: {
                id: 0,
                required: false,
                title: 'Autocomlete title',
                value: null,
                placeholder: null,
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
        isCanCreate: {
            default: false,
            type: Boolean
        }
    })

    const emit = defineEmits([
        'changeValue',
        'createOption',
        'searchOptions',
    ])

    // Действия с автокомплитом
    const callACtion = (data) => {
        // Открытие/скрытие всплывающего окна
        const showContent = (state) => {
            if (state) {
                popupRef.value.popupRef.setAttribute('open', true)
            } else {
                popupRef.value.popupRef.removeAttribute('open')
            }
        }

        // Создание опции
        const createOption = () => {
            showContent(false)
            emit('createOption', {
                key: props.item.key,
                value: true
            })
        }

        // Установка выбранной опции
        const setActiveOption = (value) => {
            search.value = ''
            let findedOption = options.value.find(option => option.value == value)
            if ([null, undefined].includes(findedOption)) {
                activeOption.value = nullOption 
            } else {
                activeOption.value = findedOption.label
            }
        }

        // Поиск опций
        const searchOptions = (value) => {
            search.value = value
            emit('searchOptions', {key: props.item.key, value: search.value})
        }

        // Изменить значение поля
        const changeValue = (value) => {
            if (!props.item.lockedOptions.includes(value)) {
                search.value = null
                options.value = backupOptions.value
                setActiveOption(value)
                showContent(false)
                emit('changeValue', {
                    key: props.item.key,
                    value: value
                })
            }
        }

        switch (data.action) {
            // Отображение всплывающего окна
            case 'showContent':
                showContent(data.value)
                break;
        
            // Создание опции
            case 'createOption':
                createOption()
                break;

            // Установка выбранной опции
            case 'setActiveOption':
                setActiveOption(data.value)
                break;

            // Поиск опций
            case 'searchOptions':
                searchOptions(data.value)
                break;

            // Изменить значение поля
            case 'changeValue':
                changeValue(data.value)
                break;

            default:
                break;
        }
    }

    onMounted(() => {
        backupOptions.value = options.value = JSON.parse(JSON.stringify(props.item.options.sort((prev, next) => prev.label.sort - next.label.sort)))
        callACtion({
            action: 'setActiveOption',
            value: props.item.value
        })
    })

    watch(() => props.item.options, () => {
        options.value = props.item.options.sort((prev, next) => prev.label.sort - next.label.sort)
    })
</script>
