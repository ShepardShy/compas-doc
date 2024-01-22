<template>
    <div class="table__item-content_header_checkbox">
        <AppCheckbox 
            :item="{
                id: 1,
                title: 'Выделение',
                typeComponent: '',
                type: 'checkbox',
                disabled: (props.state == 'edit') ? true : false, 
                value: props.selectAll,
                options:  null,
                key: 'selectAll'                           
            }"
            @changeValue="(data) => $emit('changeValue', data)"
        />
    </div>
</template>

<script setup>
    import './TableHeaderItemContentCheckbox.scss';
    
    import AppCheckbox from '@/components/AppInputs/Checkbox/Checkbox.vue';

    const props = defineProps({
        state: {
            default: "select",
            type: String
        },
        selectAll: {
            default: false,
            type: Boolean
        },
        item: {
            default: {
                "id": 0,
                "title": "",
                "key": "",
                "width": "40px",
                "enabled": true,
                "hover": false,
                "sort_order": null,
                "type": "",
                "fixed":  false,
                "fixTarget":  null
            },
            type: Object
        }
    })
</script>
