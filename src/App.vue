<template>
  <div class="wrapper">
    <div class="page">
      <aside>
        <DocMenu 
          :activeLink="activeLink"
          @changeLink="(link) => changeLink(link)"
        />
      </aside>
      <MainTemplate 
        :activeLink="activeLink"
      />
    </div>
  </div>
</template>

<script setup>
  import '@/assets/default.scss'
  import '@/assets/fonts/fonts.css'

  import { ref } from 'vue'

  import DocMenu from './components/AppTemplates/DocMenu/DocMenu.vue';
  import MainTemplate from './components/AppTemplates/Main/Main.vue';

  let activeLink = ref({});

  const changeLink = (link) => {
      activeLink.value = link
  }

</script>
