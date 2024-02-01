<template>
    <FansyBox
        class="file__container file-container"
        :class="setClasses"
    >
        <draggable
            tag="div"
            v-model="values"
            class="file__list file-list"
            :class="props.isShowFileName ? 'file-list_show-title' : ''"
            :forceFallback="true"
            :itemKey="'fileFields'"
            :key="props.item.key"
            :disabled="props.isOneFile"
            handle=".fancybox-item__link"
            draggable=".file-list__item:not(.file-list__item_undraggable)"
            @end="() => callAction(null)"
        >
            <template #item="{ element: image }" >
                <FansyBoxImage
                    v-if="Object.keys(image).length !== 0"
                    class="file-list__item"
                    :id="props.item.id"
                    :isShowFileName="props.isShowFileName"
                    :isOneFile="props.isOneFile"
                    :image="image"
                    :loading="image.status == 'loading'"
                    :class="image.status == 'loading' ? 'file-list__item_loading' : ''"
                    @callAction="(data) => callAction(data)"
                />

                <FileUpload
                    v-else-if="!props.isReadOnly && !props.isOneFile"
                    :buttonTitle="props.item.buttonName"
                    :isMultiple="props.isMultiple"
                    @callAction="(data) => callAction(data)"
                />
            </template>
        </draggable>

        <div class="file-container__circle">
            {{ values.length }}
        </div>
    </FansyBox>
</template>

<script setup>
    import './FileField.scss';

    import draggable from 'vuedraggable'
    import {computed, provide, ref, watch} from "vue";

    import FansyBox from '@/components/AppFansyBox/FansyBox.vue';
    import FansyBoxImage from '@/components/AppFansyBox/FansyBoxImage/FansyBoxImage.vue';
    import FileUpload from "@/components/AppInputs/File/FileUpload/FileUpload.vue";

    const emit = defineEmits([
        'changeValue'
    ])

    const props = defineProps({
        item: {
            default: {
                id: 1517,
                title: "Undefined title",
                type: "file",
                key: "",
                required: false,
                options: null,
                focus: true,
                value: null,
                buttonName: "",
            },
            type: Object
        },
        isReadOnly: {
            default: false,
            type: Boolean
        },
        isShowFileName: {
            default: false,
            type: Boolean
        },
        isMultiple: {
            default: false,
            type: Boolean
        },
        isOneFile: {
            default: false,
            type: Boolean
        }
    })

    // Получение значении
    const getValues = () => {
        if ([null, undefined].includes(props.item.value) || !Array.isArray(props.item.value)) {
            return [{}]
        } else {
            const localValues = props.item.value == null ? [] : props.item.value.filter(p => ![null, undefined].includes(p) && !Array.isArray(p) && Object.keys(p).length !== 0 && typeof p != 'string')
            return JSON.parse(JSON.stringify([...localValues, {}]))
        }
    }

    const values = ref(getValues())

    const setClasses = computed(() => {
        return [
            values.value.length === 1 && props.isReadOnly ? 'file-container_empty' : '',
            props.isOneFile ? 'file-container_one-file' : ''
        ]
    })

    // Вызов деиствий и изменение значений
    const callAction = (data) => {
        const currentImage = data ? values.value.find(item => item.id === data.value.id) : null

        const downloadFile = async (imageSrc, nameOfDownload = 'my-image.png') => {
            try {
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
            } catch (error) {
                console.log(error);
            }
        }

        const preAddImage = () => {
            const downloadingItem = {
                id: data.value,
                name: "Загрузка",
                preview: null,
                file: null,
                extension: '',
                status: 'loading'
            }

            values.value.splice(values.value.length - 1, 0, downloadingItem);
        }

        const addImage = () => {
            const image = data.value.image;

            currentImage.status = 'success';
            currentImage.extension = image.extension;
            currentImage.file = image.file;
            currentImage.id = image.id;
            currentImage.name = image.name;
            currentImage.sort = image.sort;
            currentImage.preview = image.preview;
        }

        const deleteImage = () => {
            values.value = values.value.filter(item => Object.keys(item).length === 0 || item.id !== data.value)
        }

        if (data !== null) {
            switch (data.action) {
                // Скачивание файла
                case 'downloadFile':
                    downloadFile(currentImage.file);
                    break;

                // Добавление загружаемого изображения
                case 'preAddImage':
                    preAddImage();
                    break;

                // Добавление успешно загруженного изображения
                case 'addImage':
                    addImage();
                    break;

                // Локальное удаление эллемента
                case 'deleteImage':
                    deleteImage();
                    break;

                default:
                    break;
            }
        }

        if (data == null || ['addImage', 'deleteImage'].includes(data.action)) {
            emit('changeValue', { key: props.item.key, value: values.value.filter(item => Object.keys(item).length !== 0) })
        }
    }

    provide('values', values)

    watch(() => props.item.value, () => {
        values.value = getValues()
    })

</script>
