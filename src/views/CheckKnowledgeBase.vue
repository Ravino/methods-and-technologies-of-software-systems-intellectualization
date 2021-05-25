<template lang="pug">
  .check-knowledge-base
    v-row( justify="center" no-gutters align="center" )
      v-btn.btn-check(
        dark
        @click="checking"
      ) Проверить
        v-icon( right ) mdi-check

    v-row.class-card-wrp(
      justify="center"
      no-gutters
      align="center"
      :style="!expandAddField ? {marginTop: '12px'} : ''"
    )
      v-card.class-card( dark v-for="( item, index ) in classes" :key="item.name"
      v-show="item.broken")
        v-list-item
          v-list-item-content
            v-list-item-title {{item.name}}
            v-list-item-subtitle {{item.broken ? 'Не пройдена': 'Пройдена'}}
</template>

<script>
export default {
  name: 'check-knowledge-base',

  data() {
    return {
      expandAddField: false,
      className: null,
      sortedClasses: [],
      searchMask: null,
    };
  },

  methods: {
    checking() {
      for (let i = 0; i < this.classes.length; i += 1) {
        if(!this.classes[i].signs.length) {
          continue;
        }

        for(let j = 0; j < this.classes.signs.length; j++) {
          if(!this.types.includes(this.classes[i].signs[j].type)) {
            this.$store.dispatch('markerBrokenClass', { position: i, flag: true });
            this.$store.dispatch('markerBrokenSignsForClassifier', {positionClass: i, positionSign: j, flag: true});
          }
        }
      }

      return null;
    },
  },

  computed: {
    classes() {
      return this.$store.getters.classes;
    },

    types() {
      return this.$store.getters.types;
    },
  },

  watch: {
    expandAddField() {
      this.$nextTick();
      if (this.expandAddField) {
        setTimeout(() => {
          this.$refs.addField.focus();
        }, 100);
      }
    },

    classes() {
      if (!this.searchMask) {
        this.sortedClasses = this.classes;
      }
    },

    searchMask() {
      this.sortedClasses = [];

      this.classes.forEach((element) => {
        if (element.name.toLowerCase().includes(this.searchMask.trim().toLowerCase())) {
          this.sortedClasses.push(element);
        }
      });
    },
  },

  created() {
    this.sortedClasses = this.classes;
  },
};
</script>

<style lang="stylus" scoped>
  .check-knowledge-base {
    margin-top 30px
  }

  .search-field {
    width 30%
    max-width 30%
  }

  .btn-check {
    color #FFF3E0 !important
    width 30%
    margin-top 12px
  }

  .add-field {
    width 30% !important
    max-width 30% !important
  }

  .class-card {
    width 20%
    margin 5px
  }
</style>
