<template>
    <AppH1>
        Заголовок 1
    </AppH1>

    <AppH2>
        Заголовок 2
    </AppH2>
    <AppH3>
        Заголовок 3
    </AppH3>

    <AppH1Editable 
        :item="{
            value: 'Редактируемый заголовок 1',
            key: 'h1'
        }"
        :isCanEdit="true"
        :isRestore="false"
        :isCreate="false"
        :loaderState="null"
        @callAction="(data) => callAction(data)"
    />

    <AppH2Editable 
        :item="{
            value: 'Редактируемый заголовок 2',
            key: 'h2'
        }"
        @callAction="(data) => callAction(data)"
    />

    <AppH3Editable 
        :item="{
            value: 'Редактируемый заголовок 3',
            key: 'h3'
        }"
        @callAction="(data) => callAction(data)"
    />
</template>

<script setup>
    import './headers.scss';

    import AppH1 from '@/components/AppHeaders/H1/H1.vue';
    import AppH2 from '@/components/AppHeaders/H2/H2.vue';
    import AppH3 from '@/components/AppHeaders/H3/H3.vue';
    import AppH1Editable from '@/components/AppHeaders/H1/Editable/Editable.vue';
    import AppH2Editable from '@/components/AppHeaders/H2/Editable/Editable.vue';
    import AppH3Editable from '@/components/AppHeaders/H3/Editable/Editable.vue';

    const callAction = (data) => {
        console.log(data);
    }
</script>
