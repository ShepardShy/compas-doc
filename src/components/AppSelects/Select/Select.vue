<template>
    <FormItem
        class="form-item__select select" 
        :required="props.item.required"
    >
        <FormLabel
            v-show="props.item.title != null && props.item.title != ''"
            :title="props.item.title"
        />    

        <SelectField 
            :item="props.item"
            :isReadOnly="props.isReadOnly"
            :isMultiply="props.isMultiply"
            :isHaveNullOption="props.isHaveNullOption"
            @changeValue="(data) => emit('changeValue', data)"
        />
    </FormItem>
</template>

<script setup>
    import './Select.scss';
    
    import FormItem from '@/components/AppForm/FormItem/FormItem.vue';
    import FormLabel from '@/components/AppForm/FormLabel/FormLabel.vue';
    import SelectField from './SelectField/SelectField.vue';

    const props = defineProps({
        item: {
            default: {
                id: 0,
                required: false,
                title: 'Select title',
                value: null,
                focus: false,
                key: null,
                options: [],
                lockedOptions: []
            },
            type: Object
        },
        isReadOnly: {
            default: false,
            type: Boolean
        },
        isMultiply: {
            default: false,
            type: Boolean
        },
        isHaveNullOption: {
            default: true,
            type: Boolean
        }
    })

    const emit = defineEmits([
        'changeValue',
    ])
</script>
