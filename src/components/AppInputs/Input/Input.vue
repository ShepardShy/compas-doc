<template>
    <FormItem 
        class="form-item__input" 
        :required="props.item.required"
        :style="`--substring: ${props.item.substring != undefined ? props.item.substring : ''}`"
    >
        <FormLabel
            v-show="props.item.title != null && props.item.title != ''"
            :title="props.item.title"
        />

        <FormValue 
            v-if="props.isReadOnly"
            :value="props.item.value"
            :isHTML="false"
        />

        <InputField
            v-else
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

    import InputField from './InputField/InputField.vue';
    import FormItem from '@/components/AppForm/FormItem/FormItem.vue';
    import FormLabel from '@/components/AppForm/FormLabel/FormLabel.vue';
    import FormValue from '@/components/AppForm/FormValue/FormValue.vue';

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
        },
        isReadOnly: {
            default: false,
            type: Boolean
        }
    })

    defineExpose({
        inputRef
    })
</script>
