<template>
    <componentBackend 
        :title="'Получение информации в таблице'"
        :type="'GET'"
        :method="'api/objects/${slug}/compose'"
        :response="GETResponse"
        :request="GETRequest"
    />
    
    <componentBackend 
        :title="'Скачивание документа Excel'"
        :type="'GET'"
        :method="'api/objects/${slug}/export'"
        :response="ExcelResponse"
        :request="ExcelRequest"
    />

    <componentBackend 
        :title="'Сохранение настроек колонок'"
        :type="'POST'"
        :method="'api/tables/${slug}'"
        :response="SettingsResponse"
        :request="SettingsRequest"
    />

    <componentBackend 
        :title="'Создание строки'"
        :type="'POST'"
        :method="'api/objects/${slug}'"
        :response="POSTResponse"
        :request="POSTRequest"
    />

    <componentBackend 
        :title="'Копирование строки'"
        :type="'POST'"
        :method="'api/objects/${slug}/${row_id}/copy'"
        :response="POSTResponse"
        :request="POSTRequest"
    />

    <componentBackend 
        :title="'Поиск опций в других таблицах'"
        :type="'GET'"
        :method="'api/objects/search'"
        :response="SearchResponse"
        :request="SearchRequest"
    />

    <componentBackend 
        :title="'Обновление строк'"
        :type="'PUT'"
        :method="'api/objects/${slug}/batch'"
        :response="null"
        :request="PUTRequest"
    />

    <componentBackend 
        :title="'Удаление строк'"
        :type="'DELETE'"
        :method="'api/objects/${slug}'"
        :response="null"
        :request="DELETERequest"
    />

    <componentBackend 
        :title="'Восстановление строк'"
        :type="'POST'"
        :method="'api/objects/${slug}/restore'"
        :response="null"
        :request="RestoreRequest"
    />
</template>

<script setup>
    import './pageTable.scss';
    
    import componentBackend from '@/components/AppComponent/Backend/Backend.vue';

    // Получение информации в таблице
    import GETRequest from '@/data/backend/pageTable/GET/request.json';
    import GETResponse from '@/data/backend/pageTable/GET/response.js';

    // Создание и копирование строки
    import POSTRequest from '@/data/backend/pageTable/POST/request.json';
    import POSTResponse from '@/data/backend/pageTable/POST/response.js';

    // Обновление строк
    import PUTRequest from '@/data/backend/pageTable/PUT/request.json';

    // Удаление строк
    import DELETERequest from '@/data/backend/pageTable/DELETE/request.json';

    // Восстановление строк
    import RestoreRequest from '@/data/backend/pageTable/RestorePOST/request.json';

    // Скачивание документа Excel
    import ExcelRequest from '@/data/backend/pageTable/Excel/request.json';
    import ExcelResponse from '@/data/backend/pageTable/Excel/response.json';

    // Сохранение настроек колонок
    import SettingsRequest from '@/data/backend/pageTable/SettingsPOST/request.json';
    import SettingsResponse from '@/data/backend/pageTable/SettingsPOST/response.json';

    // Поиск опций в других таблицах
    import SearchRequest from '@/data/backend/pageTable/SearchGET/request.json';
    import SearchResponse from '@/data/backend/pageTable/SearchGET/response.json';
</script>
