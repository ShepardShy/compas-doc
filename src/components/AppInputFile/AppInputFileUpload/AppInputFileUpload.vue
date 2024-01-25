<template>
    <div
        class="input__file-dragger"
        :class="setClasses"
    >
        <input
            ref="inputFile"
            type="file"
            class="input__file"
            multiple
            @dragover="dragover = true"
            @dragenter="dragover = true"
            @dragleave="dragover = false"
            @change="changeValue"
        >

        <div class="input__file-button">
            <IconLoadFile />
            <span class="input__file-button-title">
                Тесто
            </span>
        </div>
    </div>
</template>

<script setup>
    import './AppInputFileUpload.scss';

    import IconLoadFile from "@/components/AppIcons/IconLoadFile/IconLoadFile.vue";
    import Input from "@/components/AppAutocomplete/Input/Input.vue";

    import AppInputFileUploadScript from './AppInputFileUploadScript.js'

    import {computed, inject, ref} from "vue";

    const dragover = ref(false)
    const inputFile = ref(null)
    const localItems = inject('localItems')

    const setClasses = computed(() => {
        return [
            dragover.value ? 'input__file-dragover' : ''
        ]
    })

    function generateUid() {
        return 'xxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 10 | 0;
            const v = c === 'x' ? r : 4; // Заменяем 'y' на 4
            return v.toString();
        });
    }

    const changeValue = (event) => {
        dragover.value = false

        event.target.files.forEach(async (file) => {
            let formData = new FormData()
            const uid = generateUid()
            formData.append('files[]', file)
            formData.append('uid', uid)

            await uploadFile(formData, file, uid)
            //response.file.status = 'success'
            //emit('changeValue', response)
        })

        console.log('files', event.target.files)
    }

    // Загрузка файла на сервер
    const uploadFile = async (data, file,uid) => {
        try {
            AppInputFileUploadScript.changeFile(uid, localItems, 'ready');

            const ajax = new XMLHttpRequest();
            const localItem = localItems.find(item => item.uid == uid)

            ajax.open('POST', 'https://opt6.compas.pro/api/files/store', true);
            ajax.setRequestHeader("Authorization", "Bearer 8XiiS7rvZ5Yus8jxIB8eRyvgFNsYC6JrknnHPO72Lvfukkg3luwBo5lS9kbL");

            ajax.send(data);

            ajax.onprogress = function(event) {
                if (event.lengthComputable) {
                    const percentComplete = (event.loaded / event.total) * 100;
                    localItem.progress = percentComplete
                    console.log('Прогресс загрузки: ' + percentComplete.toFixed(2) + '%');
                } else {
                    console.log('Невозможно вычислить прогресс загрузки, так как размер файла неизвестен.');
                }
                console.log('event', event)
            };


            ajax.onload = function(response) {
                console.log('uid', uid)
                console.log('response', response)
                // response.file.status = 'success'
                // emit('changeValue', response)
            };

            // let response = await request.json()
            // return response[0]

            // let request = await fetch('https://opt6.compas.pro/api/files/store', {
            //     method: 'POST',
            //     body: data,
            //     headers: {
            //         Authorization: `Bearer 8XiiS7rvZ5Yus8jxIB8eRyvgFNsYC6JrknnHPO72Lvfukkg3luwBo5lS9kbL`
            //     }
            // })
        } catch (error) {
            console.log(error);
        } finally {
            // store.loaderStatus = null
        }
    }
</script>