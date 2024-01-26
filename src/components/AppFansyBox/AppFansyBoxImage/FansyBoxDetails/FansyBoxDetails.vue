<template>
    <AppPopup class="fancybox-item__details popup_actions" :closeByClick="true">
        <template #summary>
            <IconDots />
        </template>
        <template #content>
            <PopupOption class="popup__option-open__fancyBox" data-fancybox="gallery" :href="props.image.file">
                Посмотреть
            </PopupOption>
            <PopupOption @click="() => callActionDetails('downloadFile')">
                Скачать
            </PopupOption>
            <PopupOption class="popup__option_red" @click="() => callActionDetails('deleteFile')">
                Удалить
            </PopupOption>
        </template>
    </AppPopup>
</template>

<script setup>
    import './FansyBoxDetails.scss';

    import {computed, ref} from "vue";

    import IconDots from '@/components/AppIcons/Dots/Dots.vue'
    import PopupOption from "@/components/AppPopup/PopupOption/PopupOption.vue";
    import AppPopup from "@/components/AppPopup/Popup.vue";

    const emit = defineEmits([
        'callAction'
    ])

    const fansyBoxRef = ref()

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
        }
    })

    const hideDetailsElement = (element) => {
        if (element != null) {
            element.removeAttribute('open')
        }
    }

    // Закрытие модалки
    const hideDetails = (event) => {
        hideDetailsElement(fansyBoxRef.value)
        openDetails(event, false)
    }

    const openDetails = (event, status) => {
        if (status) {
            setTimeout(() => {
                event.target.closest('.item__value-img-details').classList.add('item__value-img-details_open')
            }, 100);
        } else {
            document.querySelectorAll('.item__value-img-details_open').forEach(elem => {
                elem.classList.remove('item__value-img-details_open')
            })
        }
    }

    const downloadFile = async (imageSrc, nameOfDownload = 'my-image.png') => {
        const response = await fetch(imageSrc, {
            method: 'GET',
            headers: {
                accept: 'application/json',
            },
        });

        const blobImage = await response.blob();

        const href = URL.createObjectURL(blobImage);

        const anchorElement = document.createElement('a');
        anchorElement.href = href;
        anchorElement.download = nameOfDownload;

        document.body.appendChild(anchorElement);
        anchorElement.click();

        document.body.removeChild(anchorElement);
        window.URL.revokeObjectURL(href);
    }

    const findImage = computed(() => {
        return ['png', 'svg', 'jpeg', 'jpg', 'webp', 'pdf', 'gif'].includes(props.image.extension)
    })

    const callActionDetails = (action) => {
        switch (action) {
            case 'downloadFile':
                downloadFile(props.image.file)
                break
            case 'deleteFile':
                emit('callAction', {action: 'deleteImage', item: {item: props.item, elem: props.image}})
                break
        }

        fansyBoxRef.value.classList.remove('item__value-img-details_open')
    }

</script>
