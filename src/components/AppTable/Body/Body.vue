<template>
    <draggable 
        tag="tbody"
        class="table__body"
        itemKey="table-body"
        v-model="bodyData" 
        handle=".icon__draggable"
        @end="(event) => emit('callAction', {action: 'moveRows', value: event.to.__draggable_component__.modelValue})" 
    >
        <template #item="{ element: row }">
            <TableRow 
                :row="row"
                :slug="props.slug"
                :isTrash="props.isTrash"
                @callAction="(data) => emit('callAction', data)"
            />
        </template>
    </draggable>
</template>

<script setup>
    import './Body.scss';
    
    import { inject } from 'vue'

    import draggable from 'vuedraggable'
    import TableRow from './Row/Row.vue'

    const bodyData = inject('bodyData')

    const props = defineProps({
        isTrash: {
            default: false,
            type: Boolean
        },
        slug: {
            default: '',
            type: String
        }
    })

    const emit = defineEmits([
        'callAction'
    ])
</script>
