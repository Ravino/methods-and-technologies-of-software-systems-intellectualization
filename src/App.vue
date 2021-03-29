<template lang="pug">
v-app
  toolbar
  v-main
    router-view
</template>


<script lang="ts">
import Vue from 'vue';
import Toolbar from './components/Toolbar.vue';

export default Vue.extend({
  name: 'App',
  components: {
    Toolbar
  }
});
</script>
