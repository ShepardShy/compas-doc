<template>
    <div class="table__item-content">
        <div class="table__item-content_title">
            {{ props.item.title }}
        </div>

        <div class="table__item-group">
            <div class="table__item-group-item" v-for="subfield in currentSubfields">
                <div class="table__item-group-title">
                    {{ subfield.title }}
                </div>
                <span class="table__item-group-value" :class="[undefined, null].includes(subfield.value) || subfield.value == '' ? 'item__value_empty' : ''">
                    {{ setValue(subfield) }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
    import './TableItemGroup.scss';
    import '@/components/AppTable/TableElements/TableItem/TableItem.scss'

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

    const setValue = (subfield) => {
        if ([undefined, null].includes(subfield.value) || subfield.value == '') {
            return 'не заполнено'
        } else {
            return subfield.value
        }
    }

	const currentSubfields = computed(() => {
		if (props.item.visible_always) {
			return props.item.subfields
		} else {
			return props.item.subfields.filter(subfield => !([undefined, null].includes(subfield.value) || subfield.value == ''))
		}
	})
</script>
