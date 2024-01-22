<template>
	<div class="table__item-content">
		<div class="table__item-content_title">
			{{ props.item.title }}
		</div>
		<div class="item__section">
			<slot></slot>
		</div>
	</div>
</template>

<script setup>
    import './TableItemSection.scss';

    const props = defineProps({
	    item: {
		    default: {
			    title: 'Пополнить баланс',
		    },
		    type: Object
	    }
    })
</script>
