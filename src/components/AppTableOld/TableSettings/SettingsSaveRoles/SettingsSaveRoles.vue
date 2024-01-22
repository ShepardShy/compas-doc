<template>
	<SettingItem :title="props.title" class="table__setting section__setting-item" :keyItem="props.keyItem">
		<div class="table__options">
			<SettingsSaveRole
				v-for="role in props.roles"
				:key="role.id"
				:role="role"
				@callAction="(data) => emit('callAction', data)"
			/>
		</div>
	</SettingItem>
</template>

<script setup>
    import './SettingsSaveRoles.scss';

    import SettingItem from '@/components/AppSection/SectionSettings/SettingItem/SettingItem.vue';
    import SettingsSaveRole from "./SettingsSaveRole/SettingsSaveRole.vue";

    const props = defineProps({
	    roles: {
		    default: [
			    {
				    "id": 0,
				    "title": "Undefined title",
				    "key": ""
			    }
			],
		    type: Array
	    },
	    title: {
		    default: 'Undefined title',
		    type: String
	    },
	    keyItem: {
		    default: "",
		    type: String
	    }
    })

    const emit = defineEmits([
    'callAction'
    ])
</script>
