<template>
    <tbody class="table__body">
        <TableRow 
            v-for="row in bodyData" 
            :row="row"
        />
    </tbody>
</template>

<script setup>
    import './Body.scss';
    
    import { inject } from 'vue'

    import TableRow from './Row/Row.vue'

    const bodyData = inject('bodyData')

    const props = defineProps({
        isTrash: {
            default: false,
            type: Boolean
        }
    })

    const emit = defineEmits([
        'callAction'
    ])
</script>
