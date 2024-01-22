<template>
    <div class="select__list">
        <TableDetailsOption 
            v-for="(option) in props.item.options.filter(item => !item.is_hidden)"
            :option="option"
            :item="props.item"
            @changeValue="(data) => $emit('changeValue', data)"
        />
    </div>
</template>

<script setup>
    import './TableDetailsOptions.scss';

    import TableDetailsOption from '../TableDetailsOption/TableDetailsOption.vue';
    
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