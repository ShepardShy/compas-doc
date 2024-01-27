<template>
    <div ref="container">
        <slot></slot>
    </div>
</template>

<script setup>
    import './FansyBox.scss';
    import '@fancyapps/ui/dist/fancybox/fancybox.css';

    import {Fancybox} from "@fancyapps/ui";
    import {onMounted, ref} from "vue";

    const options = {
        Carousel: {
            infinite: false,
        },
        idle: false
    }

    const container = ref(null);

    onMounted(() => {
        Fancybox.bind(container.value, '[data-fancybox]', {
            ...(options || {}),
        });
    });
</script>