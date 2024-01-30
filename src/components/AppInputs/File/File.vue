<template>
    <FormItem
        class="file form-item__file"
        :required="props.item.required"
    >
        <FormLabel
            v-show="props.item.title != null && props.item.title != ''"
            :title="props.item.title"
        />

        <Field
            :item="props.item"
            :isReadOnly="isReadOnly"
            @changeValue="(data) => emit('changeValue', data)"
        />
    </FormItem>
</template>

<script setup>
    import './File.scss';

    import FormItem from "@/components/AppForm/FormItem/FormItem.vue";
    import FormLabel from "@/components/AppForm/FormLabel/FormLabel.vue";
    import Field from './Field/Field.vue'
    import {provide, ref} from "vue";

    const props = defineProps({
        item: {
            default: {
                id: 1517,
                title: "Undefined title",
                type: "file",
                key: "",
                required: false,
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

    const isReadOnly = ref(props.isReadOnly)

    provide('isReadOnly', isReadOnly)
</script>
