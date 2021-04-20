<template lang="pug">
  v-app( dark )
    appbar
    v-main( dark )
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
