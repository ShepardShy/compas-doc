<template>
    <FormItem
        class="file form-item__file"
        :class="setClasses"
        :required="props.item.required"
    >
        <FormLabel
            v-show="props.item.title != null && props.item.title != ''"
            :title="props.item.title"
        />

        <FileField
            :item="props.item"
            :isReadOnly="props.isReadOnly"
            @changeValue="(data) => emit('changeValue', data)"
        />
    </FormItem>
</template>

<script setup>
    import './File.scss';

    import {computed} from "vue";

    import FormItem from "@/components/AppForm/FormItem/FormItem.vue";
    import FormLabel from "@/components/AppForm/FormLabel/FormLabel.vue";
    import FileField from './FileField/FileField.vue'

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
        disabled: {
            default: false,
            type: Boolean
        },
        isReadOnly: {
            default: false,
            type: Boolean
        },
    })

    const emit = defineEmits([
        'changeValue'
    ])

    const setClasses = computed(() => {
        return [
            ([null, undefined].includes(props.item.value) ||
                typeof props.item.value == 'string' ||
                !Array.isArray(props.item.value) ||
                props.item.value.filter(p => ![null, undefined].includes(p) && !Array.isArray(p) && Object.keys(p).length !== 0 && typeof p != 'string').length === 0 ||
                props.item.value.length === 0) &&
            props.isReadOnly ? 'file_empty' : ''
        ]
    })
</script>
