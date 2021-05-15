<template lang="pug">
  .wrp
    v-row( justify="center" no-gutters align="center" )
      v-autocomplete.select-class(
        :items="classes"
        item-text="name"
        v-model="selectClass"
        solo
        no-data-text="Класс не найден"
        placeholder="Выберите класс"
      )
</template>

<script>
export default {
  name: 'class-with-signs',

  data() {
    return {
      selectClass: null,
    };
  },

  computed: {
    classes() {
      return this.$store.getters.classes;
    },
  },
};
</script>

<style lang="stylus" scoped>
  .wrp {
    margin-top 30px
  }

  .select-class {
    width 30%
    max-width 30%
  }
</style>
