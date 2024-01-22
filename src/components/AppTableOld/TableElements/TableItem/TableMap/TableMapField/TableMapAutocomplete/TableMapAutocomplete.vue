<template>
    <AppAutocompleteInput
        class="table__item-map-autocomplete"
        :id="`map-autocomplete_${props.item.id}`"
        :item="mapValue"
        :optionLoader="optionLoader"
        @findTitle="(data) => findGeoposition(data)"
        @changeValue="(data) => changeValue(data)"
    />
</template>

<script setup>
    import './TableMapAutocomplete.scss';

    import AppAutocompleteInput from '@/components/AppAutocomplete/AppAutocompleteInput/AppAutocompleteInput.vue';
    import _ from 'lodash'
    import { useUserStore } from '@/stores/userStore.js'
    const userStore = useUserStore()
    let optionLoader = ref(false)

    const props = defineProps({
        item: {
            default: {

            },
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
                text: [null, undefined].includes(props.item.value) ? null : props.item.value.text,
                coords: props.item.value.coords
            }
        })
    }

    const changeValue = async (data) => {
        let request = await fetch(`https://opt6.compas.pro/api/map/geocode?address=${new URLSearchParams(data.item_id).toString()}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${userStore.userToken}`,
            }
        })

        let response = await request.json()
        mapValue.value.value = data.item_id
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
        if ([null, undefined].includes(props.item.value)) {
            mapValue.value.value = null
        } else {
            mapValue.value.value = props.item.value.text
        }
        mapValue.value.focus = props.item.focus
    })
</script>
