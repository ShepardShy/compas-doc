<template>
    <div class="modal" ref="modalRef">
        <div class="modal__list">
            <div 
                class="modal-item modal__item" 
                v-for="(item, index) in modals" 
                :style="`--modalOrder: ${50 * (index >= 3 ? 2 : index)}px; --index: ${index}`"
            >
                <div class="modal__background"></div>
                <div class="modal__close" :style="`--backgroundColor: ${item.color}`" @click="() => deletePage()">
                    <IconClose />
                    <span class="modal__close-text">
                        {{ item.title }}
                    </span>
                </div>
                <div class="modal__content"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import './Modal.scss';
    
    import { onMounted, onUnmounted, inject, watch, toRaw, ref } from 'vue'; 

    import IconClose from '@/components/AppIcons/Close/Close.vue'
    import commonScripts from '@/commonScripts/commonScripts';
    const modals = inject('modals')
    const parentPage = toRaw(window.location.href)
    
    const router = useRouter();
    const modalRef = ref()
    let preventClick = ref(null)
    let mouseEventDown = ref(null)

    onMounted(() => {
        openModal()
        document.body.classList.add('body_uncscroll')
        modalRef.value.addEventListener('mousedown', mouseDown)
        modalRef.value.addEventListener('mouseup', closeModal)
    })

    onUnmounted(() => {
        document.body.classList.remove('body_uncscroll')
        window.history.pushState("", "Title", parentPage);
    })

    // Открытие нового модального окна
    const openModal = () => {
        if (modals.value.length >= 11 || window.innerWidth <= 660) {
            router.push({ path: modals.value[modals.value.length - 1].link });
            window.location.replace(modals.value[modals.value.length - 1].link)
            window.history.pushState("", "Title", modals.value[modals.value.length - 1].link);
        } else {
            window.history.pushState("", "Title", modals.value[modals.value.length - 1].link);

            preventClick.value = true

            setTimeout(() => {
                preventClick.value = false
                commonScripts.clearSelection()
            }, 1000);
        }
    }

    // Закрытие модального окна
    const closeModal = (event) => {
        if (event.target.classList.contains('modal__background') && !preventClick.value && mouseEventDown.value.classList.contains('modal__background')) {
            deletePage()
        }
    }

    const deletePage = () => {
        let activeModal = modals.value[modals.value.length - 1]
            
        if (activeModal.isCreate) {
            // tableScripts.deleteRows([activeModal.id], activeModal.slug)
        }
        modals.value.pop()
    }

    // Опускание мыши
    const mouseDown = (event) => {
        mouseEventDown.value = event.target
    }

    watch(() => modals.value, () => {
        openModal()
    }, {deep: true})
</script>
