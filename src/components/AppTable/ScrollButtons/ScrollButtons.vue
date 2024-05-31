<template>
    <AppLoader class="table-template__loader" ref="loaderRef"/>
    
    <div class="table-template__buttons" :class="`table-template__buttons_${buttonsPos}`">
        <div class="scroll-button scroll-button_left"
            ref="buttonScrollLeftRef"
            @mouseover ="() => actionScroll({action: 'scrollingBlock', value: 'left'})"
            @mouseleave="() => mouseHover = false"
        ></div>
        <div class="scroll-button scroll-button_right"
            ref="buttonScrollRightRef"
            @mouseover ="() => actionScroll({action: 'scrollingBlock', value: 'right'})"
            @mouseleave="() => mouseHover = false"                
        ></div>
    </div>

    <div class="table__empty-block">
        Нет данных
    </div>
</template>

<script setup>
    import './ScrollButtons.scss';
    
    import _ from 'lodash'
    import { ref, onMounted, inject, onUnmounted, watch } from 'vue'

    import AppLoader from '@/components/AppLoader/AppLoader.vue';

    let mouseHover = ref(false)

    const loaderRef = ref(null)
    const buttonScrollLeftRef = ref(null)
    const buttonScrollRightRef = ref(null)
    const tableHeadRef = ref(null)
    const buttonsPos = ref('start')

    const tableHeadCopy = ref(null)

    const tableRef = inject('tableRef')
    const sectionRef = inject('sectionRef')
    const scrollPosition = inject('scrollPosition')

    const props = defineProps({
        tableRef: {
            default: null
        }
    })

    onMounted(async () => {
        tableHeadRef.value = props.tableRef.querySelector('thead')
        window.addEventListener('scroll', throt_funScroll)
        props.tableRef.parentNode.addEventListener('scroll', scrollXThrottling)
        
        if (props.tableRef) {
            new ResizeObserver(resizeTable).observe(props.tableRef)
        }
    })
    
    onUnmounted(() => {
        window.removeEventListener('scroll', throt_funScroll)
    })

    // Скролл таблицы и кнопок
    const actionScroll = (data) => {
        // Установка позиции у кнопок
        const setPosition = () => {           
            // старт таблицы
            if (sectionRef.value.sectionRef.getBoundingClientRect().top > 0) {
                const rect = sectionRef.value.sectionRef.getBoundingClientRect();
                const isFullyVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
                buttonsPos.value = 'start'

                if (isFullyVisible) {
                    return (sectionRef.value.sectionRef.offsetHeight - 82) / 2 - 27
                } else {
                    return (window.innerHeight - sectionRef.value.sectionRef.getBoundingClientRect().top - 82) / 2 - 17
                }
            // конец таблицы
            } else {
                let startPosScrollBlock = sectionRef.value.sectionRef.getBoundingClientRect().top +  window.pageYOffset - document.body.clientTop
                if (sectionRef.value.sectionRef.getBoundingClientRect().height + startPosScrollBlock < window.scrollY + window.innerHeight) {
                    buttonsPos.value = 'end'
                    return window.innerHeight / 2 + (window.scrollY - startPosScrollBlock - startPosScrollBlock + 5)
                }
                // середина таблицы
                else {
                    buttonsPos.value = 'center'
                    return window.innerHeight / 2 + window.scrollY - startPosScrollBlock - 41
                }
            }

        }

        // Отображение псевдошапки
        const showCopyHeader = () => {
            let tableBodyTop = props.tableRef.querySelector('.table__body').getBoundingClientRect().top
            if (tableBodyTop > 0) {
                if (tableHeadCopy.value != null) {
                    tableHeadCopy.value = null
                    props.tableRef.querySelector('.table__header_copy').remove()
                }
            } else {
                if (tableHeadCopy.value == null) {
                    tableHeadCopy.value = props.tableRef.querySelector('.table__header').cloneNode(true);
                    tableHeadCopy.value.classList.add('table__header_copy')
                    props.tableRef.appendChild(tableHeadCopy.value)
                    tableHeadCopy.value.scroll(props.tableRef.parentNode.scrollLeft, 0)
                }
            }
        }
        
        // Скролл при наведении на кнопку
        const scrollingBlock = (pos) => {
            // Смещение блока по иксу при наведении
            const scrollX = (scrollSection, pos) => {
                if (!mouseHover.value) {
                    return
                }
                setButtonsVisible(scrollSection)
                if (pos == 'right') {
                    if (scrollSection.scrollWidth == scrollSection.scrollLeft + scrollSection.offsetWidth) {
                        return
                    }
                    scrollSection.scrollLeft += 5
                    scrollSection.scrollTo({
                        left: scrollSection.scrollLeft,
                        top: 0
                    })
                } else {
                    if (scrollSection.scrollLeft == 0) {
                        return
                    }
                    scrollSection.scrollLeft -= 5
                    scrollSection.scrollTo({
                        left: scrollSection.scrollLeft,
                        top: 0
                    })
                }
                setTimeout(() => {
                    scrollX(scrollSection, pos)
                }, 0.1);
            }

            mouseHover.value = true
            scrollX(props.tableRef.parentNode, pos)
        }

        // Отображение видимости кнопок
        const setButtonsVisible = (scrollSection) => {
            if (scrollSection.scrollWidth == scrollSection.offsetWidth) {
                buttonScrollLeftRef.value ? buttonScrollLeftRef.value.classList.add('scroll-button_disabled') : null
                buttonScrollRightRef.value ? buttonScrollRightRef.value.classList.add('scroll-button_disabled') : null
                return
            } else if (scrollSection.scrollLeft == 0) {
                buttonScrollLeftRef.value ? buttonScrollLeftRef.value.classList.add('scroll-button_disabled') : null
                buttonScrollRightRef.value ? buttonScrollRightRef.value.classList.remove('scroll-button_disabled') : null
            } else if (scrollSection.scrollWidth == scrollSection.scrollLeft + scrollSection.offsetWidth) {
                buttonScrollLeftRef.value ? buttonScrollLeftRef.value.classList.remove('scroll-button_disabled') : null
                buttonScrollRightRef.value ? buttonScrollRightRef.value.classList.add('scroll-button_disabled') : null
            } else {
                buttonScrollRightRef.value ? buttonScrollRightRef.value.classList.remove('scroll-button_disabled') : null
                buttonScrollLeftRef.value ? buttonScrollLeftRef.value.classList.remove('scroll-button_disabled') : null
            }
        }

        switch (data.action) {
            // Установка позиции у кнопок
            case 'setPosition':
                return setPosition()

            // Скролл при наведении на кнопку
            case 'scrollingBlock':
                scrollingBlock(data.value)
                break;

            // Отображение видимости кнопок
            case 'setButtonsVisible':
                setButtonsVisible(data.value)
                break;

            // Отображение псевдошапки
            case 'showCopyHeader':
                showCopyHeader()
                break;
            default:
                break;
        }
    }

    // Троттлинг скролла по вертикали
    const throt_funScroll = () => {
        scrollPosition.value = actionScroll({action: 'setPosition', value: null})
        actionScroll({action: 'showCopyHeader', value: null})
    }

    // Троттлинг скролла по горизонтали
    const scrollXThrottling = _.throttle(() => {
        actionScroll({action: 'setButtonsVisible', value: props.tableRef.parentNode})

        if (tableHeadCopy.value != null) {
            tableHeadCopy.value.scroll(props.tableRef.parentNode.scrollLeft, 0)
        }
    }, 5)

    const resizeTable = () => {
        actionScroll({action: 'setButtonsVisible', value: props.tableRef.parentNode})
        scrollPosition.value = actionScroll({action: 'setPosition', value: null})
    }
</script>