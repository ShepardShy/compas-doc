<template>
    <AppFansyBoxContainer>
        <div class="form__item-content-list" v-if="props.item.value.length > 0">
            <AppFansyBoxImage
                v-for="image in props.item.value"
				:key="image.id"
                :image="image"
                :item="props.item"
            />
        </div>
    </AppFansyBoxContainer>
</template>

<script setup>
    import './AppFansyBox.scss';

    import AppFansyBoxContainer from './AppFansyBoxContainer/AppFansyBoxContainer.vue';
    import AppFansyBoxImage from './AppFansyBoxImage/AppFansyBoxImage.vue';

    const props = defineProps({
        item: {
            default: {
                "id": 0,
                "title": "Undefined title",
                "typeComponent": "file",
                "type": "file",
                "isMobile": true,
                "key": "",
                "focus": false,
                "options": null,
                "value": [
                    {
                    "id": 0,
                    "url": "/",
                    "file": "/",
                    "extension": "svg",
                    "sort": 0,
                    "uid": 0,
                    "status": "success"
                    }
                ],
                "limit": 15,
                "subfields": null,
                "otherTitle": "загрузить файл и тестовое значение"
                },
            type: Object
        }
    })
</script>
