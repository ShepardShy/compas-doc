<template>
    <FormItem>
        <div class="details__label"> 
            {{ props.item.title }} 
        </div>

        <details class="table__item_details" v-click-out-side="(event => hideDetails(event))">
            <TableDetailsSummary 
                :item="props.item"
            />
            <TableDetailsOptions 
                :item="props.item"
                @changeValue="(data) => $emit('changeValue', data)"
            />
        </details>
    </FormItem>
</template>

<script setup>
    import './TableDetails.scss';
    import '../../TableItem/TableItem.scss'

    import FormItem from '@/components/AppForm/FormItem/FormItem.vue'
    import TableDetailsSummary from './TableDetailsSummary/TableDetailsSummary.vue';
    import TableDetailsOptions from './TableDetailsOptions/TableDetailsOptions.vue';

    import commonScripts from '@/helpers/commonScripts';
    import { clickOutSide as vClickOutSide } from '@mahdikhashan/vue3-click-outside'

    // Скрытие фильтра
    const hideDetails = (event) => {
        commonScripts.hideAllDetails('.form__item_select-details', event)
        commonScripts.hideAllDetails('.table__item_details', event)
    }

    const props = defineProps({
        item: {
            default: {
                id: 0,
                title: 'Undefined title',
                typeComponent: 'select',
                key: '',
                disabled: false,
                value: '',
                options: [
                    {
                        id: 0,
                        name: 'Undefined'
                    }
                ]
            },
            type: Object
        }
    })
</script>
