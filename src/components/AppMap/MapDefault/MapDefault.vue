<template>
    <div class="map">
        <MapDefaultTop
            v-if="props.isSelectSeveral"
            :drawButtonActive="drawButtonActive"
        />

        <div class="map__wrapper">
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
                    v-for="(marker, index) in props.markers"
                    :key="index"
                    :settings="{
                        coordinates: marker.label.coords,
                    }"
                >
                    <div class="marker"></div>
                </YandexMapMarker>

                <YandexMapControls :settings="{ position: 'left' }">
                    <YandexMapZoomControl :settings="{ easing: 'linear' }"/>
                </YandexMapControls>

                <YandexMapListener
                    :settings="{
                        onMouseMove: drawingMouse
                    }"
                />

                <YandexMapControls v-if="aloneItem && !props.isSelectSeveral" :settings="{ position: 'bottom right' }">
                    <YandexMapControlButton>
                        <a
                            :href="`https://maps.yandex.ru/?text=${aloneItem == null ? '55.755864+37.617698' : aloneItem.label.coords.join('+')}`"
                            target="_blank"
                        >
                            Открыть в Яндекс.Картах
                        </a>
                    </YandexMapControlButton>
                </YandexMapControls>

                <YandexMapFeature
                    v-model="testPol"
                    :settings="POLYLINE1"
                />
            </YandexMap>

            <canvas
                v-if="props.isSelectSeveral"
                id="draw-canvas"
                style="position: absolute; left: 0; top: 0; display: none;"
            ></canvas>
        </div>
    </div>
</template>

<script setup>
    import './MapDefault.scss'

    import {
        YandexMap,
        YandexMapControlButton, YandexMapControls,
        YandexMapDefaultFeaturesLayer,
        YandexMapDefaultSchemeLayer, YandexMapFeature, YandexMapListener, YandexMapMarker, YandexMapZoomControl
    } from "vue-yandex-maps";
    import {computed, ref, shallowRef} from "vue";
    import MapDefaultTop from "@/components/AppMap/MapDefault/MapDefaultTop/MapDefaultTop.vue";

    const props = defineProps({
        markers: {
            default: [],
            type: Array
        },
        isSelectSeveral: {
            default: false,
            type: Boolean
        }

    })

    const aloneItem = computed(() => {
        return props.markers.length === 1 ? props.markers[0] : null
    })

    const map = shallowRef(null)

    const drawButtonActive = ref()

    const POLYLINE1 = {
        id: 'one',
        draggable: true,
        geometry: {
            type: 'LineString',
            coordinates: [
                // Specify the coordinates of the vertices of the polyline.
                [37.5, 55.7],
                [37.4, 55.8],
                [37.5, 55.8],
                [37.4, 55.7],
            ],
        },
        style: { stroke: [{ color: '#f00', width: 4 }] },
    }

    const testPol = shallowRef(null)

    console.log('map', map)
    console.log('map', testPol)

    const drawingMouse = (object, event) => {
        console.log('object', object)
        console.log('event', event)
    }
</script>