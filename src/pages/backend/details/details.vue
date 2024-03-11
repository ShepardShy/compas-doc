<template>
    <componentBackend 
        :title="'Получение информации в таблице'"
        :type="'GET'"
        :method="'api/objects/${slug}/compose/${id}'"
        :response="GETResponse"
        :request="GETRequest"
    />
</template>

<script setup>
    import './details.scss';
    
    import componentBackend from '@/components/AppComponent/Backend/Backend.vue';

    // Получение информации в таблице
    import GETRequest from '@/data/backend/details/GET/request.json';
    import GETResponse from '@/data/backend/details/GET/response.js';
</script>
