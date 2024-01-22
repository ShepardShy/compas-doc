<template>
    <td class="table__item" ref="tableItemRef">
        <slot></slot>
    </td>
</template>

<script setup>
    import './TableItem.scss';

    const tableItemRef = ref(null)
    
    defineExpose({
        tableItemRef
    })
</script>
