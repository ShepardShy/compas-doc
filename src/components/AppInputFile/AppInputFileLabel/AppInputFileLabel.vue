<template>
    <label class="form__item-file-label" :for="`${props.item.type}_${props.item.id}`">
        <span>
            {{ props.item.title }} 
        </span>
    </label>
</template>

<script setup>
    import './AppInputFileLabel.scss';
    
    const props = defineProps({
        item: {
            default: { 
                "id": 1517, 
                "title": "Undefined title", 
                "type": "file", 
                "isMobile": true, 
                "key": "",
                "limit": 1,
                "options": null, 
                "focus": true, 
                "value": null, 
                "subfields": null 
            },
            type: Object
        }
    })
</script>
