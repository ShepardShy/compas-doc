<template>
    <AppFansyBoxContainer class="table__item-content table__item_images">
        <div class="table__item-content_title">
            {{ props.item.title }}
        </div>
        <span class="item__value" :class="setClasses" @click="(event) => $emit('initEdit', event)" v-if="[undefined, null, 'не заполнено'].includes(props.item.value) || props.item.value.length == 0">
            не заполнено
        </span>
        <draggable
            tag="div"
            v-model="localItems"
            class="table__item-content-list"
            :forceFallback="true"
            handle=".item__value"
            draggable=".item__value:not(.item__value_undraggable)"
            :itemKey="'inputFields'"
            v-else-if="props.item.value != 'не заполнено'"
            @end="() => changeValue()"
        >
            <template #item="{ element: item}" >
                <AppFansyBoxImage
                    :image="item"
                    :item="props.item"
                    @callAction="(data) => $emit('callAction', data)"
                />
            </template>
        </draggable>
    </AppFansyBoxContainer>
</template>

<script setup>
    import './TableItemImages.scss';
    import '@/components/AppTable/TableElements/TableItem/TableItem.scss';

    import _ from 'lodash'
    import draggable from 'vuedraggable'
    import AppFansyBoxContainer from '@/components/AppFansyBox/FansyBoxContainer/FansyBoxContainer.vue';
    import AppFansyBoxImage from '@/components/AppFansyBox/FansyBoxImage/FansyBoxImage.vue';
    import TableItemScripts from '@/components/AppTable/TableItemScripts';

    const setClasses = computed(() => {
        return TableItemScripts.setClasses(props.item)
    })

    let localItems = ref(props.item.value)

    const emit = defineEmits([
        'callAction',
        'changeValue'
    ])

    const props = defineProps({
        item: {
            default: {
                id: 0,
                title: "Undefined title",
                typeComponent: "",
                type: "text",
                value: null,
                key: ""
            },
            type: Object
        }
    })

    watch(() => props.item.value, () => {
        localItems.value = props.item.value
    })

    const changeValue = () => {
        if (!_.isEqual(props.item.value, localItems.value)) {
            emit('changeValue', {id: props.item.id, key: props.item.key, value: {type: 'sort', arr: localItems}})
        }
    }
</script>
