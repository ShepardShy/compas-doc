<template>
    <WarningDelete 
        v-if="isShow.state && isShow.type == 'delete'"
    />

    <WarningRestore 
        v-else-if="isShow.state && isShow.type == 'restore'"
    />

    <WarningValidation 
        v-else-if="isShow.state && isShow.type == 'validation'"
    />

    <WarningDeleteCategory 
        v-else-if="isShow.state && isShow.type == 'deleteCategory'"
    />

    <WarningSettingsCategory 
        v-else-if="isShow.state && (isShow.type == 'createCategory' || isShow.type == 'updateCategory' || isShow.type == 'createSubCategory')"
    />
</template>

<script setup>
    import './Warning.scss';
    
    import { inject } from 'vue'

    import WarningDelete from './Delete/Delete.vue'
    import WarningRestore from './Restore/Restore.vue'
    import WarningValidation from './Validation/Validation.vue'
    import WarningDeleteCategory from './Category/Delete/Delete.vue'
    import WarningSettingsCategory from './Category/Settings/Settings.vue'

    const isShow = inject('isShow')

</script>
