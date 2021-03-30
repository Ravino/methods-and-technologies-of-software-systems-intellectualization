<template lang="pug">
v-app-bar(app dark)
  v-tabs(grow)
    v-tab(@click="checkout('editer')") Редактор
    v-tab(@click="checkout('classifier')") Классификатор
</template>


<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Toolbar',
  methods: {
    checkout: function(typeTab: string) {
      this.$router.replace("/" + typeTab);
    }
  }
});
</script>
