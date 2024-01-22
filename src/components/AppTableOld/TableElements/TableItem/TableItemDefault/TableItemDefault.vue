<template>
    <div class="table__item-content">
        <div class="table__item-content_title">
            {{ props.item.title }}
        </div>

	    <div class="item__value-wrapper">
		    <a
			    v-if="isExternalLink"
			    target="_blank"
			    :href="props.item.external_link"
			    :class="setLinkClasses"
		    >
			    {{ props.item.value }}
		    </a>

		    <span v-else class="item__value" :class="setClasses">
	            {{ isTextEmpty ? 'не заполнено' : props.item.value }}
		        <span v-if="props.item.type == 'number' && props.item.substring && !isTextEmpty && props.item.value !== 'не заполнено'" class="item__value-substring">{{ props.item.substring }}</span>
	        </span>
	    </div>

	    <AppCopy
		    v-if="props.item.type == 'address' && (props.item.value != null && props.item.value != '')"
		    class="button-text__action"
		    :text="saveValueForCopy"
            :buttonTitle="'Скопировать адрес'"
	    />

	    <a
		    v-if="props.item.key == 'phone' && (props.item.value != null && props.item.value != '' && props.item.value != 'не заполнено')"
		    :href="`tel:${props.item.value}`"
	        class="button-text button-text__action"
	    >
		    Позвонить
	    </a>
    </div>
</template>

<script setup>
    import './TableItemDefault.scss';
    import '@/components/AppTable/TableElements/TableItem/TableItem.scss';

    import TableItemScripts from '@/components/AppTable/TableItemScripts';
    import AppCopy from "~/components/AppCopy/AppCopy.vue";

    const props = defineProps({
        item: {
            default: {
                id: 0,
                title: "Undefined title",
                typeComponent: "",
                type: "text",
                value: null,
                key: "",
                external_link: "https://translate.yandex.ru/",
                is_external_link: ""
            },
            type: Object
        }
    })

    const saveValueForCopy = ref(props.item.value)

    const setLinkClasses = computed(() => {
		return [props.item.external_link != '' && props.item.external_link != null ? 'item__value item__value_link' : '',
			props.item.value == 'не заполнено' ? 'item__value_link-empty' : '']
    })

    const setClasses = computed(() => {
        return TableItemScripts.setClasses(props.item)
    })

    const isExternalLink = computed(() => {
		return (props.item.value != null && props.item.value != 'не заполнено') && props.item.is_external_link && props.item.external_link ||
			props.item.value === 'не заполнено' != null && props.item.external_link
	})

    const isTextEmpty = computed(() => {
		return (props.item.textEmpty && props.item.value == null) || props.item.value == '' || props.item.value == null
    })

    watch(() => props.item.state, () => {
	    saveValueForCopy.value = props.item.value
    })
</script>
