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
            <AppSelect 
                :item="{
                    id: 0,
                    key: 'visibleElems',
                    value: 25,
                    focus: false,
                    required: false,
                    title: 'На странице:',
                    lockedOptions: [],
                    options: [
                        {
                            label: '25',
                            value: 25
                        },
                        {
                            label: '50',
                            value: 50
                        },
                        {
                            label: '100',
                            value: 100
                        }
                    ]
                }"
                :isFiltered="false"
                :isHaveNullOption="false"
                @changeValue="(data) => $emit('callAction', {action: 'changeVisibleElems', value: data.value})"
            />
        </div>
    </div>
</template>

<script setup>
    import './Footer.scss';
    
    import { inject } from 'vue'

    import AppPagination from './Pagination/Pagination.vue'
    import AppSelect from '@/components/AppSelects/Select/Select.vue'

    const bodyData = inject('bodyData')
    const footerData = inject('footerData')
</script>
