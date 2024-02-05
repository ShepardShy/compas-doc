<template>
    <aside class="menu" ref="menuRef">
        <a href="/" class="menu__logo">
            <IconLogo />
        </a>

        <draggable 
            v-if="menu.length > 0"
            tag="nav" 
            class="menu__list"
            group="menu-list" 
            itemKey="menu-visible"
            v-model="menuVisible" 
            handle=".icon__draggable"
            @start="() => dragStart()"
            @end="(event) => dragEnd(event)" 
        >
            <template #item="{ element: item }">
                <li class="menu__item" 
                    :key="item.id" 
                    v-show="item.enabled"
                    :class="activeLink.link == item.link ? 'menu__item_active' : ''"
                >
                    <IconDrag />
                    {{ item.title }}
                </li>
            </template>
        </draggable>

        <details class="menu__item-details">
            <summary class="menu__item">
                Еще

                <IconArrow />
            </summary>

            <draggable 
                v-if="menu.length > 0"
                tag="nav" 
                class="menu__list"
                group="menu-list" 
                itemKey="menu-hidden"
                v-model="menuHidden" 
                handle=".icon__draggable"
                @end="(event) => dragEnd(event)" 
            >
                <template #item="{ element: item }">
                    <li class="menu__item" 
                        :key="item.id" 
                        v-show="item.enabled"
                        :class="activeLink.link == item.link ? 'menu__item_active' : ''"
                    >
                        <IconDrag />
                        {{ item.title }}
                    </li>
                </template>
            </draggable>
        </details>
    </aside>
</template>

<script setup>
    import './AppMenu.scss';
    
    import { ref, onMounted } from 'vue'
    import draggable from 'vuedraggable'

    import IconLogo from '@/components/AppIcons/Logo/Logo.vue'
    import IconDrag from '@/components/AppIcons/Drag/Drag.vue'
    import IconArrow from '@/components/AppIcons/Arrow/Arrow.vue'

    let menu = ref([
        {
            id: 0,
            link: '/1',
            enabled: 1,
            is_hidden: 0,
            title: 'Поле 1'
        },
        {
            id: 1,
            link: '/2',
            enabled: 1,
            is_hidden: 0,
            title: 'Поле 2'
        },
        {
            id: 2,
            link: '/3',
            enabled: 1,
            is_hidden: 0,
            title: 'Поле 3'
        },
        {
            id: 3,
            link: '/4',
            enabled: 1,
            is_hidden: 1,
            title: 'Поле 4'
        },
        {
            id: 4,
            link: '/5',
            enabled: 1,
            is_hidden: 0,
            title: 'Поле 5'
        }
    ])

    let menuVisible = ref([])
    let menuHidden = ref([])
    let activeLink = ref({})

    const menuRef = ref(null)

    const dragEnd = (event) => {
        let findIndex = menu.value.findIndex(item => event.item.__draggable_context.element.id)
        if (findIndex != -1) {
            menu.value[findIndex].is_hidden = event.to.__draggable_component__.itemKey == 'menu-hidden' ? 1 : 0
        }
        menuRef.value.classList.remove('menu_draggable')
    }

    const dragStart = () => {
        menuRef.value.classList.add('menu_draggable')
    }

    // Установка полей в меню
    const setFields = () => {
        menuVisible.value = menu.value.filter(item => !item.is_hidden)
        menuHidden.value = menu.value.filter(item => item.is_hidden)
    }

    onMounted(() => {
        setFields()
        activeLink.value = menuVisible.value[0]
    })
</script>
