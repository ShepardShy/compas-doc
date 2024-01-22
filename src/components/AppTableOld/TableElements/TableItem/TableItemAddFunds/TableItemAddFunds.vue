<template>
	<TableItemSection :item="props.item">
		<AppInput
			:item="itemInput"
			:enabledAutocomplete="false"
			@changeValue="(data) => itemInput.value = data.value"
		/>

		<AppSelect
			:item="itemSelect"
			@changeValue="(data) => itemSelect.value = data.value"
		/>

		<AppButton
			class="form__item item__section-button button_blue"
			:class="loaderButton ? 'button_loading' : ''"
			@click="toUpBalance"
		>
			Пополнить
		</AppButton>
	</TableItemSection>
</template>

<script setup>
    import './TableItemAddFunds.scss';

	import AppInput from "~/components/AppInputs/Input/Input.vue";
    import AppSelect from "~/components/AppSelects/AppSelect/AppSelect.vue";
    import {useRequisiteStore} from "~/stores/requisiteStore";
    import api from "~/helpers/api";
    import TableItemSection from "../TableItemSection/TableItemSection.vue";

    const setValue = computed(() => {
	    if (props.item.value != null && typeof props.item.value != 'string') {
		    return(props.item.value).join ('; ')
	    } else {
		    return props.item.value
	    }
    })

    const props = defineProps({
	    item: {
		    default: {
				title: 'Пополнить баланс',
		    },
		    type: Object
	    }
    })

    const emit = defineEmits([
	    'changeValue',
	    'toUpBalance'
    ])

    const loaderButton = ref(false)

    const requisiteStore = useRequisiteStore()

    const itemInput = ref({
	    id: 0,
	    title: 'Сумма',
	    value: 10000,
	    type: 'number',
	    placeholder: '',
	    focus: false,
	    key: 'addFundsValue',
    })

    const itemSelect = ref({
	    title: 'Плательщик',
	    key: 'fundsPayer',
	    value: '',
	    options: [
		    {
			    label: 'Не выбрано',
			    value: ''
		    }
	    ]
    })

    const requisitesOptions = ref([])

    requisitesOptions.value = await requisiteStore.getRequisites()

    requisitesOptions.value.forEach((option, index) => {
	    const optionName = option.fields.find(field => field.key == 'name').value

	    requisitesOptions.value[index] = {
		    label: optionName,
		    value: option.id
	    }
    })

    requisitesOptions.value.push({
	    label: 'Банковская карта',
	    value: 'bankСard'
    })

    itemSelect.value.options = requisitesOptions.value

    const toUpBalance = async () => {
		if (!itemInput.value.value || +itemInput.value.value === 0 || !itemSelect.value.value) return

	    try {
		    loaderButton.value = true

		    const ticketHref = await api.callMethod("POST", `balance/payment`, {
			    sum: +itemInput.value.value,
			    payer: itemSelect.value.value === 'bankСard' ? null : itemSelect.value.value
		    });

		    window.open(ticketHref.url, '_blank');
	    } finally {
		    loaderButton.value = false
	    }
    }

</script>
