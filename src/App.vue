<template lang="pug">
  v-app( dark )
    appbar
    v-main( dark )
      router-view
</template>

<script>
import Appbar from './components/Appbar.vue';

export default {
  name: 'App',

  components: {
    Appbar,
  },

  data: () => ({
    //
  }),
};
</script>

<style lang="stylus" scoped>
  #app {
    background-color #212121
  }
</style>
