<template>
    <AppSection ref="sectionRef" class="table__template section_desktop object__section section__body object__section-body" :class="setSectionClasses">
        <TableTop
            :tabs="props.tabs"
            :title="props.title"
            :tableRef="tableRef"
            :showTabs="props.showTabs"
            :showTitle="props.showTitle"
            :activeTab="props.activeTab"
            :isDragging="props.isDragging"
            :tableStore="props.tableStore"
            :loaderStatus="props.loaderStatus"
            :isSortedSection="props.isSortedSection"
            :saveSettings="props.store.saveSettings"
            :scrollBlock="scrollBlock != null ? scrollBlock.scrollBlock : null"
            @sortTable="(data) => emit('sortTable', data)"
            @changeTab="(data) => $emit('changeTab', data)"
            @callAction="(data) => $emit('callAction', data)"
            @updateTableKeys="() => $emit('updateTableKeys', true)"
            @updateTableKeysOrder="(data) => $emit('updateTableKeysOrder', data)"
        />

        <AppSectionScrollBlock
	        ref="scrollBlock"
            class="table__desctop"
	        :tableRef="tableRef"
            :scrollPosition="scrollPosition"
            :userPosition="userPosition"
	        :tableStore="props.tableStore"
            :showScrollButton="props.showScrollButton"
        >
            <AppPageLoader class="table-loader" v-show="props.loaderTable" :style="`--windowScroll: ${scrollPosition}px;`"/>

            <AppPageLoader class="table-loader_before" v-if="props.loaderStatus"/>
            <template v-else>
                <AppMessageUpdate
                    v-if="props.tableStore.socketRows.length > 0"
                    :socketRows="props.tableStore.socketRows"
                    :slug="props.slug"
                    @callAction="(data) => $emit('callAction', data)"
                />
                <AppTable
                    v-if="props.tableStore.tableKeysFiltered.length != 0"
                    ref="tableRef"
                    :class="setClass"
                    :slug="props.slug"
                    :trash="props.trash"
                    :group="props.group"
                    :state="props.state"
                    :scrollBlock="scrollBlock"
                    :tableStore="props.tableStore"
                    :canDragRow="props.canDragRow"
                    :loaderStatus="props.loaderStatus"
                    :loaderTable="props.loaderTable"
                    :isCanPasteRow="props.isCanPasteRow"
                    :selectAll="props.tableStore.selectAll"
                    @dragEnd="(event) => $emit('dragEnd', event)"
                    @sortTable="(data) => emit('sortTable', data)"
                    @changeValue="(data) => ObjectsChangeValue(data, props.isDynamic, props.tableStore, props.store)"
                    @callAction="(data) => $emit('callAction', data)"
                    @chooseDragRow="(data) => $emit('chooseDragRow', data)"
                />
            </template>
            <div class="section_empty" v-show="!props.loaderStatus && props.tableStore.tableData.length == 0 && !props.loaderTable">
                Нет данных
            </div>
        </AppSectionScrollBlock>

        <MobileTable
            v-if="props.tableStore.isMobile"
            class="table__mobile"
            :slug="props.slug"
            :state="props.state"
            :scrollBlock="scrollBlock"
            :tableStore="props.tableStore"
            :loaderStatus="props.loaderStatus"
            :selectAll="props.tableStore.selectAll"
            @changeValue="(data) => ObjectsChangeValue(data, props.isDynamic, props.tableStore, props.store)"
            @callAction="(data) => $emit('callAction', data)"
        />

        <SectionFooter
            v-if="props.showFooter"
            :pageInfo="{
                countSelect: getSelectedCount,
                activePage: props.tableStore.pageInfo.activePage,
                totalPages: props.tableStore.pageInfo.totalPages,
                totalElems: props.tableStore.pageInfo.totalElems,
                visibleElems: props.tableStore.pageInfo.visibleElems,
            }"
            @callFooterActions="(data) => $emit('callAction', {
                action: data.key,
                item: data.value,
                tableStore: props.tableStore
            })"
        />

        <div ref="blockResizeRef" class="block-resize" v-if="props.resizeSection"></div>
    </AppSection>
</template>

<script setup>
    import './AppTableTemplate.scss';

    import TableTop from '../TableTop/TableTop.vue'
    import AppTable from '~/components/AppTable/AppTable.vue';
    import AppSection from '@/components/AppSection/AppSection.vue';
    import AppPageLoader from '@/components/AppPageLoader/AppPageLoader.vue'
    import MobileTable from '../MobileTable/MobileTable.vue';

    import _ from 'lodash'
    import TableScripts from "@/components/AppTable/TableScripts";
    import SectionFooter from '@/components/AppSection/SectionFooter/SectionFooter.vue'
    import AppSectionScrollBlock from '@/components/AppSection/AppSectionScrollBlock/AppSectionScrollBlock.vue';
    import ObjectsChangeValue from '@/components/ObjectsComponents/ObjectsComponentsScripts/ObjectsChangeValue.js'
    import SectionScrollBlockScripts from '@/components/AppSection/AppSectionScrollBlock/SectionScrollBlockScripts';
    import AppMessageUpdate from '@/components/AppMessageUpdate/AppMessageUpdate.vue';

    const scrollBlock = ref(null)
    const tableRef = ref(null)
    const blockResizeRef = ref()
    let activeBrowser = ref(null)
    let delta_h = ref(0); // Изменение по высоте
    const sectionRef = ref()
    let scrollPosition = ref(0)
    let userPosition = ref('all')

    const props = defineProps({
	    store: {
		    type: Object
	    },
        tableStore: {
            default: null
        },
        state: {
            default: null,
            type: String
        },
        loaderStatus: {
            default: false,
            type: Boolean
        },
        loaderTable: {
            default: false,
            type: Boolean
        },
        trash: {
	        default: false,
	        type: Boolean
        },
        slug: {
            default: '',
            type: String
        },
        showFooter: {
            default: true,
            type: Boolean
        },
        showScrollButton: {
            default: true,
            type: Boolean
        },
        resizeSection: {
            default: false,
            type: Boolean
        },
        showTitle: {
            default: false,
            type: Boolean
        },
        showTabs: {
            default: false,
            type: Boolean
        },
        tabs: {
            default: [],
            type: Array
        },
        title: {
            default: '',
            type: String
        },
        activeTab: {
            default: null,
            type: Object
        },
        isDragging: {
            default: false,
            type: Boolean
        },
        isSortedSection: {
            default: true,
            type: Boolean
        },
        group: {
            default: null,
            type: String
        },
        canDragRow: {
            default: false,
            type: Boolean
        },
        isCanPasteRow: {
            default: false,
            type: Boolean
        },
        isDynamic: {
            default: false,
            type: Boolean
        }
    })

    const emit = defineEmits([
        'sortTable',
        'changeValue',
        'callAction',
        'blockResized'
    ])

    const setClass = computed(() => {
        return props.loaderTable ? 'table_loading' : ''
    })

    const setSectionClasses = computed(() => {
        return [
            props.tableStore.tableKeys != null && props.tableStore.tableKeys.filter(p => p.enabled).length <= 0 ? 'section_default' : '',
            props.loaderStatus ? 'section_loading' : '',
            props.resizeSection ? 'section_resize' : ''
        ]
    })

    const getSelectedCount = computed(() => {
        return props.tableStore.tableData.filter(p => p.isChoose).length
    })

    onMounted(() => {
        if (props.resizeSection) {
            /* Определяем браузер */
            let browser = navigator.userAgent;
            if (browser.indexOf("Opera") != -1) activeBrowser.value = 'Opera';
            else {
                if (browser.indexOf("MSIE") != -1) activeBrowser.value = 'MSIE';
                else {
                    if (browser.indexOf("Firefox") != -1) activeBrowser.value = 'Firefox';
                }
            }

            setTimeout(() => {
                document.onmouseup = clearXY; // Ставим обработку на отпускание кнопки мыши
                blockResizeRef.value.onmousedown = saveWH; // Ставим обработку на нажатие кнопки мыши
            }, 1000);
        }

        props.tableStore.isMobile = window.innerWidth <= 660
        window.addEventListener('scroll', throt_funScroll)
        window.addEventListener('resize', throt_funButtons);
        scrollBlock.value.scrollBlock.addEventListener('scroll', async function(e){
            setUserPosition()
            throt_fun()
        })

        setTimeout(() => {
            setUserPosition()
            scrollPosition.value = SectionScrollBlockScripts.setButtonPosition(scrollBlock.value.scrollBlock)
        }, 100);
    })

    onUnmounted(() => {
        window.removeEventListener('scroll', throt_funScroll)
        window.removeEventListener('resize', throt_funButtons)
    })

    watch(props.tableStore.selectedItems, () => {
        if (props.tableStore.selectedItems.length <= 0) {
            props.tableStore.selectAll = false
        }
    })

    /* Функция для получения текущих координат курсора мыши */
    function getXY(obj_event) {
        let x = 0
        let y = 0

        if (obj_event) {
            x = obj_event.pageX;
            y = obj_event.pageY;
        }
        else {
            x = window.event.clientX;
            y = window.event.clientY;
        if (activeBrowser.value == 'MSIE') {
            y -= 2;
            x -= 2;
        }
        }
        return new Array(x, y);
    }
    function saveWH(obj_event) {
        let point = getXY(obj_event);
        sectionRef.value.sectionRef.classList.add('section_resizing')
        let h_block = sectionRef.value.sectionRef.clientHeight; // Текущая высота блока
        delta_h.value = h_block - point[1]; // Измеряем текущую разницу между высотой и y-координатой мыши
        /* Ставим обработку движения мыши для разных браузеров */
        document.onmousemove = resizeBlock;
        if (activeBrowser.value == 'Opera' || activeBrowser.value == 'Firefox') {
            document.addEventListener("onmousemove", resizeBlock, false);
        }
        return false; // Отключаем стандартную обработку нажатия мыши
    }

    /* При отпускании кнопки мыши отключаем обработку движения курсора мыши */
    function clearXY() {
        document.onmousemove = null;
        blockResized()

        for (let item of document.querySelectorAll('.section_resizing')) {
            item.classList.remove('section_resizing')
        }
    }

    const blockResized = () => {
        if (document.querySelectorAll('.section_resizing').length > 0) {
            emit('blockResized', true)
        }
    }

    function resizeBlock(obj_event) {
        let point = getXY(obj_event);
        let new_h = delta_h.value + point[1]; // Изменяем новое приращение по высоте
        sectionRef.value.sectionRef.style.height = `${new_h <= 100 ? 100 : new_h}px` // Устанавливаем новую высоту блока
    }

    const throt_fun = _.throttle(async function () {
        if (tableRef.value != null) {
            SectionScrollBlockScripts.setStickyPosition(
                tableRef.value.tableRef,
                scrollBlock.value.scrollBlock,
                props.tableStore
            )
        }
    }, 150);

    const throt_funScroll = _.throttle(async function () {
        scrollPosition.value = SectionScrollBlockScripts.setButtonPosition(scrollBlock.value.scrollBlock)
    }, 100);

    const throt_funButtons = _.throttle(async function () {
		if (tableRef.value == null) return
        let tableHeader = tableRef.value.tableRef.querySelector('.table__header')
        let sectionBody = tableRef.value.tableRef.parentNode
        setUserPosition()
        setVisibleTitle()
        props.tableStore.isMobile = window.innerWidth <= 660
        scrollPosition.value = SectionScrollBlockScripts.setButtonPosition(scrollBlock.value.scrollBlock)

        if (tableHeader.offsetWidth + 10 <= sectionBody.offsetWidth) {
            TableScripts.setCellsWidthDefference(tableHeader, sectionBody)
        }
    }, 150);

    watch(() => props.tableStore.tableData, () => {
        setTimeout(() => {
            setUserPosition()
            scrollPosition.value = SectionScrollBlockScripts.setButtonPosition(scrollBlock.value.scrollBlock)
        }, 200);
    }, {
        deep: true
    })

    watch(() => props.tableStore.tableKeysFiltered, () => {
        setUserPosition()
        scrollPosition.value = SectionScrollBlockScripts.setButtonPosition(scrollBlock.value.scrollBlock)
    }, {
        deep: true
    })

    function setVisibleTitle() {
        if (tableRef.value != null) {
            let list = tableRef.value.tableRef.querySelectorAll('thead .table__item ')
            let selectedItem = null

            for (let item of list) {
                selectedItem = item.querySelector('span') ?? item.querySelector('.form-item__title')
                if (item.offsetWidth <= 55) {
                    selectedItem.style.display = 'none'
                } else {
                    selectedItem.style.display = 'block'
                }
            }
        }
    }

    const setUserPosition = () => {
        if (scrollBlock.value.scrollBlock != undefined) {
            if (scrollBlock.value.scrollBlock.scrollWidth == scrollBlock.value.scrollBlock.offsetWidth + 10) {
                userPosition.value = 'all'
                return
            } else if (scrollBlock.value.scrollBlock.scrollWidth == scrollBlock.value.scrollBlock.offsetWidth) {
                userPosition.value = 'all'
                return
            } else if (scrollBlock.value.scrollBlock.scrollWidth == scrollBlock.value.scrollBlock.scrollLeft + scrollBlock.value.scrollBlock.offsetWidth) {
                userPosition.value = 'right'
                return
            } else if (scrollBlock.value.scrollBlock.scrollLeft == 0) {
                userPosition.value = 'left'
                return
            } else {
                userPosition.value = null
                return
            }
        }
    }
</script>
