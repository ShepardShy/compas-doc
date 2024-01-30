<template>
    <div
        class="file-upload"
        :class="dragover ? 'file-upload_dragover' : ''"
    >
        <input
            type="file"
            class="file-upload__input"
            :multiple="props.isMultiple"
            @dragover="dragover = true"
            @dragenter="dragover = true"
            @dragleave="dragover = false"
            @change="(event) => changeValue(event)"
            :title="props.buttonTitle"
        >

        <div class="file-upload__button">
            <LoadFile />
            <span class="file-upload__button-title">
                {{ props.buttonTitle }}
            </span>
        </div>
    </div>
</template>

<script setup>
    import './Upload.scss';

    import {inject, ref} from "vue";

    import UploadScripts from './UploadScripts.js'

    import LoadFile from "@/components/AppIcons/LoadFile/LoadFile.vue";
    import Input from "@/components/AppAutocomplete/Input/Input.vue";

    const props = defineProps({
        isMultiple: {
            default: false,
            type: Boolean
        },
        buttonTitle: {
            default: 'Загрузить',
            type: String
        }
    })

    const dragover = ref(false)
    const values = inject('values')

    // Добавление файлов
    const changeValue = (event) => {
        dragover.value = false

        event.target.files.forEach(async (file) => {
            const formData = new FormData()
            const id = new Date().getTime()
            formData.append('files[]', file)
            formData.append('uid', id)

            await uploadFile(formData, id)
        })
    }

    // Загрузка файлов
    const uploadFile = async (data, id) => {
        UploadScripts(id, values, 'ready');

        try {
            const ajax = new XMLHttpRequest();
            const localItem = values.value.find(item => item.id == id)

            // Событие процесса загрузки файла
            ajax.upload.onprogress = function(event) {
                if (event.lengthComputable) {
                    localItem.progress = (event.loaded / event.total) * 100;
                } else {
                    console.log('error', 'lengthComputable = ', event.lengthComputable);
                }
            };

            // Событие окончания загрузки файла
            ajax.onloadend = function() {
                if (ajax.status == 200) {
                    const responseObj = JSON.parse(ajax.response)[0];

                    localItem.status = 'success';
                    localItem.extension = responseObj.file.extension;
                    localItem.file = responseObj.file.file;
                    localItem.id = responseObj.file.id;
                    localItem.name = responseObj.file.name;
                    localItem.sort = responseObj.file.sort;
                    localItem.url = responseObj.file.url;
                } else {
                    UploadScripts(id, values, 'fail');
                    console.log('error', ajax.response);
                }
            };

            ajax.open('POST', 'https://opt6.compas.pro/api/files/store', true);

            ajax.setRequestHeader("Authorization", `Bearer ${import.meta.env.VITE_USER_TOKEN}`);

            ajax.send(data);
        } catch (error) {
            console.log(error);
        }
    }
</script>