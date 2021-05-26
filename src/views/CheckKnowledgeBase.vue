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
            v-list-item-title Класс: {{item.name}}
            v-list-item-subtitle {{parseError(item.comment)}}
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
        if (!this.classes[i].signs.length) {
          this.$store.dispatch('markerBrokenClass', { position: i, flag: true, comment: 'fewSign' });
          // eslint-disable-next-line no-continue
          continue;
        }

        for (let j = 0; j < this.classes[i].signs.length; j += 1) {
          if (!this.types.includes(this.classes[i].signs[j].type)) {
            this.$store.dispatch('markerBrokenClass', { position: i, flag: true, comment: 'invalidType' });
            this.$store.dispatch('markerBrokenSignsForClassifier', {
              positionClass: i, positionSign: j, flag: true, comment: 'invalidType',
            });
            // eslint-disable-next-line no-continue
            continue;
          }

          // eslint-disable-next-line max-len
          const resultCheck = this.checkValue(this.classes[i].signs[j].type, this.classes[i].signs[j].value);
          if (resultCheck.result) {
            this.$store.dispatch('markerBrokenClass', { position: i, flag: false, comment: resultCheck.comment });
            this.$store.dispatch('markerBrokenSignsForClassifier', {
            // eslint-disable-next-line no-undef
              positionClass: i, positionSign: j, flag: false, comment: resultCheck.comment,
            });
            // eslint-disable-next-line no-continue
            continue;
          }

          this.$store.dispatch('markerBrokenClass', { position: i, flag: true, comment: resultCheck.comment });
          this.$store.dispatch('markerBrokenSignsForClassifier', {
            positionClass: i, positionSign: j, flag: true, comment: resultCheck.comment,
          });
        }
      }

      console.log(this.classes);

      return null;
    },

    checkValue(type, value) {
      const obj = {
        result: true,
        comment: null,
      };

      if (type === 'boolean' && typeof value[0] !== 'boolean') {
        obj.result = false;
        obj.comment = 'invalidValue';
        return obj;
      }

      // eslint-disable-next-line no-restricted-globals
      if (type === 'number' && isNaN(value[0])) {
        obj.result = false;
        obj.comment = 'invalidValue';
        return obj;
      }

      if (type === 'enum' && typeof value[0] !== 'string') {
        obj.result = false;
        obj.comment = 'invalidValue';
        return obj;
      }

      // eslint-disable-next-line no-restricted-globals
      if (type === 'range' && isNaN(value[0]) && isNaN(value[1])) {
        obj.result = false;
        obj.comment = 'invalidValue';
        return obj;
      }

      if (type === 'range' && (value[0] > value[1] || value[1] < value[0])) {
        obj.result = false;
        obj.comment = 'invalidValue';
        return obj;
      }

      return obj;
    },

    parseError(err) {
      switch (err) {
        case 'fewSign': return 'Недостаточно признаков';
        case 'invalidValue': return 'Ошибка в значении/значениях';
        case 'invalidType': return 'Ошибка в типе признака';
        default:
          return err;
      }
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
