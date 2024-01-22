<template>
	<FormItem>
		<div class="form-item__title">
			Удаление
		</div>
		<AppWarningIconClose
			@click="() => $emit('callAction',  'deleteRow')"
		/>
	</FormItem>
</template>

<script setup>
    import './TableItemIconDelete.scss'
    import AppWarningIconClose from '~/components/AppWarning/AppWarningIconClose/AppWarningIconClose.vue';
    import FormItem from "~/components/AppForm/FormItem/FormItem.vue";

const props = defineProps({
    row: {
        default: {},
        type: Object
    }
})
</script>
