<template>
    <FansyBox
        class="file__container file-container form-item__value"
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
            @end="(event) => callAction(event)"
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

                <Upload
                    v-else-if="!props.isReadOnly"
                    :buttonTitle="props.item.buttonName"
                    :isMultiple="props.isMultiple"
                    @callAction="(data) => callAction(data)"
                />
            </template>
        </draggable>

        <div class="file-container__circle" v-if="props.isOneFile && props.isReadOnly && values.length > 2">
            {{ values.length - 1 }}
        </div>
    </FansyBox>
</template>

<script setup>
    import './Field.scss';

    import draggable from 'vuedraggable'

    // import {useUserStore} from "~/stores/userStore";
    // import commonScripts from "~/commonScripts/commonScripts";

    import {toast} from 'vue3-toastify';

    import FansyBox from '@/components/AppFansyBox/FansyBox.vue';
    import FansyBoxImage from '@/components/AppFansyBox/FansyBoxImage/FansyBoxImage.vue';
    import Upload from "../Upload/Upload.vue";
    import {computed, ref, watch} from "vue";

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

    const emit = defineEmits([
        'changeValue',
        'initEdit'
    ])

    // const userStore = useUserStore()

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
            values.value.length === 1 && props.isReadOnly ? 'form-item__value_empty' : '',
            props.isOneFile ? 'file-container_one-file' : ''
        ]
    })

    // Вызов деиствий и изменение значений
    const callAction = (data) => {
        const supportedExtensions = ['png', 'svg', 'jpeg', 'jpg', 'webp', 'pdf', 'gif', 'mp4', 'xlsx', 'mp3', 'doc', 'docx', 'txt', 'pptx'];

        // Изменение значений в сторе
        const changeValue = () => {
            emit('changeValue', { key: props.item.key, value: values.value.filter(item => Object.keys(item).length !== 0) })
        }

        // Скачивание файла
        const downloadFile = async () => {
            const imageSrc = data.value.file;
            const nameOfDownload = [null, undefined].includes(data.value.name) || data.value.name !== '' ? data.value.name : 'my-image.png'

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

        // Добавление загружаемого изображения
        const preAddImage = (id) => {
            const downloadingItem = {
                id: id,
                name: "Загрузка",
                url: null,
                file: null,
                extension: '',
                status: 'loading'
            }

            values.value.splice(values.value.length - 1, 0, downloadingItem);
        }

        // Добавление успешно загруженного изображения
        const addImage = (image, id) => {
            const currentImage = values.value.find(item => item.id == id);

            currentImage.id = image.id;
            currentImage.name = image.name;
            currentImage.url = image.url;
            currentImage.file = image.file;
            currentImage.extension = image.extension;
            currentImage.status = 'success';

            changeValue();
        }

        // Локальное удаление эллемента
        const deleteFile = (id) => {
            values.value = values.value.filter(item => Object.keys(item).length === 0 || item.id !== id);
            changeValue();
        }

        // Загрузка файлов
        const uploadFile = async (data, id) => {
            preAddImage(id)

            const ajax = new XMLHttpRequest();
            const localItem = values.value.find(item => item.id == id)

            // Отслеживание прогресса загрузки файла
            ajax.upload.onprogress = function(event) {
                localItem.progress = (event.loaded / event.total) * 100;
            };

            // Событие окончания загрузки файла
            ajax.onloadend = function() {
                try {
                    const responseObj = JSON.parse(ajax.response)[0];
                    addImage(responseObj, id);
                } catch (error) {
                    deleteFile(id)
                    console.log('error', error);
                }
            };

            ajax.open('POST', 'https://opt6.compas.pro/api/files/store', true);

            ajax.setRequestHeader("Authorization", `Bearer ${import.meta.env.VITE_USER_TOKEN}`);

            ajax.send(data);
        }

        // Добавление файлов
        const addFiles = () => {
            data.value.forEach(async (file) => {
                if (!supportedExtensions.includes(file.name.split('.').splice(-1)[0])) {
                    // Здесь должен использоваться toast
                    // await commonScripts.showNotification({
                    //     title: 'Ошибка загрузки файла',
                    //     description: `Поддерживаемыей файлы ${supportedExtensions.join(', ')}`
                    // }, 'error')
                    return
                }

                const formData = new FormData()
                const id = new Date().getTime()
                formData.append('files[]', file)

                await uploadFile(formData, id)
            })
        }

        switch (data.action) {
            case 'addFiles':
                addFiles();
                break;

            case 'downloadFile':
                downloadFile();
                break;

            case 'deleteFile':
                deleteFile(data.value);
                break;

            default:
                emit('initEdit', data)
                changeValue();
                break;
        }
    }

    watch(() => props.isReadOnly, () => {
        values.value = getValues();
    })

</script>
