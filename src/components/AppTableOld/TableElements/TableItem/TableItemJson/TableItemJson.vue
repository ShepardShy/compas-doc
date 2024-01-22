<template>
    <div class="table__item-content">
        <div class="table__item-content_title">
            {{ props.item.title }}
        </div>
        <span class="item__value" v-html="setValue" :class="setClasses"></span>
    </div>
</template>

<script setup>
    import './TableItemJson.scss';
    
    import TableItemScripts from '@/components/AppTable/TableItemScripts';

    const props = defineProps({
        item: {
            default: {
                id: 0,
                title: "Undefined title",
                typeComponent: "",
                type: "text",
                value: null,
                key: ""
            },
            type: Object
        }
    })

    const setValue = computed(() => {
        if (props.item.value == null || props.item.value == '') {
            return 'не заполнено'
        } else {
            return props.item.value
        }
    })

    const setClasses = computed(() => {
        return TableItemScripts.setClasses(props.item)
    })
</script>
