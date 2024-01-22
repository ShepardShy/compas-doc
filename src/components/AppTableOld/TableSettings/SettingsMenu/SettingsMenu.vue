<template>
    <div class="section__setting table__setting section__setting-item" v-for="action in props.actions" @click="(event) => CallAction(event, action)">
        {{ action.title }}
    </div>
</template>

<script setup>
    import './SettingsMenu.scss';

    import commonScripts from '@/helpers/commonScripts';

    const CallAction = (event, action) => {
	    emit('callAction', action)

        commonScripts.hideAllDetails('details', event)
    }

    const props = defineProps({
	    actions: {
            default: null
        }
    })

    const emit = defineEmits([
        'callAction'
    ])

</script>
