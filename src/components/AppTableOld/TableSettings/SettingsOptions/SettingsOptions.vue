<template>
    <SettingItem :title="props.title" class="table__setting section__setting-item" :keyItem="props.keyItem">
        <div class="table__options">
            <SettingsOption
                v-for="col in props.cols"
                :col="col"
                :keyCol="props.keyCol"
                @changeValue="(data) => $emit('changeValue', data)"
            />
        </div>
    </SettingItem>
</template>

<script setup>
    import './SettingsOptions.scss';

    import SettingItem from '@/components/AppSection/SectionSettings/SettingItem/SettingItem.vue';
    import SettingsOption from './SettingsOption/SettingsOption.vue';

    const props = defineProps({
        cols: {
            default: [
                {
                    "id": 0,
                    "title": "Undefined title",
                    "key": "",
                    "width": "50px",
                    "enabled": true,
                    component: null
                }],
            type: Array
        },
        title: {
            default: 'Undefined title',
            type: String
        },
        keyItem: {
            default: "",
            type: String
        },
        keyCol: {
            default: '',
            type: String
        }
    })

    const emit = defineEmits([
        'changeValue'
    ])
</script>
