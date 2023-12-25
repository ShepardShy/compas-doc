<template>
    <div class="form-item__title">
        {{ props.title }}
    </div>
</template>

<script setup>
    import './TextareaLabel.scss';
    
    const props = defineProps({
        title: {
            default: '',
            type: String
        }
    })
</script>
