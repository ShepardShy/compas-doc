<template>
    <div
        class="table__option section__setting-option"
        @click="(e) => $emit('changeValue', {id: props.col.id, key: props.keyCol, itemKey: props.col.key, value: Boolean(!e.target.value)})"
    >
        <AppCheckbox
            class="table__option_checkbox form-item__checkbox"
            :item="{
                id: props.col.id,
                value: props.col[props.keyCol],
                type: 'checkbox',
                disabled: false,
                key: props.col.key,
                placeholder: '',
                typeComponent: 'input',
                title: props.col.title
            }"
        />
    </div>
</template>

<script setup>
    import './SettingsOption.scss';

    import AppCheckbox from '@/components/AppInputs/Checkbox/Checkbox.vue';

    const props = defineProps({
        col: {
            default: {
                id: 0,
                title: '',
                key: '',
                width: '40px',
                enabled: true,
                hover: false,
                sort_order: null,
                type: 'checkbox',
                fixed: true,
                fixTarget: '0px',
                index: 0,
            },
            type: Object
        },
        keyCol: {
            default: '',
            type: String
        }
    })
</script>
