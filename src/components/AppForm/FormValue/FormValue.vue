<template>
    <span class="form-item__value" :class="setClasses">
        {{ props.value }}
    </span>
</template>

<script setup>
    import './FormValue.scss';

    import { computed } from 'vue';
    
    const props = defineProps({
        value: {
            default: null,
            type: String
        },
        isHTML: {
            default: false,
            type: Boolean
        }
    })

    const setClasses = computed(() => {
        console.log(props.value);

        return [
            [null, undefined].includes(props.value) || props.value == '' ? 'form-item__value_empty' : '',
            props.isHTML ? 'form-item__value_html' : ''
        ]
    })
</script>
