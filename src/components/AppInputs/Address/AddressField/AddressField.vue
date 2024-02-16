<template>
    <div class="form-item__address-wrapper">
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
            class="form-item__copy"
            :text="activeOption.label.text"
            :buttonTitle="'Скопировать адрес'"
        />

       <Map
           v-if="props.isShowMap"
           :markers="activeOption ? [activeOption] : []"
           :isSelectSeveral="props.isSelectSeveral"
       />
    </div>
</template>

<script setup>
    import './AddressField.scss';

    import {computed, onMounted, shallowRef, watch} from "vue";

    import AppAutocomplete from "@/components/AppAutocomplete/Input/Input.vue";
    import Map from "@/components/AppMap/Map/Map.vue";
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
        'searchOptions'
    ])

    const activeOption = computed(() => {
        return props.item.options.find((option) => option.value === props.item.value)
    })

</script>