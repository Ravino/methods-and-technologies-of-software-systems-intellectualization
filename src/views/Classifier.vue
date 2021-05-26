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
            v-col( cols="4" align="center" ) Действие
            v-col( cols="4" align="center" ) Имя
            v-col( cols="4" align="center" ) Тип
            v-col( cols="4" align="center" ) Значение

        v-sheet.sign( v-for="(item, index) in selectedSignsList" :key="item.name" )
          v-row( no-gutters )
            v-col( cols="4" align="center" )
              v-icon(@click="removeSignForClassifier(index)") mdi-delete
            v-col( cols="4" align="center" ) {{item.name}}
            v-col( cols="4" align="center" ) {{item.type}}
            v-col( cols="4" align="center" )
              v-container(
                v-show="!item.type"
                fluid
              ) Тип признака не определён, значение не может быть задано
              v-checkbox(
                v-show="item.type=='boolean'"
                :label="`В наличии`"
                v-model="item.value[0]"
              )
              v-text-field(
                v-show="item.type=='enum'"
                solo
                dense
                light
                hide-details
                placeholder="Значение"
                v-model="item.value[0]"
              )
              v-text-field(
                v-show="item.type=='number'"
                solo
                dense
                light
                hide-details
                placeholder="Значение"
                v-model="item.value[0]"
              )
              v-text-field(
                v-show="item.type=='range'"
                solo
                dense
                light
                hide-details
                placeholder="Мин. Значение"
                v-model="item.value[0]"
              )
              v-text-field(
                v-show="item.type=='range'"
                solo
                dense
                light
                hide-details
                placeholder="Макс. Значение"
                v-model="item.value[1]"
              )
        v-row.btn( justify="center" no-gutters align="center" v-if="selectedSignsList.length")
          v-btn( @click="search" ) Поиск
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
    removeSignForClassifier(signPosition) {
      this.selectedSignsList.splice(signPosition, 1);
      return null;
    },

    search() {
      this.$store.dispatch('addSignsForClassifier', []);
      this.$store.dispatch('addSignsForClassifier', this.selectedSignsList);
      this.$store.dispatch('recoveryCorrectClass', []);
      this.$store.dispatch('recoveryPotentialClass', []);
      this.handler();
      this.selectedSignsList = [];
      this.$router.push({ name: 'classifierResult' });
    },

    handler() {

      for(let currentClass of this.classes) {

        if(!currentClass.signs.length) {
          this.$store.dispatch('addPotentialClass', currentClass);
          continue;
        }


        let flag = false;
        for(let signForClassifier of this.signsForClassifier) {

          for(let sign of currentClass.signs) {

            if(sign.name == signForClassifier.name && sign.type == signForClassifier.type && JSON.stringify(sign.value) == JSON.stringify(signForClassifier.value)) {
              flag = true;
              break;
            }

            if(sign.name == signForClassifier.name && sign.type == signForClassifier.type) {
              flag = false;
              break;
            }

            if(sign.name == signForClassifier.name) {
              flag = false;
              break;
            }
          }
        }


        if(flag) {
          this.$store.dispatch('addCorrectClass', currentClass);
          continue;
        }


        this.$store.dispatch('addPotentialClass', currentClass);
      }

      return null;
    }
  },

  computed: {
    signs() {
      return this.$store.getters.signs;
    },
    signsForClassifier() {
      return this.$store.getters.signsForClassifier;
    }
  },

  watch: {
    selectedSign() {

      const item = this.selectedSignsList.find(x => x.name == this.selectedSign.name);
      if(item) {
        alert("Данный признак не может быть выбран повторно");
        return null;
      }


      const sign = {};
      sign.name = this.selectedSign.name;
      sign.type = this.selectedSign.type;
      sign.value = [];

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
