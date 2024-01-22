<template>
    <div class="table__item-content">
        <div class="table__item-content_title">
            {{ props.item.title }}
        </div>
        <span class="item__value item__value_password" :class="setClasses">
            {{ props.item.textEmpty && props.item.value == null ? 'не заполнено' : props.item.value }}
        </span>
    </div>
</template>

<script setup>
    import './TableItemPassword.scss';
    import '@/components/AppTable/TableElements/TableItem/TableItem.scss';
    
    import TableItemScripts from '@/components/AppTable/TableItemScripts';
    
    const props = defineProps({
        item: {
            default: {
                id: 0,
                title: "Undefined title",
                typeComponent: "",
                type: "text",
                value: null,
                key: "",
                external_link: "https://translate.yandex.ru/",
                is_external_link: ""
            },
            type: Object
        }
    })

    const setClasses = computed(() => {
        return TableItemScripts.setClasses(props.item)
    })
</script>
