<template>
    <span class="table__item-content_header-title">
        {{ props.item.title }}
        <b>
            <AppRequired 
                v-if="props.item.required"
            />
        </b>
    </span>
</template>

<script setup>
    import './TableHeaderItemContentTitle.scss';
    
    import AppRequired from '@/components/AppIcons/AppRequired/AppRequired.vue';

    const props = defineProps({
        item: {
            default: {
                "id": 0,
                "title": "",
                "key": "",
                "width": "40px",
                "enabled": true,
                "hover": false,
                "sort_order": null,
                "type": "",
                "fixed":  false,
                "fixTarget":  null
            },
            type: Object
        }
    })
</script>
