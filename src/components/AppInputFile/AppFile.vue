<template>
    <FormItem
        class="file form-item__file"
        :class="[null, undefined].includes(props.item.value) || props.item.value == '' || props.item.value.length == 0 ? 'file_empty' : ''"
        :required="props.item.required"
    >
        <FormLabel
            v-show="props.item.title != null && props.item.title != ''"
            :title="props.item.title"
        />

        <FileField
            v-if="![null, undefined].includes(props.item.value) && props.item.value != '' && props.item.value.length != 0"
            :item="props.item"
            @changeValue="(data) => emit('changeValue', data)"
        />
    </FormItem>
</template>

<script setup>
    import './AppFile.scss';

    import FileField from './FileField/FileField.vue'
    import FormItem from "@/components/AppForm/FormItem/FormItem.vue";
    import FormLabel from "@/components/AppForm/FormLabel/FormLabel.vue";

    const props = defineProps({
        // Сравнить данные
        item: {
            default: {
                id: 1517,
                title: "Undefined title",
                type: "file",
                isMobile: true,
                key: "",
                limit: 1,
                required: 0,
                options: null,
                focus: true,
                value: null,
                button_name: "",
                subfields: null
            },
            type: Object
        }
    })

    const emit = defineEmits([
        'changeValue'
    ])
</script>
