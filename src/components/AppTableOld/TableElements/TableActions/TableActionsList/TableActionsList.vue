<template>
    <div class="table__actions-list">
        <div class="table__action table__action_children table__action-title" v-if="activeTab != null" @click="() => showChildren('showParent')">
            <svg class="section__setting-arrow" width="6" height="9" viewBox="0 0 6 9" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M.915 8.943 5.25 4.675a.344.344 0 0 0 .068-.222.344.344 0 0 0-.068-.222L.915.066a.587.587 0 0 0-.683.102C.027.35-.03.578.06.851l3.688 3.585L.06 8.056c-.114.25-.068.489.137.716.204.228.443.285.717.171z"
                    fill="#000" fill-rule="evenodd" />
            </svg>

            {{ activeTab.title }}
        </div>
        <TableAction 
            v-for="action in setValue"
            :action="action"
            :actionsRef="props.actionsRef"
            @showChildren="(action) => showChildren(action)"
            @callAction="(action) => callAction(action)"
        />
    </div>
</template>

<script setup>
    import './TableActionsList.scss';
    
    import TableAction from '../TableAction/TableAction.vue';

    let activeTab = ref(null)

    const props = defineProps({
        item: {
            default: {
                id: 0,
                value: [
                    {
                        "id": 0,
                        "title": "Undefined title",
                        "class": "",
                        "action": ""
                    }
                ],
                key: "",
                type: ""
            },
            type: Object
        },
        actionsRef: {
            default: null
        }
    })

    const emit = defineEmits([
        'callAction'
    ])

    const showChildren = (action) => {
        setTimeout(() => {
            if (action.action == 'showChildren') {
                activeTab.value = action.item
            } else {
                activeTab.value = activeTab.value.parentId == null ? null : findById(props.item.value, activeTab.value.parentId)
            }
        }, 10);
    }

    const callAction = (action) => {
        activeTab.value = null
        emit('callAction', action)
    }

    const setValue = computed(() => {
        if (activeTab.value == null) {
            return props.item.value
        } else {
            return activeTab.value.children
        }
    })

    function findById(array, id) {
        for (const item of array) {
            if (item.id === id) return item;
            if (item.children?.length) {
            const innerResult = findById(item.children, id);
            if (innerResult) return innerResult;
            }
        }
    }
</script>
