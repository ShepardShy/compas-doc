<template>
    <span class="form-item__value" :class="setClasses" v-if="props.isHTML" v-html="props.value"></span>
    <span class="form-item__value" :class="setClasses" v-else>
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
        },
        isLink: {
            default: false,
            type: Boolean
        }
    })

    const setClasses = computed(() => {
        return [
            [null, undefined].includes(props.value) || props.value == '' ? 'form-item__value_empty' : '',
            props.isHTML ? 'form-item__value_html' : '',
            props.isLink ? 'form-item__value-link' : ''
        ]
    })
</script>
