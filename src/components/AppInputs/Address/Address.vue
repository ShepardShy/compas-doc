<template>
    <FormItem
        class="file form-item__address"
        :required="props.item.required"
    >
        <FormLabel
            v-show="props.item.title != null && props.item.title != ''"
            :title="props.item.title"
        />

        <AddressField
            :item="props.item"
            :isReadOnly="props.isReadOnly"
            :isShowMap="props.isShowMap"
            @changeValue="(data) => emit('changeValue', (data))"
            @searchOptions="(data) => emit('searchOptions', (data))"
        />

    </FormItem>
</template>

<script setup>
    import './Address.scss';

    import FormLabel from "@/components/AppForm/FormLabel/FormLabel.vue";
    import FormItem from "@/components/AppForm/FormItem/FormItem.vue";
    import AddressField from "@/components/AppInputs/Address/AddressField/AddressField.vue";

    const props = defineProps({
        item: {
            default: {
                id: 0,
                title: "Адрес",
                key: "address",
                required: false,
                value: {
                    text: "",
                    coords: [
                        "55.642606",
                        "37.547414"
                    ]
                }
            },
            type: Object
        },
        isReadOnly: {
            default: false,
            type: Boolean
        },
        isShowMap: {
            default: false,
            type: Boolean
        }
    })

    const emit = defineEmits([
        'changeValue',
        'searchOptions'
    ])
</script>