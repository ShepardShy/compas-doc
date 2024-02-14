<template>
    <AppComponent 
        class="component_filter"
        :component="AppFilter"
        :codeProps="filterProps"
        :codeEmits="filterEmits"
        @actionFilter="(data) => actionFilter(data)"
    />
</template>

<script setup>
    import './filter.scss';

    import AppComponent from '@/components/AppComponent/AppComponent.vue';
    
    import AppFilter from '@/components/AppFilter/Filter.vue';
    import filterProps from '@/data/frontend/filter/codeProps.js';
    import filterEmits from '@/data/frontend/filter/codeEmits.js';

    // Эмиты фильтра
    const actionFilter = (data) => {
        switch (data.action) {
            // 'Поиск по фильтру
            case 'search':
                console.log('Поиск по фильтру:', data.value);
                break;
            // Создание нового фильтра
            case 'create':
                console.log('Создание нового фильтра:', data.value);
                break;
            // Обновление фильтра
            case 'update':
                console.log('Обновление фильтра:', data.value);
                break;
            // Удаление фильтра
            case 'delete':
                console.log('Удаление фильтра:', data.value);
                break;

            // Перемещение фильтров
            case 'sort':
                console.log('Перемещение фильтров:', data.value);
                break;
                
            default:
                break;
        }
    }
</script>