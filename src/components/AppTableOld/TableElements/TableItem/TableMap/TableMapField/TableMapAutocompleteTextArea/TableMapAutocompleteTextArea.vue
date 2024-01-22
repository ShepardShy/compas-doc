<template>
    <div class="table__item-content select">
        <div class="form-item__title">
            {{ props.item.title }}
        </div>
        <AppAutocompleteTextarea
            class="table__item-map-autocomplete"
            :id="`map-autocomplete_${props.item.id}`"
            :item="mapValue"
            :optionLoader="optionLoader"
            @findTitle="(data) => findGeoposition(data)"
            @changeValue="(data) => changeValue(data)"
        />

	    <AppCopy
		    v-if="saveValueForCopy != null && saveValueForCopy != ''"
		    class="button-text__action"
		    :text="saveValueForCopy"
            :buttonTitle="'Скопировать адрес'"
	    />
    </div>
</template>

<script setup>
    import './TableMapAutocompleteTextArea.scss';
    import AppAutocompleteTextarea from '@/components/AppAutocomplete/AppAutocompleteTextarea/AppAutocompleteTextarea.vue'
    import _ from 'lodash'
    import { useUserStore } from '@/stores/userStore.js'
    const userStore = useUserStore()
    let optionLoader = ref(false)

    const props = defineProps({
        item: {
            default: {},
            type: Object
        }
    })

    const emit = defineEmits([
        'changeValue'
    ])

    let mapValue = ref({
        value: '',
        placeholder: '',
        options: []
    })

    const saveValueForCopy = ref()

    // Тротлинг инпута
    const throt_fun = _.throttle(async function (data) {
        try {
            optionLoader.value = true
            let request = await fetch(`https://opt6.compas.pro/api/map/suggest?address=${new URLSearchParams(data.value).toString()}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${userStore.userToken}`,
                }
            })
            let response = await request.json()
            mapValue.value.options = []
            for (let item of response) {
                mapValue.value.options.push({
                    label: item,
                    value: item
                })
            }
        } catch (error) {
            console.log(error);
        } finally {
            optionLoader.value = false
        }
    }, 1000);

    const findGeoposition = async (data) => {
        mapValue.value.value = data.value
        throt_fun(data)
        emit('changeValue', {
            id: props.item.id,
            key: props.item.key,
            value: {
                search: data.value,
                text: props.item.value == null || props.item.value.text == undefined ? null : props.item.value.text,
                coords: props.item.value == null || props.item.value.coords == undefined ? null : props.item.value.coords.reverse()
            }
        })
    }

    const changeValue = async (data) => {
        mapValue.value.value = data.item_id
        let request = await fetch(`https://opt6.compas.pro/api/map/geocode?address=${new URLSearchParams(data.item_id).toString()}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${userStore.userToken}`,
            }
        })
        let response = await request.json()
        emit('changeValue', {
            id: props.item.id,
            key: props.item.key,
            value: {
                text: response[0].text,
                coords: response[0].coords.reverse()
            }
        })
    }

    onMounted(() => {
        if (typeof props.item.value == 'string' && props.item.value != 'не заполнено') {
            mapValue.value.value = props.item.value
	        saveValueForCopy.value = props.item.value
        } else {
            mapValue.value.value = [null, undefined, 'не заполнено'].includes(props.item.value) ? '' : props.item.value.text
        }
    })

    // Отслеживаение изменений состояния поля
    watch(() => props.item.state, () => {
	    saveValueForCopy.value = mapValue.value.value
    })

</script>
