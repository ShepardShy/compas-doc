<template>
    <details class="popup" ref="popupRef" v-click-out-side="() => elementsDOM.hideDetails(popupRef)">
        <summary class="popup__summary">
            <slot name="summary"></slot>
        </summary>
        <div class="popup__content" @click="() => props.closeByClick ? elementsDOM.hideDetails(popupRef) : ''">
            <slot name="content"></slot>
        </div>
    </details>
</template>

<script setup>
    import './Popup.scss';

    import { ref } from 'vue'
    import { clickOutSide as vClickOutSide } from '@mahdikhashan/vue3-click-outside'
    import elementsDOM from '@/scripts/elementsDOM'

    const popupRef = ref(null)

    const props = defineProps({
        closeByClick: {
            default: false,
            type: Boolean
        }
    })

    defineExpose({
        popupRef
    })
</script>
