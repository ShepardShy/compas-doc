<template>
    <div class="component__field">
        <component 
            :is="props.component"
            :saves="props.codeProps.saves != undefined ? props.codeProps.saves.default : null"
            :fields="props.codeProps.fields != undefined ? props.codeProps.fields.default : null"
            :tabs="props.codeProps.tabs != undefined ? props.codeProps.tabs.default : null"
            :item="props.codeProps.item != undefined ? props.codeProps.item.default : null"
            :disabled="props.codeProps.mask != undefined ? props.codeProps.disabled.default : null"
            :mask="props.codeProps.mask != undefined ? props.codeProps.mask.default : null"
            :isUseEnter="props.codeProps.isUseEnter != undefined ? props.codeProps.isUseEnter.default : null"
            :enabledAutocomplete="props.codeProps.enabledAutocomplete != undefined ? props.codeProps.enabledAutocomplete.default : null"
            @changeValue="(data) => emit('changeValue', data)"
            @actionFilter="(data) => emit('actionFilter', data)"
        />
    </div>
</template>

<script setup>
    import './ComponentField.scss';
    
    const props = defineProps({
        component: {
            default: null
        },
        codeProps: {
            default: {},
            type: Object
        }
    })

    const emit = defineEmits([
        'changeValue',
        'actionFilter'
    ])
</script>
