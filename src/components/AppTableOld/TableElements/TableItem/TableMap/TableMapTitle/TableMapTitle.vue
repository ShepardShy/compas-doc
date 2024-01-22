<template>
    <div class="table__item-content_title">
        {{ props.title }}
    </div>
</template>

<script setup>
    import './TableMapTitle.scss';
    
    const props = defineProps({
        title: {
            default: "",
            type: String
        }
    })
</script>
