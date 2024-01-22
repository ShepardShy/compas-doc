<template>
    <div class="table__item-content">
        <div class="table__item-content_title">
            {{ props.item.title }}
        </div>

	    <div
		    v-if="typeof setValue != 'string' && Array.isArray(props.item.value)"
		    class="item__values"
	    >
		    <span
			    v-for="(value, index) in setValue"
			    :key="index"
			    class="item__value"
		    >
			    {{ value }}
		    </span>
	    </div>

	    <div v-else class="item__value-wrapper">
		    <span class="item__value" :class="setClasses">
                {{ setValue }}
            </span>
	    </div>

    </div>
</template>

<script setup>
    import './TableItemArray.scss';
    import '@/components/AppTable/TableElements/TableItem/TableItem.scss';

    import TableItemScripts from '@/components/AppTable/TableItemScripts';

    const setClasses = computed(() => {
        return TableItemScripts.setClasses(props.item)
    })

    const setValue = computed(() => {
        if ([undefined, null, 'не выбрано'].includes(props.item.value) || props.item.value.length == 0) {
            return 'не выбрано'
        } else {
            if (Array.isArray(props.item.value)) {
                let data = []
                for (let value of props.item.value.filter(item => item != null && item !== '')) {
                    let option = props.item.options.find(option => option.value == value)
                    if (option != undefined) {
                        data.push(option.label)
                    }
                }
                return data
            } else {
                return props.item.options.find(option => option.value == props.item.value) ? props.item.options.find(option => option.value == props.item.value).label : ''
            }
        }
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
</script>
