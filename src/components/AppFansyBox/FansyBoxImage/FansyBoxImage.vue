<template>
    <div class="fancybox-item fancybox__item" @mouseover="(event) => checkingBlock(event)">
        <a class="fancybox-item__link" :data-fancybox="`galleryClick_${props.id}`" :href="setHref">
            <figure class="ibg fancybox-item__img">
                <img :src="props.image.url" :alt="props.image.name"/>
            </figure>

            <LoaderProgress
                v-if="props.loading"
                :progressImage="progressImage"
            />
        </a>

        <FansyBoxDetails 
            :id="props.id"
            :image="props.image"
            @callAction="(data) => emit('callAction', data)"
        />

        <div
            v-if="props.isShowFileName && ![null, undefined].includes(props.image.name)"
            class="fancybox-item__title"
        >
            {{ setName }}
        </div>
    </div>
</template>

<script setup>
    import './FansyBoxImage.scss';

    import {computed} from "vue";

    import FansyBoxDetails from './FansyBoxDetails/FansyBoxDetails.vue';
    import LoaderProgress from "@/components/AppIcons/LoaderProgress/LoaderProgress.vue";
    
    const props = defineProps({
        id: {
            default: 0,
            type: Number
        },
        isShowFileName: {
            default: false,
            type: Boolean
        },
        image: {
            default: {
                id: 1649,
                url: "/",
                file: "/",
                extension: "png"
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

    // Задаем название файла
    const setName = computed(() => {
        if (props.id != undefined && props.image.name != undefined) {
            let name = props.image.name

            // Проверка на присутствие расширения в названии и добавление в случае его отсутствия
            const regExp = new RegExp(`\\.${props.image.extension.toLowerCase()}$`)
            if (!regExp.test(name.toLowerCase())) {
                name += `.${props.image.extension}`
            }

            // Обрезание середины текста в названии
            if (name.length > 22) {
                return `${name.substr(0,9)}...${name.substr(name.length - 7)}`
            } else {
                return name
            }
        } else {
            return null
        }
    })

    // Задаем ссылку
    const setHref = computed(() => {
        return ['png', 'svg', 'jpeg', 'jpg', 'webp', 'pdf', 'gif', 'mp4', 'mov', 'mp3'].includes(props.image.extension) ? props.image.file : props.image.url
    })

    // Проверка блока на состояние перетаскивания
    const checkingBlock = (event) => {
        if (event.target.closest('.fancybox__item-details')) {
            event.target.closest('.form-item__file').classList.add('file-list__item_undraggable')
        } else {
            event.target.closest('.form-item__file').classList.remove('file-list__item_undraggable')
        }
    }

    // Задаем прогресс загрузки
    const progressImage = computed(() => {
        return props.image.progress ? 62.8 - props.image.progress / 100 * 62.8 : 62.8
    })
</script>