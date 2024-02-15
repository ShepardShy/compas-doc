<template>
    <div class="map">
        <MapDefaultTop
            v-if="props.isSelectSeveral"
            :drawButtonActive="drawButtonActive"
            @drawButton="(status) => drawButton(status)"
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

<!--                <YandexMapListener />-->

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
                    v-model="polygon"
                    :settings="{
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
                        style: { stroke: [{ color: '#f00', width: 4 }] }
                    }"
                />
            </YandexMap>

            <canvas
                v-if="props.isSelectSeveral"
                class="map__canvas"
                ref="mapCanvasRef"
            />
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
    import {computed, onMounted, ref, shallowRef, toRaw, watch} from "vue";
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

    const drawButtonActive = ref(false)

    const polygonOptions = {
        strokeColor: '#0000ff',
        fillColor: '#8080ff',
        interactivityModel: 'default#transparent',
        strokeWidth: 4,
        opacity: 0.7
    };

    const canvasOptions = {
        strokeStyle: '#0000ff',
        lineWidth: 4,
        opacity: 0.7
    };

    const polygon = ref(null)
    const tableDataCoords = ref([])
    const mapCanvasRef = ref(null)

    const setMarkers = () => {
        // Удаляем все маркеры сразу
        map.value.geoObjects.removeAll();

        for (let row of props.tableStore.backupTableData) {
            if (row.address.value != null && row.address.value.coords != null && row.address.value.coords != undefined) {
                let myGeoObject = new ymaps.GeoObject({
                    geometry: {
                        type: "Point",
                        coordinates: row.address.value.coords
                    }
                })

                tableDataCoords.value.push({
                    id: row.id,
                    coords: row.address.value.coords,
                    value: row.address.value.text
                })

                map.value.geoObjects.add(myGeoObject)
            }
        }
    }

    // watch(() => props.tableStore.backupTableData, () => {
    //     setMarkers()
    // })

    const drawButton = (status) => {
        const copyMap = toRaw(map.value)
        let copyPolygon = toRaw(polygon.value)
        console.log('copyMap', copyMap)
        console.log('copyPolygon', copyPolygon)

        console.log('copyMap.geoObjects', copyMap.geoObjects)

        // copyMap.geoObjects.remove(copyPolygon);


        if (status) {
            drawButtonActive.value = true
            drawLineOverMap()
                .then(function (coordinates) {
                    // Переводим координаты из 0..1 в географические.
                    const bounds = copyMap.getBounds();
                    coordinates = coordinates.map(function (x) {
                        return [
                            // Широта (latitude).
                            // Y переворачивается, т.к. на canvas'е он направлен вниз.
                            bounds[0][0] + (1 - x[1]) * (bounds[1][0] - bounds[0][0]),
                            // Долгота (longitude).
                            bounds[0][1] + x[0] * (bounds[1][1] - bounds[0][1]),
                        ];
                    });

                    // Тут надо симплифицировать линию.

                    coordinates = coordinates.filter(function (_, index) {
                        return index % 3 === 0;
                    });

                    // Удаляем старый полигон.
                    if (copyPolygon) {
                        copyMap.geoObjects.remove(copyPolygon);
                    }

                    // Создаем новый полигон
                    copyPolygon = new ymaps.Polygon([coordinates], {}, polygonOptions);
                    polygon.value = copyPolygon
                    copyPolygon.options.setParent(copyMap.options);
                    copyPolygon.geometry.setMap(copyMap);
                    copyMap.geoObjects.add(copyPolygon);
                    filterMarkers(copyPolygon)
                    drawButtonActive.value = false
                    map.value = copyMap
                });
        } else {
            // emit('filteredMarker', null)
        }
    }

    const drawLineOverMap = () => {
        const canvas = mapCanvasRef.value
        const ctx2d = canvas.getContext('2d');
        let drawing = false;
        let coordinates = [];

        // Задаем размеры канвасу как у карты.
        const rect = map.value.container.getBoundingClientRect();
        canvas.style.width = rect.width + 'px';
        canvas.style.height = rect.height + 'px';
        canvas.width = rect.width;
        canvas.height = rect.height;

        // Применяем стили.
        ctx2d.strokeStyle = canvasOptions.strokeStyle;
        ctx2d.lineWidth = canvasOptions.lineWidth;
        canvas.style.opacity = canvasOptions.opacity;

        ctx2d.clearRect(0, 0, canvas.width, canvas.height);

        // Показываем канвас. Он будет сверху карты из-за position: absolute.
        canvas.style.display = 'block';

        canvas.onmousedown = function (e) {
            // При нажатии мыши запоминаем, что мы начали рисовать и координаты.
            drawing = true;
            coordinates.push([e.offsetX, e.offsetY]);
        };

        canvas.onmousemove = function (e) {
            // При движении мыши запоминаем координаты и рисуем линию.
            if (drawing) {
                const last = coordinates[coordinates.length - 1];
                ctx2d.beginPath();
                ctx2d.moveTo(last[0], last[1]);
                ctx2d.lineTo(e.offsetX, e.offsetY);
                ctx2d.stroke();

                coordinates.push([e.offsetX, e.offsetY]);
            }
        };

        return new Promise(function (resolve) {
            // При отпускании мыши запоминаем координаты и скрываем канвас.
            canvas.onmouseup = function (e) {
                coordinates.push([e.offsetX, e.offsetY]);
                canvas.style.display = 'none';
                drawing = false;

                coordinates = coordinates.map(function (x) {
                    return [x[0] / canvas.width, x[1] / canvas.height];
                });
                resolve(coordinates);
            };
        });
    }

    const filterMarkers = (myPolygon) => {
        let data = []
        for (let marker of tableDataCoords.value) {
            if (myPolygon.geometry.contains(marker.coords)) {
                data.push(marker)
            }
        }
        // emit('filteredMarker', data)
    }
</script>