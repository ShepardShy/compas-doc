<template>
    <AppFansyBoxContainer
        class="file__container"
        :class="props.item.show_file_name ? 'file-list_show-title' : ''"
    >
        <draggable
            tag="div"
            class="file__list file-list"
            handle=".fancybox-item__container"
            draggable=".file-list__item:not(.file-list__item_undraggable)"
            v-model="values"
            :forceFallback="true"
            :itemKey="'fileFields'"
            @end="() => changeValue()"
        >
            <template #item="{ element: item }" >
                <AppFansyBoxImage
                    v-if="Object.keys(item).length !== 0"
                    class="file-list__item"
                    :image="item"
                    :item="props.item"
                    :loading="item.status == 'loading'"
                    :class="item.status == 'loading' ? 'file-list__item_loading' : ''"
                    @callAction="(data) => changeValue(data)"
                />

                <FileUpload :buttonTitle="props.item.button_name" v-else />
            </template>
        </draggable>
    </AppFansyBoxContainer>

</template>

<script setup>
    import './FileField.scss';

    import draggable from 'vuedraggable'
    import {provide, ref, watch} from "vue";

    import AppFansyBoxContainer from '@/components/AppFansyBox/AppFansyBoxContainer/AppFansyBoxContainer.vue';
    import AppFansyBoxImage from '@/components/AppFansyBox/AppFansyBoxImage/AppFansyBoxImage.vue';
    import FileUpload from "@/components/AppInputFile/FileUpload/FileUpload.vue";

    const emit = defineEmits([
        'changeValue'
    ])

    const props = defineProps({
        item: {
            default: {},
            type: Object
        }
    })

    const values = ref([...props.item.value, {}])

    // Получение опций
    const getValues = () => {
        // Проверка на пустой объект
        const isEmpty = (obj) => {
            for (const prop in obj) {
                if (Object.hasOwn(obj, prop)) {
                    return false;
                }
            }
            return true;
        }

        let localValues = props.item.value == null ? [] : props.item.value.filter(p => p != null && typeof p == 'object' && !Array.isArray(p) && !isEmpty(p))
        values.value = JSON.parse(JSON.stringify([...localValues, {}]))
    }

    const changeValue = (data = null) => {
        // emit('changeValue', {
        //     id:
        //     value: values.value
        // })
    }

    provide('values', values.value)

    watch(() => props.item.value, () => {
        getValues()
    })
</script>
