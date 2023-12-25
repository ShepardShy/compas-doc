<template>
    <FormItem 
        class="form-item__input" 
        :class="props.item.required ? 'form-item_required' : ''" 
        :style="`--substring: ${props.item.substring != undefined ? props.item.substring : ''}`"
    >
        <InputLabel
            v-show="props.item.title != null && props.item.title != ''"
            :title="props.item.title"
        />
        <InputField
            ref="inputRef"
            :item="props.item"
            :mask="props.mask"
            :disabled="props.disabled"
            :enabledAutocomplete="props.enabledAutocomplete"
            @focus="(data) => $emit('focus', data)"
            @blur="(data) => $emit('blur', data)"
            @changeValue="(data) => $emit('changeValue', data)"
        />

	    <span v-if="props.item.type == 'number'" class="form-item__substring">{{ props.item.substring }}</span>
    </FormItem>
</template>

<script setup>
    import './Input.scss';

    import { ref } from 'vue'

    import FormItem from '@/components/AppForm/FormItem/FormItem.vue';
    import InputLabel from './InputLabel/InputLabel.vue';
    import InputField from './InputField/InputField.vue';

    const inputRef = ref(null)

    const props = defineProps({
        item: {
            default: {
                id: 0,
                key: '',
                value: '',
                type: 'text',
                focus: false,
                placeholder: '',
                title: 'Undefined title'
            },
            type: Object
        },
        disabled: {
            default: false,
            type: Boolean
        },
        enabledAutocomplete: {
            default: true,
            type: Boolean
        },
        mask: {
            default: null,
            type: String
        }
    })

    defineExpose({
        inputRef
    })
</script>
