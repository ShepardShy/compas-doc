<template>
        <AppPopup class="popup_actions" ref="popupRef" :closeByClick="false" @click="() => openPopup(true)" @clickOutside="() => openPopup(false)">
            <template #summary>
                <IconDots />
            </template>
            <template #content>
                <template v-if="menu.activeTab == null">
                    <PopupOption 
                        class="popup__option-sublink" 
                        v-for="tab in actions[props.slug]" 
                        :class="tab.class"
                        @click="() => tab.children.length > 0 ? 
                            callAction({action: 'changeTab', value: tab}) : 
                            callAction({action: 'callAction', value: tab.action})"
                        >

                        {{ tab.title }} 

                        <IconArrow v-show="tab.children.length > 0" />
                    </PopupOption>
                </template>

                <template v-else>
                    <PopupOption class="popup__option-sublink popup__option-sublink_back" @click="() => callAction({action: 'changeTab', value: null})">
                        <IconArrow />
                        
                        {{ menu.activeTab.title }}
                    </PopupOption>

                    <PopupOption v-for="option in menu.activeTab.children" @click="() => callAction({action: 'callAction', value: option.action})">
                        {{ option.title }}
                    </PopupOption>
                </template>
            </template>
        </AppPopup>
</template>

<script setup>
    import './Actions.scss';

    import { ref } from 'vue';

    import IconDots from '@/components/AppIcons/Dots/Dots.vue'
    import IconArrow from '@/components/AppIcons/Arrow/Arrow.vue'

    import AppPopup from '@/components/AppPopup/Popup.vue';
    import PopupOption from '@/components/AppPopup/PopupOption/PopupOption.vue';

    import actions from './actions.json'

    let menu = ref({
        activeTab: null
    })

    const popupRef = ref(null)

    const props = defineProps({
        slug: {
            default: "view",
            type: String
        }
    })

    const emit = defineEmits([
        'callAction'
    ])

    // Вызов действия
    const callAction = (data) => {
        if (data.action == 'changeTab') {
            setTimeout(() => {
                menu.value.activeTab = data.value
            }, 10);
        } else if (data.action == 'callAction') {
            popupRef.value.popupRef.removeAttribute('open')
            menu.value.activeTab = null
            emit('callAction', {
                action: data.action,
                value: data.value
            })
        }
    }

    const openPopup = (state) => {
        if (state) {
            popupRef.value.popupRef.closest('.table__item').classList.add('table__item_clicked')
        } else {
            menu.value.activeTab = null
            popupRef.value.popupRef.closest('.table__item').classList.remove('table__item_clicked')
        }
    }
</script>
