<template>
    <FormItem
        class="file form-item__file"
        :class="props.isReadOnly ? 'file_empty' : ''"
        :required="props.item.required"
    >
        <FormLabel
            v-show="props.item.title != null && props.item.title != ''"
            :title="props.item.title"
        />

        <FileField
            v-if="!props.isReadOnly"
            :item="props.item"
            @changeValue="(data) => emit('changeValue', data)"
        />
    </FormItem>
</template>

<script setup>
    import './File.scss';

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
</script>
