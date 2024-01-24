<template>
    <el-upload
        v-model:file-list="fileList"
        class="input__file-list"
        :class="[fileList.length == 0 ? 'input__file--empty' : '', props.item.show_file_name ? 'input__file_list_desc' : '']"
        :drag="true"
        list-type="picture-card"
        :multiple="true"
        :http-request="(e) => uploadFile(e)"
        :on-change="(e) => changeValue(e)"
    >
        <el-button class="input__file-button" type="primary">
            <IconLoadFile />
            <span class="input__file-button-title">
                {{ props.buttonTitle }}
            </span>
        </el-button>
    </el-upload>
</template>

<script setup>
    import './AppInputFileField.scss';
    import IconLoadFile from '@/components/AppIcons/IconLoadFile/IconLoadFile.vue';

    import selectedObjectOther from '@/stores/selectedObjectScripts/selectedObjectOther';

    let fileList = ref([]);

    const uploadFile = async (event) => {
        let formData = new FormData()
        formData.append('files[]', event.file)
        formData.append('uid', event.file.uid)
        let response = await selectedObjectOther.uploadFile(formData)
        response.file.status = 'success'
        emit('changeValue', response)
    }

    // Локальный вывод данных в консоль
    const changeValue = (event) => {
        if (event.status == 'success') {
        } else {
            emit('changeValue', event)
        }
    }

    const emit = defineEmits([
        'changeValue',
        'callAction'
    ])

    onMounted(() => {
        if (props.value == null || props.value == undefined || props.value == '' || props.value.length == 0) {
            fileList.value = []
        } else {
            fileList.value = props.value
        }
    })

    watch(() => props.value, () => {
        if (props.value && props.value.length == 0 || props.value == null) {
            fileList.value = []
        } else {
            fileList.value = props.value
        }
    })

    const props = defineProps({
        item: {
            default: {},
            type: Object
        },
        value: {
            default: {},
            type: Object
        },
        buttonTitle: {
            default: "",
            type: String
        },
        limit: {
            default: 1,
            type: Number
        }
    })

    const transformWeight = (weight) => {
        return (weight / 1024).toFixed(0)
    }
</script>




