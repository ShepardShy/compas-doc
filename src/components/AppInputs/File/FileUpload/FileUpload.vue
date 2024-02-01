<template>
    <div
        class="file-upload"
        :class="dragover ? 'file-upload_dragover' : ''"
    >
        <input
            type="file"
            class="file-upload__input"
            :multiple="props.isMultiple"
            :title="props.buttonTitle"
            @dragover="dragover = true"
            @dragenter="dragover = true"
            @dragleave="dragover = false"
            @change="(event) => addFiles(event)"
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
    import './FileUpload.scss';

    import {inject, ref} from "vue";
    import {toast} from 'vue3-toastify';

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

    const emit = defineEmits([
        'callAction'
    ])

    const dragover = ref(false)
    const values = inject('values')

    // Добавление файлов
    const addFiles = (event) => {
        dragover.value = false

        event.target.files.forEach(async (file) => {
            if (!['png', 'svg', 'jpeg', 'jpg', 'webp', 'pdf', 'gif', 'mp4'].includes(file.name.split('.').splice(-1)[0])) {
                toast.error(`Формат файла ${file.name} не поддерживается`);
                return
            }

            const formData = new FormData()
            const id = new Date().getTime()
            formData.append('files[]', file)
            formData.append('uid', id)

            await uploadFile(formData, id)
        })
    }

    // Загрузка файлов
    const uploadFile = async (data, id) => {
        emit('callAction', { action: 'preAddImage', value: id })

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

                emit('callAction', { action: 'addImage', value: { id: id, image: responseObj.file } })
            } catch (error) {
                emit('callAction', { action: 'deleteImage', value: id })
                console.log('error', error);
            }
        };

        ajax.open('POST', 'https://opt6.compas.pro/api/files/store', true);

        ajax.setRequestHeader("Authorization", `Bearer ${import.meta.env.VITE_USER_TOKEN}`);

        ajax.send(data);
    }
</script>