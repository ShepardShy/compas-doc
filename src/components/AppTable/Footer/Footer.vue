<template>
    <div class="table-template__footer table-footer">
        <div class="table-footer__count-selected">
            <span class="table-footer__count-selected-title">Выбрано: </span> {{ bodyData.filter(p => p.isChoose).length }}
        </div>

        <AppPagination 
            :totalPages="footerData.pages"
            :activePage="footerData.activePage"
            class="table-footer__pagination" 
            @callAction="(data) => $emit('callAction', data)"
        />

        <div class="table-footer__visible-elems">

        </div>
    </div>
</template>

<script setup>
    import './Footer.scss';
    
    import { inject } from 'vue'

    import AppPagination from './Pagination/Pagination.vue'

    const bodyData = inject('bodyData')
    const footerData = inject('footerData')
</script>
