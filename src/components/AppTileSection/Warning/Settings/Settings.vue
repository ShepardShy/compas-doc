<template>
    <AppWarning class="warning_settings" @closeModal="() => showWarning(false)" :isShow="isShow.state">
        <template #title>
            Настройки поля
        </template>

        <template #body>
            <OptionsComponent />

            <div class="warning__actions">
                <AppButton class="button_blue" @click="() => saveSettings()">
                    Сохранить
                </AppButton>
                <AppButton @click="() => showWarning(false)">
                    Отмена
                </AppButton>
            </div>
        </template>
    </AppWarning>
</template>

<script setup>
    import './Settings.scss';
    
    import { ref, inject, provide } from 'vue'

    import OptionsComponent from './Options/Options.vue'
    import AppButton from '@/components/AppButton/AppButton.vue';
    import AppWarning from '@/components/AppWarning/WarningNew/AppWarning.vue';

    const changedKeys = ref({})
    
    const isShow = inject('isShow')
    const edittingField = inject('edittingField')
    
    provide('changedKeys', changedKeys)

    const emit = defineEmits([
        'callAction'
    ])

    // Показать окно предупреждения
    const showWarning = (state) => {
        isShow.value.state = state
    }    

    // Обновление настроек
    const saveSettings = () => {
        if (isShow.value.type == 'create') {
            emit('callAction', {
                action: 'createField',
                value: edittingField.value
            })
        } else {
            changedKeys.value.id = edittingField.value.id
            emit('callAction', {
                action: 'updateField',
                value: changedKeys.value
            })
        }
    }
</script>
