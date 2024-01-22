<template>
    <TableMapAutocomplete
        v-if="props.item.state == 'edit'"
        :item="props.item"
        @changeValue="(data) => changeValue(data)"
    />

	<div v-else class="item__value-wrapper">
		<span class="item__value" :class="setClasses">
	        {{ getValue() }}
	    </span>
	</div>

	<AppCopy
		v-if="saveValueForCopy != null && saveValueForCopy != '' && saveValueForCopy != 'не заполнено'"
		class="button-text__action"
		:text="saveValueForCopy"
        :buttonTitle="'Скопировать адрес'"
	/>

    <YandexMap
        :coordinates="coords == undefined || coords.length == 0 ? [55.755864, 37.617698] : [...coords.map(Number)]"
        :zoom="17"
        :panOptions="{
            duration: 0
        }"
	    :controls="['zoomControl', 'typeSelector']"
    >
        <YandexMarker
            v-if="setMarkers.length > 0"
            v-for="(marker, index) in setMarkers"
            :marker-id="index"
            :coordinates="marker"
        />
    </YandexMap>

	<a :href="`https://maps.yandex.ru/?text=${coords == undefined || coords.length == 0 ? '55.755864+37.617698' : coords.join('+')}`" target="_blank" class="yandex-container__custom-button">Открыть в Яндекс.Картах</a>
</template>

<script setup>
    import './TableMapField.scss';
    import '@/components/AppTable/TableElements/TableItem/TableItem.scss';

    import {YandexMap, YandexMarker} from 'vue-yandex-maps'
    import TableMapAutocomplete from './TableMapAutocomplete/TableMapAutocomplete.vue'

    import TableItemScripts from '~/components/AppTable/TableItemScripts';
    import AppCopy from "~/components/AppCopy/AppCopy.vue";

    let coords = ref([55.755864, 37.617698])

    const getValue = () => [null, undefined].includes(props.item.value) || props.item.value == '' ? 'не заполнено' : props.item.value.text

    const setValue = computed(() => {
        if ([null, undefined].includes(props.item.value)) {
            return 'не заполнено'
        } else {
            return [null, undefined].includes(props.item.value.text) ? 'не заполнено' : props.item.value.text
        }
    })

    const saveValueForCopy = ref(getValue())

    const changeValue = (data) => {
        coords.value = data.value.coords == undefined ? [] : [data.value.coords]
        emit('changeValue', data)
    }

    const emit = defineEmits([
        'changeValue'
    ])

    onMounted(async () => {
        coords.value = [null, undefined, 'не заполнено'].includes(props.item.value) || props.item.options == null ? [55.755864, 37.617698] : props.item.options[0]
    })

    watch(() => props.item.value, () => {
        coords.value = props.item.value ? props.item.options == undefined ? [] : props.item.options[0] : [55.755864, 37.617698]
    }, {deep: true})

    watch(() => props.item.state, () => {
	    saveValueForCopy.value = getValue()
    })

    const setMarkers = computed(() => {
        let data = []
        if ([null, undefined].includes(props.item.options) || props.item.options.filter(p => p != null && p != undefined).length === 0) {
            return []
        } else {
            for (let option of props.item.options) {
                data.push(option)
            }
            return data.filter(p => p != null && p != undefined)
        }
    })

    const props = defineProps({
        item: {
            default: {},
            type: Object
        }
    })

    const setClasses = computed(() => {
        return TableItemScripts.setClasses(props.item)
    })
</script>

