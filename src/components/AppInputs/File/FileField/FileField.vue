<template>
    <FansyBox
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
            @end="() => callAction(null)"
            :key="props.item.key"
        >
            <template #item="{ element: item }" >
                <FansyBoxImage
                    v-if="Object.keys(item).length !== 0"
                    class="file-list__item"
                    :id="props.item.id"
                    :isShowFileName="props.item.show_file_name"
                    :image="item"
                    :loading="item.status == 'loading'"
                    :class="item.status == 'loading' ? 'file-list__item_loading' : ''"
                    @callAction="(data) => callAction(data)"
                />

                <FileUpload v-else :buttonTitle="props.item.button_name"/>
            </template>
        </draggable>
    </FansyBox>

</template>

<script setup>
    import './FileField.scss';

    import draggable from 'vuedraggable'
    import {onMounted, provide, ref, watch} from "vue";

    import FansyBox from '@/components/AppFansyBox/FansyBox.vue';
    import FansyBoxImage from '@/components/AppFansyBox/FansyBoxImage/FansyBoxImage.vue';
    import FileUpload from "@/components/AppInputs/File/FileUpload/FileUpload.vue";

    const emit = defineEmits([
        'changeValue'
    ])

    const props = defineProps({
        item: {
            default: {
                id: 1517,
                title: "Undefined title",
                type: "file",
                key: "",
                required: false,
                options: null,
                focus: true,
                value: null,
                button_name: "",
            },
            type: Object
        }
    })

    // Получение значении
    const getValues = () => {
        if ([null, undefined].includes(props.item.value) || !Array.isArray(props.item.value)) {
            return [{}]
        } else {
            const localValues = props.item.value == null ? [] : props.item.value.filter(p => ![null, undefined].includes(p) && !Array.isArray(p) && Object.keys(p).length !== 0)
            return JSON.parse(JSON.stringify([...localValues, {}]))
        }
    }

    const values = ref(getValues())

    // Вызов деиствий и изменение значений
    const callAction = (data) => {
        if (data !== null) {
            switch (data.action) {
                // Локальное удаление эллемента
                case 'deleteImage':
                    values.value = values.value.filter(item => Object.keys(item).length === 0 || item.id !== data.item.image.id)
                    break;
                default:
                    break;
            }
        }

        emit('changeValue', { key: props.item.key, value: values.value.filter(item => Object.keys(item).length !== 0) })
    }

    provide('values', values)

    watch(() => props.item.value, () => {
        values.value = getValues()
    })
</script>
