<template>
    <div class="tile-section__header">
        <div 
            class="tile-section__title" 
            :class="Boolean(stateTitle) ? 'tile-section__title_edit' : ''" 
        >
            <IconDrag />

            <AppH3Editable 
                :item="{
                    value: section.title,
                    key: 'tileHeader',
                }"
                @saveTitle="(data) => emit('callAction', { 
                    action: 'changeTitle', 
                    value: {
                        id: section.value.id,
                        title: data
                    } 
                })"
            />
        </div>
        <div class="tile-section__header-actions">
            <ButtonText @click="() => emit('callAction', { action: 'changeState', value: null })">
                {{ section.state ? 'Отмена' : 'Изменить' }}

            </ButtonText>

            <AppPopup :closeByClick="true">
                <template #summary>
                    <IconSettings />
                </template>
                <template #content>
                    <PopupOption class="popup__option_red" @click="() => emit('callAction', { action: 'delete', value: section.id })">
                        Удалить
                    </PopupOption>
                </template>
            </AppPopup>
        </div>
    </div>
</template>

<script setup>
    import './Header.scss';
    
    import { inject } from 'vue';

    import AppPopup from '@/components/AppPopup/Popup.vue';
    import IconDrag from '@/components/AppIcons/Drag/Drag.vue';
    import AppH3Editable from '@/components/AppHeaders/H3/Editable/Editable.vue';
    import IconSettings from '@/components/AppIcons/Settings/Settings.vue';
    import ButtonText from '@/components/AppButton/ButtonText/ButtonText.vue';
    import PopupOption from '@/components/AppPopup/PopupOption/PopupOption.vue';

    const emit = defineEmits([
        'callAction'
    ])

    const section = inject('section')
</script>
