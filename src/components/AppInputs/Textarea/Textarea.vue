<template>
    <FormItem 
        class="form-item__textarea" 
        :class="props.item.required ? 'form-item_required' : ''" 
    >
        <FormLabel
            :title="props.item.title"
        />

        <TextareaField
            :item="props.item"
            :mask="props.mask"
            :disabled="props.disabled"
            :isUseEnter="props.isUseEnter"
            @focus="(data) => $emit('focus', data)"
            @blur="(data) => $emit('blur', data)"
            @changeValue="(data) => $emit('changeValue', data)"
        />
    </FormItem>
</template>

<script setup>
    import './Textarea.scss';

    import TextareaField from './TextareaField/TextareaField.vue';
    import FormItem from '@/components/AppForm/FormItem/FormItem.vue';
    import FormLabel from '@/components/AppForm/FormLabel/FormLabel.vue';

    const props = defineProps({
        item: {
            default: {
                id: 0,
                key: '',
                title: '',
                value: '',
                type: 'text',
                focus: false,
                substring: '',
                placeholder: ''
            },
            type: Object
        },
        disabled: {
            default: false,
            type: Boolean
        },
        mask: {
            default: null,
            type: String
        },
        isUseEnter: {
            default: true,
            type: Boolean
        }
    })
</script>
