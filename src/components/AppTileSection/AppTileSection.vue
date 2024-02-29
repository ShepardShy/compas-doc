<template>
    <AppSection class="tile-section">
        <TileHeader 
            @callAction="(data) => callActionSection(data)"
        />
        
        <div class="tile-section__content">
            <div class="tile-section__item">
                <IconDrag />

                <AppCheckbox 
                    :item="{
                        id: 0,
                        value: true,
                        isHTML: false,
                        required: false,
                        title: 'Показывать всегда',
                        key: 'visible_always'
                    }"
                />

                <AppPopup :closeByClick="true">
                    <template #summary>
                        <IconSettings />
                    </template>
                    <template #content>
                        <PopupOption>
                            Настроить
                        </PopupOption>
                        <PopupOption>
                            <AppCheckbox 
                                :item="{
                                    id: 0,
                                    value: true,
                                    isHTML: false,
                                    required: false,
                                    title: 'Показывать всегда',
                                    key: 'visible_always'
                                }"
                            />
                        </PopupOption>
                        <PopupOption>
                            Скрыть
                        </PopupOption>
                        <PopupOption class="popup__option_red">
                            Удалить
                        </PopupOption>
                    </template>
                </AppPopup>
            </div>
        </div>
    </AppSection>
</template>

<script setup>
    import './AppTileSection.scss';

    import { ref, provide } from 'vue';

    import AppSection from '@/components/AppSection/AppSection.vue';
    import AppPopup from '@/components/AppPopup/Popup.vue';
    import IconSettings from '@/components/AppIcons/Settings/Settings.vue';
    import PopupOption from '@/components/AppPopup/PopupOption/PopupOption.vue';
    import AppCheckbox from '@/components/AppInputs/Checkbox/Checkbox.vue';
    import IconDrag from '@/components/AppIcons/Drag/Drag.vue';

    import TileHeader from './Header/Header.vue'

    let section = ref({
        id: 0,
        title: 'Начальное название секции'
    })


    provide('section', section)

    // Действие с секцией
    const callActionSection = (data) => {
        // Перемещение секции
        const moveSection = (data) => {
            console.log('moveSection', data);
        }

        // Изменение заголовка
        const changeTitle = (data) => {
            console.log('changeTitle', data);
        }

        // Редактирование секции
        const editSection = (data) => {
            console.log('editSection', data);
        }

        // Удаление секции
        const deleteSection = (data) => {
            console.log('deleteSection', data);
        }


        switch (data.action) {
            // Перемещение секции
            case 'move':
                moveSection(data.value)
                break;
        
            // Изменение заголовка
            case 'changeTitle':
                changeTitle(data.value)
                break;

            // Редактирование секции
            case 'edit':
                editSection(data.value)
                break;

            // Удаление секции
            case 'delete':
                deleteSection(data.value)
                break;

            default:
                break;
        }
    }

</script>
