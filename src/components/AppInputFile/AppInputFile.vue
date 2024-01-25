<template>
    <div class="form__item" ref="uploadInput" :class="props.item.required ? 'form__item--required' : ''">
        <AppInputFileLabel
            :item="props.item"
        />

        <div class="form__item-file-content">
<!--            <AppInputFileField-->
<!--                :item="props.item"-->
<!--                :value="props.item.value"-->
<!--                :limit="props.item.limit"-->
<!--                :buttonTitle="props.item.otherTitle"-->
<!--                @callAction="(data) => $emit('callAction', data)"-->
<!--                @changeValue="(data) => $emit('changeValue', data)"-->
<!--            />-->

            <AppInputFileFieldClone
                :item="codeProps"
                :value="props.item.value"
                :limit="props.item.limit"
                :buttonTitle="props.item.otherTitle"
                @callAction="data => $emit('callAction', data)"
                @changeValue="(data) => $emit('changeValue', data)"
            />
        </div>
    </div>
</template>

<script setup>
    import './AppInputFile.scss';

    import AppInputFileLabel from './AppInputFileLabel/AppInputFileLabel.vue'
    import AppInputFileFieldClone from './AppInputFileField/AppInputFileField.vue'
    import codeProps from '@/data/file/codeProps.json'

    import {ref} from "vue";

    const uploadInput = ref(null)

    const props = defineProps({
        item: {
            default: {
                "id": 1517,
                "title": "Undefined title",
                "type": "file",
                "isMobile": true,
                "key": "",
                "limit": 1,
                "options": null,
                "focus": true,
                "value": null,
                "otherTitle": "",
                "subfields": null
            },
            type: Object
        }
    })
</script>
