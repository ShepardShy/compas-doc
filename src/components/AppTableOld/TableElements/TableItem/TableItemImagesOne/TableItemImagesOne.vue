<template>
    <FansyBox class="table__item-content table__item-content_file">
        <div class="table__item-content_title">
            {{ props.item.title }}
        </div>
        <div class="item__value_empty" v-if="props.item.value == null || props.item.value.length == 0">
            не заполнено
        </div>
        <div class="table__item-content-slot" v-else>
            <div class="table__item-content-list table__item-content-list_only" >
                <FansyBoxImage
                    v-for="(item) in props.item.value"
                    :image="item"
                    :item="props.item"
                    @callAction="(data) => $emit('callAction', data)"
                />
            </div>
            <div class="item__value-circle" v-if="setLength != null">
                {{ setLength }}
            </div>
        </div>
    </FansyBox>
</template>

<script setup>
    import './TableItemImagesOne.scss';

    import FansyBox from '@/components/AppFansyBox/FansyBox.vue';
    import FansyBoxImage from '@/components/AppFansyBox/Image/Image.vue';

    const emit = defineEmits([
        'callAction',
        'changeValue'
    ])

    const props = defineProps({
        item: {
            default: {
                id: 0,
                title: "Undefined title",
                typeComponent: "",
                type: "text",
                value: null,
                key: ""
            },
            type: Object
        }
    })

    const setLength = computed(() => {
        if ([null, undefined, ''].includes(props.item.value) || props.item.value.length <= 1) {
            return null
        } else {
            return props.item.value.length
        }
    })
</script>
