<template>
    <SettingItem :title="'Порядок столбцов'" class="table__setting section__setting_draggable section__setting-item" :keyItem="'orderCols'">
        <draggable
            tag="div"
            v-model="localItems"
            :forceFallback="true"
            :itemKey="'optionTableHeader'"
            class="section__setting-options"
            @end="() => dragEnd()"
        >
            <template #item="{ element: item }">
                <div class="section__setting-option section__setting-option_flex" v-if="item.enabled">
                    <span class="section__setting-option_draggable">
                        <svg width="11" height="12" viewBox="0 0 11 12" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 0h9a1 1 0 0 1 0 2H1a1 1 0 1 1 0-2zm0 5h9a1 1 0 0 1 0 2H1a1 1 0 1 1 0-2zm0 5h9a1 1 0 0 1 0 2H1a1 1 0 1 1 0-2z" fill="#A6B7D4" fill-rule="evenodd"/>
                        </svg>
                    </span>
                    <span>
                        {{ item.title }}
                    </span>
                </div>
            </template>
        </draggable>
    </SettingItem>
</template>

<script setup>
    import './SettingsOrder.scss';

    import draggable from 'vuedraggable'
    import SettingItem from '@/components/AppSection/SectionSettings/SettingItem/SettingItem.vue';

    let localItems = ref(null)

    const props = defineProps({
        cols: {
            default: [
                {
                    "id": 0,
                    "title": "Undefined title",
                    "key": "",
                    "width": "50px",
                    "fixed": true,
                    component: null
                }],
            type: Array
        }
    })

    const emit = defineEmits([
        'updateTableKeysOrder'
    ])

    onMounted(() => {
        localItems.value = props.cols
    })

    watch(() => props.cols, () => {
        localItems.value = props.cols
    })

    // Конец дропа
    const dragEnd = () => {
        emit('updateTableKeysOrder', localItems.value)
    }
</script>
