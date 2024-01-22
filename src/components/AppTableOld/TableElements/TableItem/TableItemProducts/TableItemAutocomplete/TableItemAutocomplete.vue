<template>
    <div class="table__item-content_title">
        {{ props.item.title }}
    </div>
    <AppAutocompleteInput 
        :item="{
                id: props.item.id,
                selected_item: props.item.selected_item,
                value: props.item.value,
                type: props.item.type,
                key: props.item.key,
                placeholder: '',
                typeComponent: 'input',
                title: '',
                options: AutocompleteOptions,
                showLink: true
        }"
        :optionLoader="optionLoader"
        @changeValue="(data) => emit('changeValue', {key: data.key, value: data.value, id: props.row.id, product_id: data.item_id})"
        @findTitle="(data) => findTitle(data)"
        @showModal="(data) => $emit('showModal', data)"
    />
</template>

<script setup>
    import './TableItemAutocomplete.scss'
    import AppAutocompleteInput from '@/components/AppAutocomplete/AppAutocompleteInput/AppAutocompleteInput.vue'
    import selectedObjectProducts from '@/stores/selectedObjectScripts/selectedObjectProducts'

    import _ from 'lodash'

    let AutocompleteOptions = ref([])
    let optionLoader = ref(false)

    const emit = defineEmits([
        'changeValue',
        'showModal'
    ])

    const findTitle = (data) => {
        emit('changeValue', {key: data.key, value: data.value, id: props.row.id})
        throt_fun(data)
    }

    // Тротлинг инпута
    const throt_fun = _.throttle(async function (data) {
        try {
            optionLoader.value = true
            let response = await selectedObjectProducts.getAutoCompeteProducts(data.value)
            let arr = []
            response.forEach(element => {
                arr.push({
                    label: element.name,
                    value: element
                })
            });
            AutocompleteOptions.value = arr
        } catch (error) {
            console.log(error);
        } finally {
            optionLoader.value = false
        }

    }, 1000);

    const props = defineProps({
        row: {
            default: {},
            type: Object
        },
        item: {
            default: {
                "id": 0,
                "title": "",
                "key": "",
                "width": "40px",
                "enabled": true,
                "hover": false,
                "sort_order": null,
                "type": "",
                "fixed":  false,
                "fixTarget":  null
            },
            type: Object
        }
    })
</script>
