<template>
    <figure class="icon__edit">
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd"
                d="M11.3384 3.70456L9.29544 1.6616L10.6234 0.333683C10.6234 0.333683 11.747 -0.381352 12.5642 0.43583C13.3814 1.25301 12.6663 2.37664 12.6663 2.37664L11.3384 3.70456ZM2.1451 8.81194L4.18806 10.8549L10.6234 4.41959L8.58041 2.37664L2.1451 8.81194ZM1.53222 9.52698L0 13L3.57517 11.4678L1.53222 9.52698Z"
                fill="black" />
        </svg>
        <figcaption>
            <slot></slot>
        </figcaption>
    </figure>
</template>

<script setup>
    import './Edit.scss';
    
</script>
