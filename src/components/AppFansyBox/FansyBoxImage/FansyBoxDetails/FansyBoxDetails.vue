<template>
    <AppPopup class="fancybox-item__details popup_actions" :closeByClick="true">
        <template #summary>
            <IconDots />
        </template>
        <template #content>
            <PopupOption :data-fancybox="`galleryClick_${props.id}`" :href="props.image.file">
                Посмотреть
            </PopupOption>
            <PopupOption @click="() => callAction('downloadFile')">
                Скачать
            </PopupOption>
            <PopupOption class="popup__option_red" @click="() => callAction('deleteFile')">
                Удалить
            </PopupOption>
        </template>
    </AppPopup>
</template>

<script setup>
    import './FansyBoxDetails.scss';

    import IconDots from '@/components/AppIcons/Dots/Dots.vue'
    import PopupOption from "@/components/AppPopup/PopupOption/PopupOption.vue";
    import AppPopup from "@/components/AppPopup/Popup.vue";

    const emit = defineEmits([
        'callAction'
    ])

    const props = defineProps({
        image: {
            default: {
                id: 1649,
                url: "/",
                file: "/",
                extension: "png",
                uid: 0
            },
            type: Object
        },
        id: {
            default: 0,
            type: Number
        }
    })

    // Вызов действия
    const callAction = (action) => {
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

        switch (action) {
            // Скачивание файла
            case 'downloadFile':
                downloadFile(props.image.file)
                break;

            // Локальное удаление эллемента
            case 'deleteFile':
                emit('callAction', { action: 'deleteImage', item: { id: props.id, image: props.image } })
                break;
        }
    }

</script>
