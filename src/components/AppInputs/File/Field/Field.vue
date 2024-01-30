<template>
    <FansyBox
        class="file__container"
        :class="values.length === 1 && props.isReadOnly ? 'file__container_empty' : ''"
    >
        <draggable
            tag="div"
            v-model="values"
            class="file__list file-list"
            :class="props.item.show_file_name ? 'file-list_show-title' : ''"
            :forceFallback="true"
            :itemKey="'fileFields'"
            :key="props.item.key"
            handle=".fancybox-item__link"
            draggable=".file-list__item:not(.file-list__item_undraggable)"
            @end="() => callAction(null)"
        >
            <template #item="{ element: item }" >
                <Image
                    v-if="Object.keys(item).length !== 0"
                    class="file-list__item"
                    :id="props.item.id"
                    :isShowFileName="props.item.show_file_name"
                    :image="item"
                    :loading="item.status == 'loading'"
                    :class="item.status == 'loading' ? 'file-list__item_loading' : ''"
                    @callAction="(data) => callAction(data)"
                />

                <Upload
                    v-else-if="!props.isReadOnly"
                    :buttonTitle="props.item.button_name"
                    :isMultiple="props.item.is_multiple"
                />
            </template>
        </draggable>
    </FansyBox>

</template>

<script setup>
    import './Field.scss';

    import draggable from 'vuedraggable'
    import {inject, provide, ref, watch} from "vue";

    import FansyBox from '@/components/AppFansyBox/FansyBox.vue';
    import Image from '@/components/AppFansyBox/Image/Image.vue';
    import Upload from "@/components/AppInputs/File/Upload/Upload.vue";

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
        },
        isReadOnly: {
            default: false,
            type: Boolean
        }
    })

    // Получение значении
    const getValues = () => {
        if ([null, undefined].includes(props.item.value) || !Array.isArray(props.item.value)) {
            return [{}]
        } else {
            const localValues = props.item.value == null ? [] : props.item.value.filter(p => ![null, undefined].includes(p) && !Array.isArray(p) && Object.keys(p).length !== 0 && typeof p != 'string')
            return JSON.parse(JSON.stringify([...localValues, {}]))
        }
    }

    const values = ref(getValues())
    const isReadOnly = inject('isReadOnly')

    // Вызов деиствий и изменение значений
    const callAction = (data) => {
        if (data !== null) {
            switch (data.action) {
                // Локальное удаление эллемента
                case 'deleteImage':
                    values.value = values.value.filter(item => Object.keys(item).length === 0 || item.id !== data.value.id)
                    break;
                default:
                    break;
            }
        }

        isReadOnly.value = false
        emit('changeValue', { key: props.item.key, value: values.value.filter(item => Object.keys(item).length !== 0) })
    }

    provide('values', values)

    watch(() => props.item.value, () => {
        values.value = getValues()
    })
</script>
