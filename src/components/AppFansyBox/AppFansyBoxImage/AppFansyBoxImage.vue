<template>
    <div class="item__value" @mouseover ="(event) => checkingBlock(event)" :class="props.item.show_file_name ? 'item__value--high' : ''">
        <a
            :data-fancybox="`galleryClick_${props.item.id}`"
            :href="['png', 'svg', 'jpeg', 'jpg', 'webp', 'pdf', 'gif', 'mp4', 'mov', 'mp3'].includes(props.image.extension) ? props.image.file : props.image.url"
            class="item__value-link"
            @click="() => callAction(props.image)"
        >
            <figure  class='ibg item__value-img'>
                <img :src="props.image.url" width="200" height="150" />
            </figure>
        </a>

        <FansyBoxDetails 
            :item="props.item"
            :image="props.image"
            @callAction="(data) => $emit('callAction', data)"
        />

        <div class="item__value-description" v-if="props.item.show_file_name && props.image.name != undefined">
            <span v-if="props.image.progress == undefined || props.image.status != 'loading'">
                {{ setName }}
            </span>
            <span v-else>
                {{props.image.progress.loaded}}кб /  {{ props.image.progress.total }}кб
            </span>
        </div>

        <div v-if="props.loading || true">
            <svg class="progress-ring" width="24" height="24">
                <circle class="progress-ring__circle" cx="12" cy="12" r="10" style="stroke-dasharray: 62.8, 62.8; stroke-dashoffset: 32.8;"></circle>
            </svg>
        </div>
    </div>
</template>



<script setup>
    import './AppFansyBoxImage.scss';

    import FansyBoxDetails from './FansyBoxDetails/FansyBoxDetails.vue';
    import {computed} from "vue";
    
    const props = defineProps({
        image: {
            default: {
                "id": 1649,
                "url": "/",
                "file": "/",
                "extension": "png",
                "sort": 0,
                "uid": 0,
                "status": "success"
            },
            type: Object
        },
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
                "otherTitle": "Undefined title"
                },
            type: Object
        },
        loading: {
            default: false,
            type: Boolean
        }
    })

    const setName = computed(() => {
        if (props.item != undefined && props.image.name != undefined) {
            if (props.image.name.length > 22) {
                return `${props.image.name.substr(0,9)}...${props.image.name.substr(props.image.name.length - 7)}`
            } else {
                return props.image.name
            }
        } else {
            return null
        }
    })

    const checkingBlock = (event) => {
        if (event.target.closest('.item__value-img-details')) {
            event.target.closest('.item__value').classList.add('item__value--undraggable')
        } else {
            event.target.closest('.item__value').classList.remove('item__value--undraggable')
        }
    }

    const callAction = (image) => {
        const pauseVideo = () => {
            let video = document.querySelector(".fancybox__html5video")
            video.pause();
            video.currentTime = 0;
        }

        if (image.extension == 'mp4') {
            setTimeout(() => {
                pauseVideo()
            }, 400);
            setTimeout(() => {
                pauseVideo()
            }, 1000);
        }
    }
</script>
