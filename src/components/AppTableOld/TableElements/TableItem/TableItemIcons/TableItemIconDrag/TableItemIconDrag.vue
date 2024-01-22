<template>
    <div class="table__item_drag">
        <SectionIconDrag />
        <span>
            {{ props.item.indexRow + 1}}
        </span>
    </div>
</template>

<script setup>
    import './TableItemIconDrag.scss'

    import SectionIconDrag from '~/components/AppSection/SectionIconDrag/SectionIconDrag.vue';
   
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
                "indexRow": 0,
                "fixTarget":  null
            },
            type: Object
        }
    })
</script>
