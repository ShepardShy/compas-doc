<template>
    <SectionSettings
        :classDetails="'table__settings'"
        :options="props.tableStore.tableKeysFiltered"
        :sortItem="props.tableStore.sortItem"
        :saveSettings="props.saveSettings"
        :changedInfo="props.tableStore.changedColumns.length > 0 || props.tableStore.sortItem.changed"
        @click="(event) => removeActiveTab(event)"
        @sortSection="(data) => $emit('sortTable', data)"
        @updateTableKeys="(data) => $emit('updateTableKeys', data)"
    >
        <template v-slot:save>
            <SettingsSave
                v-show="(activeTab == null) || (activeTab == 'displayCols')"
                :title="'Применить для себя'"
                @click="() => callActionSave('updateTableKeysUser', null)"
            />
            <SettingsSaveRoles
                v-show="(activeTab == null) || (activeTab == 'saveRoles')"
                :title="'Применить для роли'"
                :roles="userStore.roles"
                :keyItem="'saveRoles'"
                @callAction="(data) => callActionSave('updateTableKeysRole', data)"
                @changeActiveTab="(tab) => changeActiveTab(tab)"
            />
            <SettingsSave
                v-show="(activeTab == null) || (activeTab == 'displayCols')"
                :title="'Применить для всех'"
                @click="() => callActionSave('updateTableKeysAll', null)"
            />
        </template>

        <template v-if="props.tableStore.actions && props.tableStore.actions.length > 0" v-slot:menu>
            <SettingsMenu
                :actions="props.tableStore.actions"
                @callAction="(action) => $emit('callAction', action, props.tableStore)"
            />
        </template>
        <template v-slot:settings>
            <SettingsOptions
                v-show="(activeTab == null) || (activeTab == 'displayCols')"
                :keyCol="'enabled'"
                :keyItem="'displayCols'"
                :title="'Отображение столбцов'"
                :cols="props.tableStore.tableKeys"
                @changeValue="(data) => changeValue(data)"
                @changeActiveTab="(tab) => changeActiveTab(tab)"
            />

            <SettingsOptions
                v-show="(activeTab == null) || (activeTab == 'fixCols')"
                :keyCol="'fixed'"
                :keyItem="'fixCols'"
                :title="'Фиксирование столбцов'"
                :cols="props.tableStore.tableKeysFiltered"
                @changeValue="(data) => changeValue(data)"
                @changeActiveTab="(tab) => changeActiveTab(tab)"
            />

            <SettingsOrder
                v-if="props.tableStore.tableKeysFiltered.length != 0"
                v-show="(activeTab == null) || (activeTab == 'orderCols')"
                :cols="props.tableStore.tableKeysFiltered"
                @changeActiveTab="(tab) => changeActiveTab(tab)"
                @updateTableKeysOrder="(data) => updateTableKeysOrder(data)"
            />
        </template>
    </SectionSettings>
</template>

<script setup>
    import './TableSettings.scss';

    import SectionSettings from '@/components/AppSection/SectionSettings/SectionSettings.vue';
    import SettingsOptions from './SettingsOptions/SettingsOptions.vue';
    import SettingsSave from "./SettingsSave/SettingsSave.vue";
    import SettingsSaveRoles from "./SettingsSaveRoles/SettingsSaveRoles.vue";
    import SettingsOrder from './SettingsOrder/SettingsOrder.vue';
    import commonScripts from '@/helpers/commonScripts';
    import resizableGrid from '@/components/AppTable/TableFunctions.js'
    import tableStoreCommon from '@/stores/tableStoreScripts/tableStoreCommon'
    import TableScripts from '../TableScripts';
    import SettingsMenu from './SettingsMenu/SettingsMenu.vue';
    import SectionScrollBlockScripts from '@/components/AppSection/AppSectionScrollBlock/SectionScrollBlockScripts';

    import {useUserStore} from "~/stores/userStore";

    const userStore = useUserStore();

    const props = defineProps({
        tableRef: {
            default: null
        },
        scrollBlock: {
            default: null
        },
        saveSettings: {
            default: false,
            type: Boolean
        },
        tableStore: {
            default: null
        }
    })

    const emit = defineEmits([
        'updateTableKeysOrder',
        'callAction'
    ])

    let activeTab = ref(null)

    // Смена активного подменю
    const changeActiveTab = (tab) => {
        if (tab == activeTab.value) {
            activeTab.value = null
        } else {
            activeTab.value = tab
        }
    }

    // Возвращение в меню настроек
    const removeActiveTab = (event) => {
        let target = event.target.closest('.table__settings')

        if (target != null) {
            if (!target.hasAttribute('open')) {
                changeActiveTab(null)
                commonScripts.hideAllDetails('.table__setting', event)

                target.classList.add('table__settings_hide')
                target.classList.remove('table__settings_out')
                setTimeout(() => {
                    if (checkingWindowBorders(target.querySelector('.section__settings-list'))) {
                        target.classList.add('table__settings_out')
                    } else {
                        target.classList.remove('table__settings_out')
                    }
                    target.classList.remove('table__settings_hide')
                }, 100);
            } else {
            }
        }
    }

    // Изменение значений
    const changeValue = (data) => {
        for (let i = 0; i < props.tableStore.tableKeys.length; i++) {
            if (props.tableStore.tableKeys[i].key == data.itemKey) {
                switch (data.key) {
                    case 'enabled':
                        let tableKey = props.tableStore.tableKeys[i]
                        tableKey.enabled = !tableKey.enabled
                        setTimeout(() => {
                            resizableGrid(props.tableStore, props.tableRef, tableKey.enabled)
                        }, 10)
                        break;
                    case 'fixed':
                        const currentKey = props.tableStore.tableKeysFiltered.find(item => item.key === props.tableStore.tableKeys[i].key)

                        currentKey.fixed = !currentKey.fixed
                        let tableCells = props.tableRef.querySelectorAll('.table__item');

                        if (!currentKey.fixed) {
                            for (let cell of tableCells) {
                                if (cell.getAttribute('data-key') == currentKey.key) {
                                    cell.style.setProperty("left", `0px`)
                                }
                            }
                        }
                        setTimeout(() => {
                            TableScripts.setStoreTableKeysMargin(props.tableRef, props.tableStore)

                            for (let cell of tableCells) {
                                if (cell.getAttribute('data-key') == currentKey.key) {
                                    if (currentKey.fixed && currentKey.isSticky) {
                                        cell.classList.add('table__item_sticky')
                                    }
                                    cell.style.setProperty("left", null)
                                }
                            }
                        }, 10);
                        break;
                    default:
                        break;
                }
                break;
            }
        }


        if (data.key == 'enabled') {
            tableStoreCommon.setTableKeysFiltered(props.tableStore)
            TableScripts.setStoreTableKeysMargin(props.tableRef, props.tableStore)
        }
        setTimeout(() => {
            setTableKeysPosition()
            SectionScrollBlockScripts.setStickyPosition(props.tableRef, props.scrollBlock, props.tableStore)
        }, 10);

    }

    const updateTableKeysOrder = (data) => {
        emit('updateTableKeysOrder', data)
        setTimeout(() => {
            TableScripts.setStoreTableKeysMargin(props.tableRef, props.tableStore)
            SectionScrollBlockScripts.setStickyPosition(props.tableRef, props.scrollBlock, props.tableStore)
        }, 100);
    }

    const callActionSave = (action, data) => {
        document.querySelector('.save-details').removeAttribute('open')
        emit('callAction', {action: action, item: data})
    }

    const setTableKeysPosition = () => {
        let itemList = props.tableRef.querySelectorAll('thead tr .table__item');
        let item = null
        let data = []
        itemList.forEach((element, index) => {
            item = props.tableStore.tableKeysFiltered.find(p => p.key == element.getAttribute('data-key'))
            item.index = index
            data.push(item)
        });

        props.tableStore.changedColumns = data.sort((next, prev) => next.index - prev.index)
    }

    const checkingWindowBorders = (el) => {
        var rect = el.getBoundingClientRect();
        return rect.x + 5 < 0
    }
</script>
