<template>
    <div class="address__wrapper">
        <AppAutocomplete
            :item="props.item"
            :isCanCreate="false"
            :isLink="false"
            :isShowId="false"
            :isReadOnly="props.isReadOnly"
            @changeValue="(data) => emit('changeValue', (data))"
            @searchOptions="(data) => emit('searchOptions', (data))"
        />

        <AppCopy
            v-if="activeOption"
            :text="activeOption.label.text"
            :buttonTitle="'Скопировать адрес'"
        />

        <Map
           v-if="props.isShowMap"
           :markers="activeOption ? [activeOption] : []"
           :isSelectSeveral="props.isSelectSeveral"
           :isReadOnly="props.isReadOnly"
           @selectPoints="(data) => emit('selectPoints', (data))"
        />
    </div>
</template>

<script setup>
    import './AddressField.scss';

    import {computed} from "vue";

    import AppAutocomplete from "@/components/AppAutocomplete/Input/Input.vue";
    import Map from "@/components/AppInputs/Address/Map/Map.vue";
    import AppCopy from "@/components/AppCopy/AppCopy.vue";

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
        },
        isSelectSeveral: {
            default: false,
            type: Boolean
        }
    })

    const emit = defineEmits([
        'changeValue',
        'searchOptions',
        'selectPoints'
    ])

    const activeOption = computed(() => {
        return props.item.options.find((option) => option.value === props.item.value)
    })

</script>