<template>
    <div class="h-editable_h3 h-editable">
        <AppTextarea 
            v-if="isEdit"
            :item="{
                focus: true,
                id: 0,
                placeholder: null,
                key: props.item.key,
                type: 'text',
                title: null,
                substring: null,
                required: false,
                external_link: null,
                value: localTitle,
            }"
            :disabled="false"
            :isUseEnter="false"
            :mask="null"
            :isLink="false"
            :isReadOnly="false"
            @blur="() => saveTitle()"
            @changeValue="(data) => changeValue(data)"
            @keyup.enter="() => isEdit ? saveTitle() : ''"
        />

        <AppH3 v-else>
            {{ localTitle }}
            <IconEdit @click="changeState(true)"/>
        </AppH3>
    </div>
</template>

<script setup>
    import './Editable.scss';

    import { onMounted, ref, watch } from 'vue';
    
    import AppH3 from '../H3.vue'
    import IconEdit from '@/components/AppIcons/Edit/Edit.vue';
    import AppTextarea from '@/components/AppInputs/Textarea/Textarea.vue';

    let localTitle = ref(null)
    let isEdit = ref(false)

    const props = defineProps({
        item: {
            default: {
                key: 'key',
                value: null
            },
            type: Object
        }
    })

    const emit = defineEmits([
        'callAction'
    ])

    onMounted(() => {
        localTitle.value = JSON.parse(JSON.stringify(
            [null, undefined].includes(props.item.value) ? null : typeof props.item.value == 'object' ? String(props.item.value.value) : String(props.item.value)
        ))
    })

    watch(() => props.item.value, () => {
        localTitle.value = JSON.parse(JSON.stringify(
            [null, undefined].includes(props.item.value) ? null : typeof props.item.value == 'object' ? String(props.item.value.value) : String(props.item.value)
        ))
    }, {
        deep: true
    })

    // Изменение заголовка
    const changeValue = (data) => {
        localTitle.value = data.value
    }

    // Изменение состояния редактирования
    const changeState = (state) => {
        isEdit.value = state
    }

    // Сохранение заголовка
    const saveTitle = () => {
        changeState(false)
        emit('saveTitle', localTitle.value)
    }
</script>
