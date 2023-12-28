<template>
    <AppPopup 
        class="status__popup" 
        :class="colorPicker.state ? 'status__popup_colorpicker' : ''" 
        :closeByClick="false" ref="popupRef" 
        @clickOutside="() => callActionColorPicker({action: 'toggleColorPicker', data: false})"
        @click="(event) => props.isReadOnly ? event.preventDefault() : null"
    >
        <template #summary> 
            <StatusOption 
                class="status__preview"
                :option="activeOption"
            />
        </template>
        <template #content>
            <PopupOption v-show="props.isHaveNullOption" @click="() => changeValue(null)">
                Не выбрано
            </PopupOption>

            <PopupOption v-show="!colorPicker.state" v-for="option in visibileOptions" @click="() => changeValue(option)">
                <StatusOption 
                    :option="option.label"
                />
            </PopupOption>

            <PopupOption 
                v-if="props.isCanCreate"
                class="popup__option-sublink" 
                :class="colorPicker.state ? 'popup__option-sublink_back' : ''"
                @click="() => callActionColorPicker({action: 'toggleColorPicker', data: !colorPicker.state})" 
            >
                Палитра цветов <IconArrow />
            </PopupOption>

            <PopupOption class="popup__option_unhover" v-if="colorPicker.state">
                <ColorPicker 
                    :color="colorPicker.color"
                    @changeColor="(color) => callActionColorPicker({action: 'changeColor', data: color})"
                    @saveHiddenColor="(color) => callActionColorPicker({action: 'saveHiddenColor', data: color})"
                />
            </PopupOption>
        </template>
    </AppPopup>
</template>

<script setup>
    import './StatusField.scss';

    import { ref, onMounted } from 'vue'

    import elementsDOM from '@/scripts/elementsDOM'
    import AppPopup from '@/components/AppPopup/Popup.vue';
    import StatusOption from '../StatusOption/StatusOption.vue';
    import IconArrow from '@/components/AppIcons/Arrow/Arrow.vue';
    import ColorPicker from '@/components/AppColorPicker/ColorPicker.vue';
    import PopupOption from '@/components/AppPopup/PopupOption/PopupOption.vue';
    
    const popupRef = ref(null)

    let colorPicker = ref({
        state: false,
        color: '#b6b6b6'
    })

    let options = ref([])
    let activeOption = ref(null)
    let visibileOptions = ref([])

    const props = defineProps({
        item: {
            default: {
                id: 0,
                key: '',
                value: '',
                focus: false,
                required: false,
                title: "Undefined title",
                options: [{
                    label: {
                        id: 0,
                        sort: 0,
                        file: null,
                        is_hidden: 0,
                        field_id: null,
                        color: "#000",
                        text: "",
                    },
                    value: 0
                }],
            },
            type: Object
        },
        isCanCreate: {
            default: false,
            type: Boolean
        },
        isReadOnly: {
            default: false,
            type: Boolean
        },
        isHaveNullOption: {
            default: false,
            type: Boolean
        }
    })

    const emit = defineEmits([
        'changeValue',
    ])

    // Действия с колорпикером
    const callActionColorPicker = (data) => {
        // Смена цвета
        const changeColor = (color) => {
            colorPicker.value.color = color.cssColor
        }

        // Смена отображения палитры
        const toggleColorPicker = (state) => {
            colorPicker.value.state = state
        }

        // Сохранение нового скрытого цвета
        const saveHiddenColor = () => {
            // Создание скрытой опции
            const createHiddenOption = () => {
                let dinamycId = new Date().getTime()
                let hiddenOption = {
                    label: {
                        id: dinamycId,
                        sort: 0,
                        file: null,
                        is_hidden: 1,
                        field_id: props.item.id,
                        color: colorPicker.value.color,
                        text: null
                    },
                    is_new: true,
                    value: dinamycId
                }

                options.value.push(hiddenOption)
                activeOption.value = hiddenOption.label

                getHiddenOption()
            }
                
            // Отправка созданной скрытой опции на сервер
            const getHiddenOption = () => {
                console.log('Создание нового скрытого цвета', {
                    key: props.item.key,
                    field_id: props.item.id,
                    color: colorPicker.value.color,
                });

                setTimeout(() => {
                    let response = {
                        label: {
                            id: 15,
                            sort: 0,
                            file: null,
                            is_hidden: 1,
                            field_id: 1,
                            color: colorPicker.value.color,
                            text: null
                        },
                        value: 15
                    }

                    options.value = options.value.filter(option => !option.is_new)
                    options.value.push(response)
                    activeOption.value = response.label
                    emit('changeValue', {key: props.item.key, value: response.value})
                }, 3000);
            }

            createHiddenOption()
            toggleColorPicker(false)
            elementsDOM.hideDetails(popupRef.value.popupRef)
        }

        switch (data.action) {
            // Смена цвета
            case 'changeColor':
                changeColor(data.data)
                break;

            // Смена отображения палитры
            case 'toggleColorPicker':
                toggleColorPicker(data.data)
                break;

            // Сохранение нового скрытого цвета
            case 'saveHiddenColor':
                saveHiddenColor()
                break;
            default:
                break;
        }
    }

    // Изменение значения
    const changeValue = (option) => {
        activeOption.value = option == null ? null : option.label
        elementsDOM.hideDetails(popupRef.value.popupRef)
        emit('changeValue', {key: props.item.key, value:  option == null ? null : option.value})
    }

    onMounted(() => {
        // Установка активной опции
        const setActiveOption = () => {
            let findedOption = options.value.find((option) => option.value == props.item.value)

            if ([null, undefined].includes(findedOption)) {
                if (options.value.length == 0) {
                    activeOption.value = null
                } else {
                    activeOption.value = options.value[0].label
                }
            } else {
                activeOption.value = findedOption.label
            }
        }

        options.value = props.item.options.filter((option) => option.label.is_hidden == 0 || option.label.field_id == props.item.id)
        visibileOptions.value =options.value.filter((option) => option.label.is_hidden != 1)

        setActiveOption()

        if (props.item.focus) {
            popupRef.value.popupRef.setAttribute('open', true)
        }
    })
</script>
