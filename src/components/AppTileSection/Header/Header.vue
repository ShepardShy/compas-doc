<template>
    <div class="tile-section__header">
        <div 
            class="tile-section__title" 
            :class="Boolean(stateTitle) ? 'tile-section__title_edit' : ''" 
            v-click-out-side="(event) => stateTitle ? saveTitle() : ''"
        >
            <IconDrag />

            <AppInput 
                :item="{
                    focus: false,
                    id: 'tileHeader',
                    placeholder: null,
                    key: 'tileHeader',
                    type: 'text',
                    title: 'Заголовок секции',
                    substring: null,
                    required: false,
                    external_link: null,
                    focus: stateTitle,
                    value: section.title,
                }"
                :disabled="false"
                :isUseEnter="false"
                :mask="null"
                :isLink="false"
                :isReadOnly="Boolean(!stateTitle)"
                @keyup.enter="() => stateTitle ? saveTitle() : ''"
                @changeValue="(data) => changeValue(data)"
            > 
            
                <div class="form-item__mirror">
                    {{ section.title }}
                </div>
                <IconEdit v-show="!stateTitle" @click="() => editTitle()"/>
            </AppInput>
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
    
    import { ref, inject } from 'vue';

    import AppPopup from '@/components/AppPopup/Popup.vue';
    import IconDrag from '@/components/AppIcons/Drag/Drag.vue';
    import IconEdit from '@/components/AppIcons/Edit/Edit.vue';
    import AppInput from '@/components/AppInputs/Input/Input.vue';
    import IconSettings from '@/components/AppIcons/Settings/Settings.vue';
    import ButtonText from '@/components/AppButton/ButtonText/ButtonText.vue';
    import PopupOption from '@/components/AppPopup/PopupOption/PopupOption.vue';
    import { clickOutSide as vClickOutSide } from '@mahdikhashan/vue3-click-outside'

    const emit = defineEmits([
        'callAction'
    ])

    let stateTitle = ref(false)
    const section = inject('section')

    // Начало редактирования заголовка
    const editTitle = () => {
        stateTitle.value = true
    }

    // Сохранение заголовка
    const saveTitle = () => {
        stateTitle.value = false
        emit('callAction', { 
            action: 'changeTitle', 
            value: {
                id: section.value.id,
                title: section.value.title

            } 
        })
    }

    // Изменение значения заголовка
    const changeValue = (data) => {
        section.value.title = data.value
    }
</script>
