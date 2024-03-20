<template>
    <div class="tabs">
        <div class="tabs__list">
            <template v-for="tab in tabs.filter(p => p.enabled)">
                <AppPopup 
                    v-if="tab.childs != undefined"
                    class="popup__tabs" 
                    :closeByClick="true" 
                    :class="tab.childs.find(p => p.alias == activeTab) != undefined ? 'tabs__item_active' : ''" 
                >
                    <template #summary>
                        <div class="tabs__item">
                            <IconTriangle />
                            {{ tab.title }}
                        </div>
                    </template>
                    <template #content>
                        <PopupOption 
                            v-for="child in tab.childs" 
                            :class="child.alias == activeTab ? 'popup__option_active' : ''" 
                            @click="() => callAction({action: 'changeTab', value: child.alias})"
                        >
                            {{ child.title }}
                        </PopupOption>
                    </template>
                </AppPopup>
                <div 
                    v-else 
                    class="tabs__item" 
                    :class="activeTab == tab.tab ? 'tabs__item_active' : ''"
                    @click="() => callAction({action: 'changeTab', value: tab.tab})"
                >
                    {{ tab.title }}
                </div>
            </template>
        </div>
        
        <div class="tabs__actions">
            <PopupSave 
                v-show="settingsTabs.saves.isShow"
                @saveSettings="(role) => callAction({action: 'saveSettings', value: role})"
            />
            <AppPopup class="popup_right popup__settings" :closeByClick="false" @clickOutside="() => callAction({action: 'changeSettingsTab', value: null})">
                <template #summary>
                    <IconSettings />
                </template>
                <template #content>
                    <template v-if="settingsTabs.activeTab == null">
                        <PopupOption 
                            class="popup-option__sublink" 
                            v-for="tab in settingsTabs.tabs"
                            @click="() => callAction({action: 'changeSettingsTab', value: tab})"
                        >
                            {{ tab.title }} 
                            
                            <IconArrow />
                        </PopupOption>
                    </template>
                    <template v-else>
                        <PopupOption 
                            class="popup-option__sublink popup-option__sublink_back" 
                            @click="() => callAction({action: 'changeSettingsTab', value: null})"
                        >
                            {{ settingsTabs.activeTab.title }}
                            <IconArrow />
                        </PopupOption>

                        <template v-if="settingsTabs.activeTab.tab == 'order'">
                            <draggable 
                                ref="draggableRef"
                                class="popup-option__draggable"
                                group="popup-menu__settings" 
                                itemKey="settings-visible"
                                v-model="tabs" 
                                handle=".icon__draggable"
                                @end="(event) => callAction({action: 'dragEnd', value: event})" 
                            >
                                <template #item="{ element: option }">
                                    <PopupOption class="popup-option__sublink" v-show="option.enabled">
                                        <IconDrag /> 
                                        {{ option.title }}
                                    </PopupOption>
                                </template>
                            </draggable>
                        </template>
                        <template v-else>
                            <PopupOption class="popup__option_checkbox" v-for="option in tabs">
                                <AppCheckbox 
                                    :item="{
                                        id: option.id,
                                        title: option.title,
                                        type: 'checkbox',
                                        disabled: false, 
                                        value: option.enabled,
                                        options:  null,
                                        key: option.tab                           
                                    }"
                                    @changeValue="(data) => callAction({action: 'changeValue', value: data})"
                                />                            
                            </PopupOption>
                        </template>
                    </template>
                </template>
            </AppPopup>
        </div>
    </div>
</template>

<script setup>
    import './Tabs.scss';
    
    import { onMounted, ref } from 'vue'
    import draggable from 'vuedraggable'

    import IconDrag from '@/components/AppIcons/Drag/Drag.vue'
    import IconArrow from '@/components/AppIcons/Arrow/Arrow.vue'
    import IconSettings from '@/components/AppIcons/Settings/Settings.vue'
    import IconTriangle from '@/components/AppIcons/Triangle/Triangle.vue'

    import AppPopup from '@/components/AppPopup/Popup.vue'
    import PopupSave from '@/components/AppPopup/Save/Save.vue'
    import AppCheckbox from '@/components/AppInputs/Checkbox/Checkbox.vue'
    import PopupOption from '@/components/AppPopup/PopupOption/PopupOption.vue'

    const props = defineProps({
        tabs: {
            default: [],
            type: Object
        }
    })

    const emit = defineEmits([
        'callAction'
    ])

    let tabs = ref([])

    let settingsTabs = ref({
        tabs: [
            {
                tab: 'enabled',
                title: 'Отображение столбцов',
            },
            {
                tab: 'order',
                title: 'Порядок столбцов',
            }
        ],
        saves: {
            isShow: false
        },
        activeTab: null
    })

    let activeTab = ref(null)

    // Вызов действий
    const callAction = (data) => {
        // Изменение меню в настройках
        const changeSettingsTab = (data) => {
            setTimeout(() => {
                settingsTabs.value.activeTab = data            
            }, 10);

        }

        // Сохранение настроек
        const saveSettings = (data) => {
            emit('callAction', {
                action: 'saveSettings',
                value: {
                    fields: tabs.value,
                    role: data
                }
            })
            settingsTabs.value.saves.isShow = false
        }

        // Изменение значений опций
        const changeValue = (data) => {
            tabs.value.find(option => option.tab == data.key).enabled = data.value
            settingsTabs.value.saves.isShow = true
        }

        // Смена вкладки
        const changeTab = (data) => {
            activeTab.value = data
            emit('callAction', {
                action: 'changeTab',
                value: data
            })
        }

        // Конец перетаскивания плашки
        const settingsDragEnd = () => {
            settingsTabs.value.saves.isShow = true
        }

        switch (data.action) {
            // Сохранение настроек
            case 'saveSettings':
                saveSettings(data.value)
                break;

            // Изменение меню в настройках
            case 'changeSettingsTab':
                changeSettingsTab(data.value)
                break;
            
            // Изменение значений опций
            case 'changeValue':
                changeValue(data.value)
                break;

            // Конец перетаскивания плашки
            case 'dragEnd':
                settingsDragEnd(data.value)
                break;

            // Смена вкладки
            case 'changeTab': 
                changeTab(data.value)
                break;

            default:
                break;
        }
    }

    onMounted(() => {
        tabs.value = props.tabs
        activeTab.value = Array.isArray(tabs.value) ? tabs.value.length > 0 ? tabs.value[0].tab : null : null
    })
</script>
