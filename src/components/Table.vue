<template lang="pug">
  v-simple-table.table(dark)
    template(v-slot:default)
      thead
        tr
          th(v-for="item in heads" :key="item") {{item}}
      tbody
        tr(v-for="element in elements")
          th(v-for="item in element" @click="item.click = true")
            v-text-field.input-in-table(
              type="text"
              :value="item.val"
              v-model="item.val"
              @click:append="changeField(item)"
              v-if="item.click && typeView == 'editer'"
              append-icon="mdi-check")
            span(v-else) {{item.val}}
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Table',
  data: () => ({
    heads: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
  }),

  props: {
    typeView: String,
  },

  methods: {
    changeField(item) {
      item.click = false;
    },
  },

  computed: {
    elements() {
      return this.$store.getters.getElements;
    },
  },
});
</script>

<style lang="stylus" scoped>
  .table {
    margin-top 50px
  }

  .v-input__append-inner {
    cursor pointer !important
  }

  .input-in-table {
    max-width 80px
    color #FFFFFF
  }
</style>
