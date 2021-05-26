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

        v-list-item( v-for="( item, index ) in selectedClass.signs" :key="item.name" )
          v-list-item-title {{item.name}}
          v-list-item-action
            v-icon(@click="removeSignToClass(selectedClass, index)") mdi-delete
            v-text-field(
              solo
              light
              readonly
              :value="item.type || 'None'"
            )
            v-container(
              v-show="!item.type"
              fluid
            ) Тип признака не определён, значение не может быть задано
            v-checkbox(
              v-show="item.type=='boolean'"
              v-model="item.value[0]"
              :label="`В наличии`"
            )
            v-text-field(
              v-show="item.type=='number'"
              solo
              light
              placeholder="Цифровое значение"
              v-model="item.value[0]"
            )
            v-text-field(
              v-show="item.type=='enum'"
              solo
              light
              placeholder="Перечислимое строковое значение"
              v-model="item.value[0]"
            )
            v-text-field(
              v-show="item.type=='range'"
              solo
              light
              placeholder="Мин. значение"
              v-model="item.value[0]"
            )
            v-text-field(
              v-show="item.type=='range'"
              solo
              light
              placeholder="Макс. значение"
              v-model="item.value[1]"
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
    width 30%
    max-width 30%
  }

  .my-divider {
    margin 15px 0
  }
</style>
