<template>
    <div class="map__top map-top">
        <div class="map-top__group">
            <IconLassoRemove
                v-show="props.drawButtonActive"
                class="map-top__lasso"
                @click="() => emit('drawButton', false)"
            />
            <IconLasso
                v-show="!props.drawButtonActive"
                :class="props.drawButtonActive ? 'map-top__lasso_active' : ''"
                @click="() => emit('drawButton', true)"
            />
        </div>
    </div>
</template>

<script setup>
    import './MapDefaultTop.scss'

    import IconLasso from "@/components/AppIcons/IconLasso/IconLasso.vue";
    import IconLassoRemove from "@/components/AppIcons/IconLasso/IconLassoRemove/IconLassoRemove.vue";

    const props = defineProps({
        drawButtonActive: {
            default: false,
            type: Boolean
        }
    })

    const emit = defineEmits([
        'drawButton'
    ])
</script>