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

        <div
            v-if="props.buttonImage === null"
            class="file-upload__button"
        >
            <LoadFile v-if="!props.otherIcon" />
            <component v-else :is="props.otherIcon" />

            <span class="file-upload__button-title">
                {{ props.buttonTitle }}
            </span>
        </div>

        <div
            v-else
            class="file-upload__image-wrapper"
        >
            <img
                class="file-upload__image"
                :src="props.buttonImage"
                :alt="props.buttonTitle"
            />

            <IconClose
                title="Удалить иконку"
                @click.prevent="emit('deleteFile')"
            />
        </div>
    </div>
</template>

<script setup>
    import './Upload.scss';

    import LoadFile from "@/components/AppIcons/LoadFile/LoadFile.vue";
    import Input from "@/components/AppAutocomplete/Input/Input.vue";
    import IconClose from "@/components/AppIcons/Close/Close.vue";
    import {ref} from "vue";

    const props = defineProps({
        isMultiple: {
            default: false,
            type: Boolean
        },
        buttonTitle: {
            default: 'Загрузить',
            type: String
        },
        otherIcon: {
            default: null,
            type: Object
        },
        buttonImage: {
            default: null,
            type: String
        }
    })

    const emit = defineEmits([
        'callAction'
    ])

    const dragover = ref(false)

    // Добавление файлов
    const addFiles = (event) => {
        dragover.value = false
        emit('callAction', { action: 'addFiles', value: event.target.files })
    }
</script>