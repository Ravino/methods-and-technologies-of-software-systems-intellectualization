<template lang="pug">
  .wrp
    v-row( justify="center" no-gutters align="center" )
      v-autocomplete.select-class(
        :items="classes"
        item-text="name"
        v-model="selectedClass"
        solo
        dark
        no-data-text="Класс не найден"
        placeholder="Выберите класс"
        return-object
      )

    v-row( justify="center" no-gutters align="center" )
      v-card.signs-wrp( dark )
        v-autocomplete(
          :items="signs"
          item-text="name"
          v-model="selectedSign"
          hide-details
          solo
          light
          no-data-text="Признак не найден"
          placeholder="Выберите признак"
          return-object
        )

        v-divider.my-divider(v-show="selectedClass.signs && selectedClass.signs.length")

        v-list-item( v-for="item in selectedClass.signs" :key="item.name" )
          v-list-item-title {{item.name}}
          v-list-item-action
            v-text-field(
              solo
              light
              readonly
              :value="item.type"
            )
            v-text-field(
              solo
              light
              placeholder="Мин. значение"
            )
            v-text-field(
              solo
              light
              placeholder="Макс. значение"
            )
</template>

<script>
export default {
  name: 'class-with-signs',

  data() {
    return {
      selectedClass: {},
      selectedSign: null,
      clsSigns: [],
    };
  },

  computed: {
    classes() {
      return this.$store.getters.classes;
    },

    signs() {
      return this.$store.getters.signs;
    },
  },

  watch: {
    selectedSign() {
      this.$store.dispatch('addSignToClass', {
        className: this.selectedClass.name,
        sign: this.selectedSign,
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
  .wrp {
    margin-top 30px
  }

  .select-class, .signs-wrp {
    width 30%
    max-width 30%
  }

  .my-divider {
    margin 15px 0
  }
</style>
