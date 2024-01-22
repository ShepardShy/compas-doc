<template>
    <div class="table__item-content">
        <div class="table__item-content_title">
            {{ props.item.title }}
        </div>
	    <div class="item__value-wrapper">
		    <span class="item__value" :class="setClasses" v-html="itemValue"></span>
	    </div>

    </div>
</template>

<script setup>
    import './TableItemHTML.scss';
    import '@/components/AppTable/TableElements/TableItem/TableItem.scss';

    import TableItemScripts from '@/components/AppTable/TableItemScripts';

    const setClasses = computed(() => {
        return TableItemScripts.setClasses(props.item)
    })

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

    let itemValue = computed(() => {
        if ([undefined, null].includes(props.item.value)) {
            return 'не заполнено'
        } else {
            return props.item.value.replaceAll('\n', '</br>')
        }
    })
</script>
