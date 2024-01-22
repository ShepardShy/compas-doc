<template>
    <div class="table-template__header table-top">
        <AppPopup v-show="menu.saves.isShow" class="table-top__item" ref="popupSavesRef" :closeByClick="false" @clickOutside="() => callAction({action: 'changeSaveTab', value: null})">
            <template #summary>
                <IconSave />
            </template>
            <template #content>
                <template v-if="menu.saves.activeTab != null && menu.saves.activeTab.tab == 'roles'">
                    <PopupOption class="popup__option-sublink popup__option-sublink_back" @click="() => callAction({action: 'changeSaveTab', value: null})">
                        <IconArrow />
                        
                        {{ menu.saves.activeTab.title }}
                    </PopupOption>
                    <PopupOption v-for="option in menu.saves.options" @click="() => callAction({action: 'changeSaveTab', value: option})">
                        {{ option.title }}
                    </PopupOption>
                </template>
                <template v-else>
                    <PopupOption :class="option.tab == 'roles' ? 'popup__option-sublink': ''" v-for="option in menu.saves.tabs" @click="() => callAction({action: 'changeSaveTab', value: option})">
                        {{ option.title }}
                        <IconArrow v-show="option.tab == 'roles'"/>
                    </PopupOption>
                </template>
            </template>
        </AppPopup>
        <AppPopup class="table-top__item" :closeByClick="true">
            <template #summary>
                <IconDots />
            </template>
            <template #content>
                <PopupOption>
                    Скачать Excel
                </PopupOption>
            </template>
        </AppPopup>
        <AppPopup class="table-top__item" :closeByClick="false" @clickOutside="() => callAction({action: 'changeTab', value: null})">
            <template #summary>
                <IconSettings />
            </template>
            <template #content>
                <template v-if="menu.activeTab == null">
                    <PopupOption class="popup__option-sublink" v-for="tab in menu.tabs" @click="() => callAction({action: 'changeTab', value: tab})">
                        {{ tab.title }} 

                        <IconArrow />
                    </PopupOption>
                </template>
                <template v-else>
                    <PopupOption class="popup__option-sublink popup__option-sublink_back" @click="() => callAction({action: 'changeTab', value: null})">
                        <IconArrow />
                        
                        {{ menu.activeTab.title }}
                    </PopupOption>

                    <template v-if="menu.activeTab.tab == 'order'">
                        <draggable 
                            ref="draggableRef"
                            class="popup-option__draggable"
                            group="table-top__item" 
                            itemKey="table-top__item"
                            v-model="fields" 
                            handle=".icon__draggable"
                            @end="(event) => callAction({action: 'dragEnd', value: event})" 
                            @start="(event) => callAction({action: 'dragStart', value: event})" 
                        >
                            <template #item="{ element: option }">
                                <PopupOption class="popup__option-sublink" v-show="option.enabled">
                                    <IconDrag /> 
                                    {{ option.title }}
                                </PopupOption>
                            </template>
                        </draggable>
                    </template>
                    <template v-else>
                        <PopupOption class="popup__option_checkbox" v-for="option in menu.activeTab.tab == 'enabled' ? fields : fields.filter(p => p.enabled)">
                            <AppCheckbox 
                                :item="{
                                    id: option.id,
                                    title: option.title,
                                    type: 'checkbox',
                                    disabled: false, 
                                    value: menu.activeTab.tab == 'enabled' ? option.enabled : option.fixed,
                                    options:  null,
                                    key: option.key                           
                                }"
                                @changeValue="(data) => callAction({action: 'changeValue', value: data})"
                            />                            
                        </PopupOption>
                    </template>
                </template>
            </template>
        </AppPopup>
    </div>
</template>

<script setup>
    import './Top.scss';
    
    import { ref, inject } from 'vue'

    import IconDots from '@/components/AppIcons/Dots/Dots.vue'
    import IconDrag from '@/components/AppIcons/Drag/Drag.vue'
    import IconSave from '@/components/AppIcons/Save/Save.vue'
    import IconArrow from '@/components/AppIcons/Arrow/Arrow.vue'
    
    import draggable from 'vuedraggable'
    import AppPopup from '@/components/AppPopup/Popup.vue';
    import IconSettings from '@/components/AppIcons/Settings/Settings.vue'
    import AppCheckbox from '@/components/AppInputs/Checkbox/Checkbox.vue';
    import PopupOption from '@/components/AppPopup/PopupOption/PopupOption.vue';
    
    const draggableRef = ref(null)
    const popupSavesRef = ref(null)
    
    const menu = inject('menu')
    const fields = inject('fields')

    const emit = defineEmits([
        'saveFields'
    ])

    // Действия с шапкой
    const callAction = (data) => {
        // Смена активной вкладки
        const changeTab = (tab) => {
            setTimeout(() => {
                menu.value.activeTab = tab
            }, 10);
        }

        // Изменение значений опций
        const changeValue = (data) => {
            let findedOption = fields.value.find(option => option.key == data.key)
            findedOption[menu.value.activeTab.tab] = data.value
            showSaves(true)
        }

        // Начало перетаскивания опции
        const dragStart = () => {
            draggableRef.value.targetDomElement.classList.add("popup-option__draggable_dragging")
        }

        // Конец перетаскивания опции
        const dragEnd = (value) => {
            fields.value = value.to.__draggable_component__.modelValue
            showSaves(true)
        }

        // Изменение активной вкладки у сохранения
        const changeSaveTab = (tab) => {
            setTimeout(() => {
                menu.value.saves.activeTab = tab

                if (tab != null && tab.key != 'roles') {
                    showSaves(false)
                    emit('saveFields', tab.key)
                    popupSavesRef.value.popupRef.removeAttribute('open')
                }
            }, 10);
        }

        // Открытие/скрытие окна сохранения
        const showSaves = (state) => {
            menu.value.saves.isShow = state
        }

        switch (data.action) {
            // Смена активной вкладки
            case "changeTab":
                changeTab(data.value)
                break;

                // Конец перетаскивания опции
            case "dragStart":
                dragStart()
                break;

                // Начало перетаскивания опции
            case "dragEnd":
                dragEnd(data.value)
                break;

            // Изменение значений опций
            case "changeValue":
                changeValue(data.value)
                break;

            // Изменение активной вкладки у сохранения
            case "changeSaveTab":
                changeSaveTab(data.value)
                break;

            // Открытие/скрытие окна сохранения
            case "showSaves":
                showSaves(data.value)
                break;
            default:
                break;
        }
    }
</script>
