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
            console.log('file', file)
            formData.append('files[]', file)
            formData.append('uid', generateUid())

            let response = await uploadFile(formData)
            response.file.status = 'success'
            emit('changeValue', response)
        })

        console.log('files', event.target.files)
    }

    // Загрузка файла на сервер
    const uploadFile = async (data) => {
        try {

            let ajax = new XMLHttpRequest();

            ajax.open("POST", "https://opt6.compas.pro/api/files/store", {
                method: 'POST',
                body: data,
                headers: {
                    Authorization: `Bearer 8XiiS7rvZ5Yus8jxIB8eRyvgFNsYC6JrknnHPO72Lvfukkg3luwBo5lS9kbL`
                }
            });

            ajax.send(data);

            ajax.onprogress = function(event) {
                console.log('event', event)
            };

            ajax.onload = function(event) {
                console.log('event', event)
            };

            // let response = await request.json()
            // return response[0]

            console.log('data', data)
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