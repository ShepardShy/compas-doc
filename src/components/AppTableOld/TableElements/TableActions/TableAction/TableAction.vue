<template>
    <div class="table__action" v-if="props.action.children == undefined || props.action.children.length == 0" :class="props.action.class" @click="() => callAction('default')"> 
        {{ props.action.title }} 
    </div>

    <div class="table__action table__action_children" v-else :class="props.action.class" @click="() => callAction('showChildren')"> 
        <span class="table__action-text">
            {{ props.action.title }} 
        </span>

        <svg class="section__setting-arrow" width="6" height="9" viewBox="0 0 6 9" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M.915 8.943 5.25 4.675a.344.344 0 0 0 .068-.222.344.344 0 0 0-.068-.222L.915.066a.587.587 0 0 0-.683.102C.027.35-.03.578.06.851l3.688 3.585L.06 8.056c-.114.25-.068.489.137.716.204.228.443.285.717.171z"
                fill="#000" fill-rule="evenodd" />
        </svg>
    </div>
</template>

<script setup>
    import './TableAction.scss';
    
    import selectScripts from '@/components/AppSelects/selectScripts.js'

    const props = defineProps({
        action: {
            default: {
                "id": 0,
                "title": "Undefined title",
                "class": "",
                "action": ""
            },
            type: Object
        },
        actionsRef: {
            default: null
        }
    })

    const callAction = (action) => {
        if (action == 'showChildren') {
            emit('showChildren', {
                action: 'showChildren',
                item: props.action
            })
        } else {
            selectScripts.hideDetails(props.actionsRef)
            emit('callAction', props.action.action)
        }
    }

    const emit = defineEmits([
        'callAction'
    ])
</script>