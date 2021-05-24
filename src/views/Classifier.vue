<template lang="pug">
  .wrp
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

        v-sheet.sign
          v-row( no-gutters )
            v-col( cols="4" align="center" ) Имя
            v-col( cols="4" align="center" ) Тип
            v-col( cols="4" align="center" ) Значение

        v-sheet.sign( v-for="item in selectedSignsList" :key="item.name" )
          v-row( no-gutters )
            v-col( cols="4" align="center" ) {{item.name}}
            v-col( cols="4" align="center" ) {{item.type}}
            v-col( cols="4" align="center" )
              v-text-field(
                solo
                dense
                light
                hide-details
                placeholder="Значение"
                v-model="item.value"
              )
        v-row.btn( justify="center" no-gutters align="center" v-if="selectedSignsList.length")
          v-btn( @click="search" ) Ок, погнали
</template>

<script>
export default {
  name: 'classifer',
  data() {
    return {
      selectedSign: null,
      selectedSignsList: [],
    };
  },

  methods: {
    search() {
      this.$store.dispatch('addSignsForClassifier', this.selectedSignsList);
    },
  },

  computed: {
    signs() {
      return this.$store.getters.signs;
    },
  },

  watch: {
    selectedSign() {
      const sign = {};
      sign.name = this.selectedSign.name;
      sign.type = this.selectedSign.type;
      sign.value = null;

      this.selectedSignsList.push(sign);
    },
  },
};
</script>

<style lang="stylus" scoped>
  .wrp {
    margin-top 30px
  }

  .signs-wrp, .all-signs {
    width 30%
    max-width 30%
  }

  .sign {
    padding 10px
  }

  .btn {
    margin-top 15px
  }
</style>
