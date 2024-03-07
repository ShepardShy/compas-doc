<template>
    <AppWarning class="warning_settings" @closeModal="() => showWarning(false)" :isShow="isShow.state">
        <template #title>
            Настройки поля
        </template>

        <template #body>
            <OptionsComponent />

            <div class="warning__actions">
                <AppButton class="button_blue" @click="() => updateSettings()">
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
    import '../Create/Create.scss';
    
    import { ref, inject, provide } from 'vue'

    import AppButton from '@/components/AppButton/AppButton.vue';
    import AppWarning from '@/components/AppWarning/AppWarning.vue';
    import OptionsComponent from './Options/Options.vue'

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
    const updateSettings = () => {
        changedKeys.value.id = edittingField.value.id
        emit('callAction', {
            action: 'updateSettings',
            value: changedKeys.value
        })
    }
</script>
