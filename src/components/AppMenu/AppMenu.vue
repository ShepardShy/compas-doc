<template>
    <MenuDesktop 
        @callAction="(data) => callAction(data)"
    />
    <MenuMobile />
</template>

<script setup>
    import './AppMenu.scss';

   import MenuDesktop from './Desktop/Desktop.vue'
   import MenuMobile from './Mobile/Mobile.vue'

   const emit = defineEmits([
       'callAction'
   ])

    let menu = ref([])
    let user = ref({})

    let menuVisible = ref([])
    let menuHidden = ref([])
    let activeLink = ref({})

    const route = useRoute()

    provide('menu', menu)
    provide('user', user)
    provide('menuHidden', menuHidden)
    provide('activeLink', activeLink)
    provide('menuVisible', menuVisible)

    // Вызов действий
    const callAction = (data) => {
        // Устновка данных пользователя
        const setUser = () => {
            if ([null, undefined].includes('') && typeof '' != "object") {
                user.value = {
                    name: 'Неизвестный',
                    last_name: 'Пользователь',
                    avatar: {
                        file: '/user/avatar.svg'
                    },
                    color: 'linear-gradient(82deg, #7ba06d, #6204c4)'
                }
            } else {
                user.value = {}
            }
        }

        // Установка полей в меню
        const setMenu = () => {
            // menu.value = Array.isArray(commonStore.menu) ? commonStore.menu : []
        }

        // Установка полей в меню
        const setFields = () => {
            menuVisible.value = menu.value.filter(item => !item.is_hidden)
            menuHidden.value = menu.value.filter(item => item.is_hidden)
        }

        // Установка активной ссылки
        const setActiveLink = () => {
            // Проверка переменной на число
            const isInteger = (value) => {
                return /^\d+$/.test(value);
            }

            // Определение является ли ссылка активной
            const matchLink = (link) => {
                let routeMatch = route.path.match(link)
                if (routeMatch != null) {
                    if (routeMatch.input.substr(routeMatch.input.length - 1) == '/') {
                        routeMatch.input = routeMatch.input.slice(0, -1)
                    } else {
                        let routeString = routeMatch.input.split('/')
                        if (isInteger(routeString[routeString.length - 1])) {
                            routeString.pop()
                            routeMatch.input = routeString.join('/')
                        }
                    }
                }
                return routeMatch != null
            }

            activeLink.value = menu.value.find(option => matchLink(option.link)) ?? menu.value[0]
        }

        // Сохранение значений в настройках
        const saveSettings = (data) => {
            // commonStore.updateMenu(data);
        }

        switch (data.action) {
            // Устновка данных пользователя
            case 'setUser':
                setUser()
                break;

            // Установка полей в меню
            case 'setFields':
                setFields()
                break;

            // Установка активной ссылки
            case 'setActiveLink': 
                setActiveLink()
                break;
        
            // Установка полей в меню
            case 'setMenu':
                setMenu()
                break;

            // Сохранение значений в настройках
            case 'saveSettings':
                saveSettings(data.value)

            default:
                break;
        }
    }

    watch(() => route.path, () => {
        callAction({action: 'setActiveLink', value: null})
    })

    onMounted(() => {
        callAction({action: 'setUser', value: null})
        callAction({action: 'setMenu', value: null})
        callAction({action: 'setFields', value: null})
        callAction({action: 'setActiveLink', value: null})
    })
</script>
