<template>
    <aside class="menu menu_mobile">
        <IconGamburger 
            class="menu__gamburger"
            @click="() => callAction({action: 'showMenu', value: true})"
        />

        <div class="menu__content" v-show="settingsMenu.isShow">
            <AppH2 class="menu__nav-back" @click="() => callAction({action: 'navigateMenu', value: settingsMenu.activeTab == null ? false : null})">
                <IconArrow />
                {{ settingsMenu.activeTab == null ? 'Меню' : settingsMenu.activeTab.title }}
            </AppH2>

            <nav class="menu__list" v-if="settingsMenu.activeTab == null">
                <NuxtLink @click="() => callAction({action: 'showMenu', value: false})" :to="item.link" class="menu__item" :class="activeLink.link == item.link ? 'menu__item_active' : ''" v-for="item in menuVisible" :key="item.id" v-show="item.enabled">
                    {{ item.name }}
                </NuxtLink>
            </nav>
            <nav class="menu__list" v-else-if="settingsMenu.activeTab.tab == 'hidden'">
                <NuxtLink @click="() => callAction({action: 'showMenu', value: false})" :to="item.link" class="menu__item" v-for="item in menuHidden" :key="item.id" v-show="item.enabled">
                    {{ item.name }}
                </NuxtLink>
            </nav>
            <nav class="menu__list" v-else-if="settingsMenu.activeTab.tab == 'user'">
                <NuxtLink to="/profile" class="menu__item" @click="() => callAction({action: 'showMenu', value: false})">
                    Настройки
                </NuxtLink>
                <button
                    class="menu__item menu__item_btn-logout"
                    @click="logOut"
                >
                    Выйти
                </button>
            </nav>

            <div 
                class="menu__item menu_other" 
                v-show="settingsMenu.activeTab == null"
                @click="() => callAction({action: 'navigateMenu', value: 'hidden'})"
            >
                Еще
                <IconArrow />
            </div>

            <div class="menu_other menu__item" v-show="settingsMenu.activeTab == null" @click="() => callAction({action: 'navigateMenu', value: 'user'})"> 
                <div 
                    class="menu__user menu-user">
                    <figure class='ibg menu-user__icon'>
                        <img :src='user.avatar != undefined ? user.avatar.file : "/user/avatar.svg"' :alt="`${user.name} ${user.last_name}. Аватар`">
                    </figure>
                    <div class="menu-user__title">
                        {{ user.name }} {{ user.last_name }}
                    </div>
                </div>
                <IconArrow />
            </div>
        </div>
    </aside>
</template>

<script setup>
    import './Mobile.scss';

    import IconArrow from '@/components/AppIcons/Arrow/Arrow.vue'
    import IconGamburger from '@/components/AppIcons/Gamburger/Gamburger.vue'

    import AppH2 from '@/components/AppHeaders/H2/H2.vue'

    let settingsMenu = ref({
        tabs: [
            {
                tab: 'hidden',
                title: 'Еще',
            },
            {
                tab: 'user',
                title: 'Денис Потемкин',
            }
        ],
        isShow: false,
        activeTab: null
    })    

    const user = inject('user')
    const menuVisible = inject('menuVisible')
    const menuHidden = inject('menuHidden')
    const activeLink = inject('activeLink')

    // Вызов действий
    const callAction = (data) => {
        // Показ/скрытие меню
        const showMenu = (state) => {
            if (!state) {
                settingsMenu.value.activeTab = null
            }
            settingsMenu.value.isShow = state
        }

        // Навигация по меню
        const navigateMenu = (value) => {
            if (value == false) {
                showMenu(false)
            } else {
                settingsMenu.value.activeTab = settingsMenu.value.tabs.find(tab => tab.tab == value) ?? null
            }
        }

        switch (data.action) {
            // Показ/скрытие меню
            case 'showMenu':
                showMenu(data.value)
                break;
        
            // Навигация по меню
            case 'navigateMenu':
                navigateMenu(data.value)
                break;
            default:
                break;
        }
    }

    // Выход из системы
    const logOut = () => {
        window.location.href = '/auth'
    }
</script>
