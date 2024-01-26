<template>
    <div class="fancybox-item fancybox__item" @mouseover="(event) => checkingBlock(event)" :class="props.item.show_file_name ? 'fancybox-item_show-title' : ''">
        <a class="fancybox-item__container" :data-fancybox="`galleryClick_${props.item.id}`" :href="setHref">
            <figure class="ibg fancybox-item__img">
                <img :src="props.image.url" width="200" height="150" :alt="props.item.show_file_name"/>
            </figure>

            <LoaderProgress
                v-if="props.loading"
                :progressImage="progressImage"
            />
        </a>

        <FansyBoxDetails 
            :item="props.item"
            :image="props.image"
            @callAction="(data) => emit('callAction', data)"
        />

        <div
            v-if="props.item.show_file_name && ![null, undefined].includes(props.image.name)"
            class="fancybox-item__title"
        >
            {{ setName }}
        </div>
    </div>
</template>

<script setup>
    import './AppFansyBoxImage.scss';

    import {computed} from "vue";
    import FansyBoxDetails from './FansyBoxDetails/FansyBoxDetails.vue';
    import LoaderProgress from "@/components/AppIcons/LoaderProgress/LoaderProgress.vue";
    
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

    const emit = defineEmits([
        'callAction'
    ])

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

    const setHref = computed(() => {
        return ['png', 'svg', 'jpeg', 'jpg', 'webp', 'pdf', 'gif', 'mp4', 'mov', 'mp3'].includes(props.image.extension) ? props.image.file : props.image.url
    })

    const checkingBlock = (event) => {
        if (event.target.closest('.fancybox__item-details')) {
            event.target.closest('.form-item__file').classList.add('file-list__item_undraggable')
        } else {
            event.target.closest('.form-item__file').classList.remove('file-list__item_undraggable')
        }
    }

    const progressImage = computed(() => {
        return props.image.progress ? 62.8 - props.image.progress / 100 * 62.8 : 62.8
    })
</script>
