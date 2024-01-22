<template>
        <div class="select__item" @click="() => changeValue(props.option)">
            <TableDetailsOptionFigure 
                :option="props.option"
            />
            <span class="table__item-value"> {{ props.option.value }} </span>
        </div>
</template>

<script setup>
    import './TableDetailsOption.scss';
    
    import TableDetailsOptionFigure from './TableDetailsOptionFigure/TableDetailsOptionFigure.vue';
    import commonScripts from "~/helpers/commonScripts"

    const changeValue = (option) => {
        commonScripts.hideAllDetails('.table__item_details')
        emit('changeValue', {key: props.item.key, value: option.id})
    }

    const emit = defineEmits([
        'changeValue'
    ])

    const props = defineProps({
        option: {
            default: {
                id: 0,
                name: 'Undefined'
            },
            type: Object
        },
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