<template>
    <AppButton class="button_blue" @click="() => showModal()">
        Открыть модальное окно
    </AppButton>
    <AppModal v-if="modals.length > 0" @showModal="() => showModal()"/>
</template>

<script setup>
    import './modal.scss';

    import { provide, ref } from 'vue';
    
    import AppModal from '@/components/AppModal/Modal.vue';
    import AppButton from '@/components/AppButton/AppButton.vue';

    const modals = ref([])

    // Открыть модальное окно
    const showModal = () => {
        modals.value.push({
            id: modals.value.length,
            link: `/objects/user/${modals.value.length}`,
            slug: 'slug',
            title: `Должностные инструкции ${modals.value.length}`,
            color: '#2F8CFF',
            status: true
        })
    }

    provide('modals', modals)
</script>
