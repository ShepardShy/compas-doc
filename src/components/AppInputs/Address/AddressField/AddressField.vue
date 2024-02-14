<template>
    <div class="form-item__address-wrapper">
        <AppAutocomplete
            :item="props.item"
            :isCanCreate="false"
            :isLink="false"
            :isShowId="false"
            :isReadOnly="props.isReadOnly"
            @changeValue="(data) => emit('changeValue', (data))"
            @searchOptions="(data) => emit('searchOptions', (data))"
        />

        <!--  Изменение состояния поля  -->
        <label style="display: flex; align-items: center">
            <input type="checkbox" style="width: 20px; margin-right: 5px">
            <span>&lt;-- ЖМИ НА РЫЧАГ КРОНК</span>
        </label>

        <YandexMap
            v-model="map"
            :settings="{
                location: {
                  center: [37.455864, 55.617698],
                  zoom: 9,
                }
            }"
            width="100%"
            height="382px"
        >
            <YandexMapDefaultSchemeLayer />
            <YandexMapDefaultFeaturesLayer />

            <YandexMapMarker
                :settings="{
                    coordinates: activeOption ? activeOption.label.coords : [37.455864, 55.617698],
                }"
            >
                <div class="marker"></div>
            </YandexMapMarker>

            <YandexMapControls :settings="{ position: 'left' }">
                <YandexMapZoomControl :settings="{ easing: 'linear' }"/>
            </YandexMapControls>
        </YandexMap>

        <a
            :href="`https://maps.yandex.ru/?text=${coords === undefined || coords.length === 0 ? '55.755864+37.617698' : coords.join('+')}`"
            target="_blank"
            class="yandex-container__custom-button"
        >
            Открыть в Яндекс.Картах
        </a>
    </div>
</template>

<script setup>
    import './AddressField.scss';

    import {
        YandexMap,
        YandexMapControls, YandexMapDefaultFeaturesLayer,
        YandexMapDefaultSchemeLayer, YandexMapMarker,
        YandexMapZoomControl
    } from 'vue-yandex-maps'
    import AppAutocomplete from "@/components/AppAutocomplete/Input/Input.vue";
    import {computed, shallowRef, watch} from "vue";
    import Input from "@/components/AppAutocomplete/Input/Input.vue";

    const props = defineProps({
        item: {
            default: {
                id: 0,
                title: "Адрес",
                key: "address",
                required: false,
                value: {
                    text: "",
                    coords: [
                        "55.642606",
                        "37.547414"
                    ]
                }
            },
            type: Object
        },
        isReadOnly: {
            default: false,
            type: Boolean
        },
        isShowMap: {
            default: false,
            type: Boolean
        }
    })

    const emit = defineEmits([
        'changeValue',
        'searchOptions'
    ])

    const map = shallowRef(null)

    const activeOption = computed(() => {
        return props.item.options.find((option) => option.value === props.item.value)
    })
</script>