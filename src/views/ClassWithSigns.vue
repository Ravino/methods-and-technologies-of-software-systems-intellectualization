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

        v-sheet.my-sheet
          v-row( justify="center" no-gutters align="center" )
            v-col(cols="3")
              v-row.center-row( justify="center" no-gutters align="center" ) Название
            v-col(cols="2")
              v-row.center-row( justify="center" no-gutters align="center" ) Тип
            v-col(cols="6")
              v-row.center-row( justify="center" no-gutters align="center" ) Значения
            v-col(cols="1")
              v-row.center-row( justify="center" no-gutters align="center" ) Действие

        v-sheet.my-sheet( v-for="( item, index ) in selectedClass.signs" :key="item.name" )
          v-row( no-gutters )
            v-col(cols='3')
              v-row.center-row( justify="center" no-gutters align="center" ) {{item.name}}
            v-col(cols='2')
              v-row.center-row( justify="center" no-gutters align="center" ) {{item.type}}
            v-col(cols='6')
              v-row( justify="center" no-gutters align="center" )
                v-container(
                  v-show="!item.type"
                  fluid
                ) Тип признака не определён, значение не может быть задано
                v-checkbox(
                  v-show="item.type=='boolean'"
                  v-model="item.value[0]"
                  :label="`В наличии`"
                  hide-details
                )
                v-text-field.my-text-field-50(
                  v-show="item.type=='number'"
                  solo
                  light
                  placeholder="Цифровое значение"
                  v-model="item.value[0]"
                  hide-details
                )
                v-text-field.my-text-field-50(
                  v-show="item.type=='enum'"
                  solo
                  light
                  placeholder="Перечислимое строковое значение"
                  v-model="item.value[0]"
                  hide-details
                )
                v-text-field.my-text-field-50(
                  v-show="item.type=='range'"
                  solo
                  light
                  placeholder="Мин. значение"
                  v-model="item.value[0]"
                  hide-details
                )
                v-text-field.my-text-field-50(
                  v-show="item.type=='range'"
                  solo
                  light
                  placeholder="Макс. значение"
                  v-model="item.value[1]"
                  hide-details
                )
            v-col(cols='1')
              v-row.center-row( justify="center" no-gutters align="center" )
                v-icon(@click="removeSignToClass(selectedClass, index)") mdi-delete
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

  methods: {
    removeSignToClass(currentClass, signPosition) {
      this.$store.dispatch('removeSignToClass', { className: currentClass.name, signPosition });
    },
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
    // eslint-disable-next-line consistent-return
    selectedSign() {
      const item = this.selectedClass.signs.find((x) => x.name === this.selectedSign.name);
      if (item) {
        alert('Данный признак не может быть повторно назначен классу');
        return null;
      }

      if (this.selectedSign.type === 'boolean') {
        this.selectedSign.value = [false];
      }

      this.$store.dispatch('addSignToClass', {
        className: this.selectedClass.name,
        sign: JSON.stringify(this.selectedSign),
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
    width 65%
    max-width 65%
  }

  .my-divider {
    margin 10px 0 0 0
  }

  .my-text-field-50 {
    max-width 50%
    width 50%
    padding 0 5px
  }

  .center-row {
    height 100%
  }

  .my-sheet {
    padding 10px
  }
</style>
