<template>
    <ButtonDetails 
        :options="options" 
        :loaderButton="false"
        :mainAction="'mainAction'" 
        @mainAction="(data) => callAction(data)"
        @callAction="(option) => callAction(option)"
    >
        Создать
    </ButtonDetails>

    <AppButton class="button_red" @click="() => callAction('callAction')">
        Создать
    </AppButton>

    <ButtonText @click="() => callAction('callAction')">
        Создать
    </ButtonText>
</template>

<script setup>
    import './buttons.scss';
    
    import AppButton from '@/components/AppButton/AppButton.vue';
    import ButtonText from '@/components/AppButton/ButtonText/ButtonText.vue';
    import ButtonDetails from '@/components/AppButton/ButtonDetails/ButtonDetails.vue';

    let options = [
        {
            id: 0,
            name: 'Элемент 1',
            action: 'callAction'
        },
        {
            id: 1,
            name: 'Элемент 2',
            action: 'callAction'
        },
        {
            id: 2,
            name: 'Элемент 3',
            action: 'callAction'
        },
        {
            id: 3,
            name: 'Элемент 4',
            action: 'callAction'
        }
    ]

    const callAction = (data) => {
        console.log(data);
    }
</script>
