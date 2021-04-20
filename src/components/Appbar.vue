<template lang="pug">
  v-app-bar(
    app
    dark
  )

    v-toolbar-title Интеллектуальная система для определения категорий классов автомобилей
    template( v-slot:extension )
      navigation-menu
</template>

<script>
import NavigationMenu from './NavigationMenu.vue';

export default {
  name: 'appbar',

  components: {
    NavigationMenu,
  },
};
</script>
