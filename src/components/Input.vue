<template lang="pug">
  v-sheet.form(rounded elevation="1")
    v-form.form-wrp(lazy-validation ref="form" v-model="valid")
      v-row
        v-text-field.form-input(
          v-for="i in heads" :key="item"
          type="text"
          :placeholder="i"
          solo
          dark
          required
          :rules="nameRules"
          v-model="items[i]"
        )
      v-btn.form-btn(dark rounded @click="typeView='editer' ? validate() :  validate()") {{"Добавить"}}
</template>


<script lang="ts">
import { it } from 'mocha';
import Vue from 'vue';


export default Vue.extend({
  name: 'Input',

  props: {
    typeView: String,
  },

  data: () => ({
      heads: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
      valid: false,
      nameRules: [(v: any) => !!v || 'Name is required'],
      items: []
  }),

  methods: {
    validate: function() {
      (this.$refs.form as Vue & { validate: () => boolean }).validate();

      if (this.valid && this.items.length == 19) {
        this.$store.dispatch('appendElement', this.items);
        this.items = [];
      }
    },
  },
});
</script>

<style lang="stylus" scoped>
  .form {
    padding 50px
    background-color #2d2d2d !important
    text-align center

    &-input {
      margin 2px 5px !important
    }

    &-btn {
      margin-top 30px
      min-width 20% !important
    }
  }
</style>
