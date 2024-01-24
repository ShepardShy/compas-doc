<template>
    <AppFansyBoxContainer
        class="input__file-list table__item-content input__file-clone"
        :class="[props.item.show_file_name ? 'input__file-list--desc' : '']"
    >
        <draggable
            tag="div"
            v-model="localItems"
            class="table__item-content-list"
            :forceFallback="true"
            handle=".item__value"
            draggable=".item__value:not(.item__value--undraggable)"
            :itemKey="'inputFields'"
            v-if="props.item.value != 'не заполнено'"
            @end="() => emit('changeValue', {id: props.item.id, key: props.item.key, value: {type: 'sort', arr: localItems}})"
        >
            <template #item="{ element: item }" >
                <AppFansyBoxImage
                    v-if="Object.keys(item).length !== 0"
                    :image="item"
                    :item="props.item"
                    :loading="item.status == 'loading'"
                    :class="item.status == 'loading' ? 'item__value--loading' : ''"
                    @callAction="(data) => $emit('callAction', data)"
                />

                <AppInputFileUpload v-else />
            </template>
        </draggable>
        <span class="item__value" v-else>
            {{ props.item.value }}
        </span>
    </AppFansyBoxContainer>

</template>

<script setup>
    import './AppInputFileFieldClone.scss';

    import draggable from 'vuedraggable'
    import AppFansyBoxContainer from '@/components/AppFansyBox/AppFansyBoxContainer/AppFansyBoxContainer.vue';
    import AppFansyBoxImage from '@/components/AppFansyBox/AppFansyBoxImage/AppFansyBoxImage.vue';
    import {provide, ref, watch} from "vue";
    import AppInputFileUpload from "@/components/AppInputFile/AppInputFileUpload/AppInputFileUpload.vue";

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

    let localItems = ref([...props.item.value, {}])

    provide('localItems', localItems)

    watch(() => props.item.value, () => {
        localItems.value = props.item.value
    })
</script>
