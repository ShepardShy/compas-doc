<template>
    <AppWarning @closeModal="() => showWarning(false)" :isShow="isShow">
        <template #title>
            Заголовок
        </template>

        <template #body>
            Текст
        </template>
    </AppWarning>

    <AppButton class="button_blue" @click="() => showWarning(true)">
        Показать модальное окно
    </AppButton>
</template>

<script setup>
    import './warning.scss';
    
    import { ref } from 'vue';

    import AppButton from '@/components/AppButton/AppButton.vue';
    import AppWarning from '@/components/AppWarning/AppWarning.vue';
    
    let isShow = ref(false)

    const showWarning = (state) => {
        isShow.value = state
    }
</script>
