<template>
	<div
		class="table__option section__setting-option"
		@click="$emit('callAction', props.role.value)"
	>
		<span class="table__option-title">
            {{ props.role.label }}
        </span>
	</div>
</template>

<script setup>
    import './SettingsSaveRole.scss';

    const props = defineProps({
	    role: {
		    default: {
			    id: 0,
			    title: '',
			    key: ''
		    },
		    type: Object
	    }
    })
</script>
