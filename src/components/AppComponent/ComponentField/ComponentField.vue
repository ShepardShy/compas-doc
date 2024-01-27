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
            :isMultiple="props.codeProps.isMultiple != undefined ? props.codeProps.isMultiple.default : null"
            :isFiltered="props.codeProps.isFiltered != undefined ? props.codeProps.isFiltered.default : null"
            :isUseEnter="props.codeProps.isUseEnter != undefined ? props.codeProps.isUseEnter.default : null"
            :isReadOnly="props.codeProps.isReadOnly != undefined ? props.codeProps.isReadOnly.default : null"
            :isMultiply="props.codeProps.isMultiply != undefined ? props.codeProps.isMultiply.default : null"
            :isCanCreate="props.codeProps.isCanCreate != undefined ? props.codeProps.isCanCreate.default : null"
            :isHaveNullOption="props.codeProps.isHaveNullOption != undefined ? props.codeProps.isHaveNullOption.default : null"
            :enabledAutocomplete="props.codeProps.enabledAutocomplete != undefined ? props.codeProps.enabledAutocomplete.default : null"
            @showAll="(data) => emit('showAll', data)"
            @openLink="(data) => emit('openLink', data)"
            @changeValue="(data) => emit('changeValue', data)"
            @actionFilter="(data) => emit('actionFilter', data)"
            @createOption="(data) => emit('createOption', data)"
            @searchOptions="(data) => emit('searchOptions', data)"
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
        'showAll',
        'openLink',
        'changeValue',
        'actionFilter',
        'createOption',
        'searchOptions'
    ])
</script>
