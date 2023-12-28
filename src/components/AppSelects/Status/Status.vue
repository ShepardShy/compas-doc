<template>
    <FormItem 
        class="form-item__status status" 
        :class="props.item.required ? 'form-item_required' : ''" 
    >
        <FormLabel 
            :title="'Статус'"
        />

        <AppPopup :closeByClick="true">
            <template #summary> 
                <StatusOption 
                    class="status__preview"
                    :option="activeOption"
                />
            </template>
            <template #content>
                <PopupOption v-for="option in options" @click="() => changeValue(option)">
                    <StatusOption 
                        :option="option.label"
                    />
                </PopupOption>
            </template>
        </AppPopup>
    </FormItem>
</template>

<script setup>
    import './Status.scss';
    
    import { ref, onMounted } from 'vue'

    import AppPopup from '@/components/AppPopup/Popup.vue';
    import FormItem from '@/components/AppForm/FormItem/FormItem.vue';
    import FormLabel from '@/components/AppForm/FormLabel/FormLabel.vue';
    import PopupOption from '@/components/AppPopup/PopupOption/PopupOption.vue';
    import StatusOption from './StatusOption/StatusOption.vue';

    let options = [
        {
            label: {
                id: 0,
                sort: 0,
                file: 'https://opt6.compas.pro/storage/tenantopt6/app/public/files/kRFx3iGTKT5ix5oZwgXzSsYR25Gh1jbxtLgEKS7E.svg',
                is_hidden: 0,
                field_id: null,
                color: "#1f4fc6ff",
                text: "Опция 1",
            },
            value: 0
        },
        {
            label: {
                id: 1,
                sort: 0,
                file: null,
                is_hidden: 0,
                field_id: null,
                color: "#1fc64fff",
                text: "Опция 2",
            },
            value: 1
        },
        {
            label: {
                id: 2,
                sort: 0,
                file: 'https://compas.pro/storage/thumbnails/default/10/8x/h5rxn72o8c8o8ss8w0okg.jpg?heighten=200&p=opt6.compas.pro%2Fstorage%2Ftenantopt6%2Fapp%2Fpublic%2Ffiles%2FyJx1M7yfmQuxLBkkCafwHaNOm21KwjlekwFVRQlZ.jpg&s=https',
                is_hidden: 0,
                field_id: null,
                color: "#c61f4fff",
                text: "Опция 3",
            },
            value: 2
        },
        {
            label: {
                id: 3,
                sort: 0,
                file: 'https://opt6.compas.pro/storage/tenantopt6/app/public/files/qP3dNvTDkEJii9TiUJ9HpxJN4K8O1LHIS8tdhgRV.png',
                is_hidden: 0,
                field_id: null,
                color: "#4f1fc6ff",
                text: "Опция 4",
            },
            value: 3
        }
    ]

    let activeOption = ref(null)

    const props = defineProps({
        item: {
            default: {
                required: false
            },
            type: Object
        }
    })

    const changeValue = (option) => {
        activeOption.value = option.label
    }

    onMounted(() => {
        activeOption.value = options[0].label // null
    })
</script>
