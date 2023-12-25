<template>
    <div class="form__item" ref="formItemRef">
        <slot></slot>
    </div>
</template>

<script setup>
    import './FormItem.scss';
    
    import { ref } from 'vue'
    
    const formItemRef = ref(null) 

    defineExpose({
        formItemRef
    })
</script>
