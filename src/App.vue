<template>
  <div class="wrapper">
    <div class="page">
      <aside>
        <DocMenu 
          :activeLink="activeLink"
          @changeLink="(link) => changeLink(link)"
        />
      </aside>
      <AppMain 
        :activeLink="activeLink"
      />
    </div>
  </div>
</template>

<script setup>
  import '@/assets/default.scss'
  import '@/assets/fonts/fonts.css'

  import { ref } from 'vue'

  import DocMenu from './components/DocMenu/DocMenu.vue';
  import AppMain from './components/AppMain/AppMain.vue';

  let activeLink = ref({});

  const changeLink = (link) => {
      activeLink.value = link
  }

</script>
