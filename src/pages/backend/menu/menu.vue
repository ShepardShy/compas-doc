<template>
    <componentBackend 
        :title="'Получение маршрутов'"
        :type="'GET'"
        :method="'api/sidebar/get'"
        :response="GETResponse"
        :request="null"
    />

    <componentBackend 
        :title="'Изменение маршрутов'"
        :type="'POST'"
        :method="'api/sidebar/set/${role.id}'"
        :response="SETRequest"
        :request="SETResponse"
    />
</template>

<script setup>
    import './menu.scss';
    
    import componentBackend from '@/components/AppComponent/Backend/Backend.vue';

    import GETResponse from '@/data/backend/menu/GET/response.json';

    import SETRequest from '@/data/backend/menu/POST/request.json';
    import SETResponse from '@/data/backend/menu/POST/response.json';
</script>
