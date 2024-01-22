<template>
	<button
		class="section__setting table__setting section__setting-item"
	>
		{{ props.title }}
	</button>
</template>

<script setup>
    import './SettingsSave.scss';

	const props = defineProps({
	    title: {
	        default: 'Undefined title',
	        type: String
	    }
	})

    const emit = defineEmits([
		'updateTableKeys'
    ])
</script>
