<template>
    <WarningDelete 
        v-if="isShow.state && isShow.type == 'delete'"
    />

    <WarningSettings 
        v-else-if="isShow.state && (isShow.type == 'settings' || isShow.type == 'create')"
    />
</template>

<script setup>
    import './Warning.scss';
    
    import { inject } from 'vue'

    import WarningDelete from './Delete/Delete.vue'
    import WarningSettings from './Settings/Settings.vue'

    const isShow = inject('isShow')

</script>
