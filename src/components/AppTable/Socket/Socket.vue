<template>
    <div class="table-template__socket table-socket">
        <span class="table-socket__text">
            {{ socketRows.length }} изменения в таблице
        </span>
        <ButtonText @click="$emit('callAction', {action: 'socketUpdate', value: null})">
            Загрузить
        </ButtonText>
    </div>
</template>

<script setup>
    import './Socket.scss';
    
    import ButtonText from '@/components/AppButton/ButtonText/ButtonText.vue'; 

    const props = defineProps({
        socketRows: {
            default: [
                {
                    id: 0,
                    key: null
                }
            ],
            type: Array
        }
    })

</script>
