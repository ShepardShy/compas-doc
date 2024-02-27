<template>
    <div class="tile-section__header">
        <div class="tile-section__title">
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
                @changeValue="(data) => changeValue(data)"
                @clickOutside="() => stateTitle ? saveTitle() : ''"
            />

            <IconEdit v-show="!stateTitle" @click="() => editTitle()"/>
        </div>
        <div class="tile-section__header-actions">
            <ButtonText>
                Изменить
            </ButtonText>

            <AppPopup :closeByClick="true">
                <template #summary>
                    <IconSettings />
                </template>
                <template #content>
                    <PopupOption class="popup__option_red">
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

    import IconEdit from '@/components/AppIcons/Edit/Edit.vue';
    import AppInput from '@/components/AppInputs/Input/Input.vue';
    import ButtonText from '@/components/AppButton/ButtonText/ButtonText.vue';
    import AppPopup from '@/components/AppPopup/Popup.vue';
    import IconSettings from '@/components/AppIcons/Settings/Settings.vue';
    import PopupOption from '@/components/AppPopup/PopupOption/PopupOption.vue';
    import IconDrag from '@/components/AppIcons/Drag/Drag.vue';

    const emit = defineEmits([
        'callAction'
    ])

    let stateTitle = ref(false)

    const section = inject('section')

    const editTitle = () => {
        stateTitle.value = true
    }

    const saveTitle = () => {
        stateTitle.value = false
        emit('callAction', { 
            action: 'editSection', 
            value: {
                id: section.id,
                title: section.title
            } 
        })
    }

    // Изменение значения заголовка
    const changeValue = (data) => {
        section.value.title = data.value
    }
</script>
