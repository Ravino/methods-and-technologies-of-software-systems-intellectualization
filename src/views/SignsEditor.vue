<template lang="pug">
  .signs-editor
    v-row( justify="center" no-gutters align="center" )
      v-text-field.search-field(
        solo
        append-icon="mdi-magnify"
        dark
        hide-details
        v-model="searchMask"
        placeholder="Поиск признаков"
      )

    v-row( justify="center" no-gutters align="center" )
      v-btn.btn-add(
        text
        @click="expandAddField = !expandAddField"
      ) {{expandAddField ? 'Скрыть': 'Добавить'}}
        v-icon( right ) {{expandAddField ? 'mdi-close': 'mdi-plus'}}

    v-row( justify="center" no-gutters align="center" )
      v-expand-transition
        v-text-field.add-field(
          v-show="expandAddField"
          solo
          :rules="[() => (signName==null || signName.length > 0) || 'This field is required']"
          v-model="signName"
          ref="addField"
          required
        )
          template(v-slot:append)
            v-row
              v-btn( text @click="addSign()" ) Добавить

    v-row.signs-card-wrp(
      justify="center"
      no-gutters
      align="center"
      :style="!expandAddField ? {marginTop: '12px'} : ''"
    )
      v-card.signs-card( dark v-for="( item, index ) in sortedSigns" :key="item.name" )
        v-list-item
          v-list-item-content
            v-list-item-title {{item.name}}
          v-list-item-action
            v-icon( @click="removeSign(index)" ) mdi-delete
          v-list-item-action
            v-icon(
              @click="item.visibleFields = !item.visibleFields"
            ) {{item.visibleFields ? 'mdi-check' : 'mdi-lead-pencil' }}

        v-expand-transition
          v-row(v-show="item.visibleFields" no-gutters)
            v-overflow-btn(
              :items="types"
              hide-details
              dense
              v-model="item.type"
            )
</template>

<script>
export default {
  name: 'signs-editor',

  data() {
    return {
      expandAddField: false,
      signName: null,
      sortedSigns: [],
      searchMask: null,
      menu: false,
    };
  },

  methods: {
    addSign() {
      if (!this.signName) {
        this.signName = '';
        return null;
      }

      const item = this.signs.find((x) => x.name === this.signName);
      if (item) {
        alert('Данное имя признака уже занято');
        this.signName = null;
        return null;
      }

      this.$store.dispatch('addSign', { name: this.signName });
      this.signName = null;

      return null;
    },

    removeSign(index) {
      this.$store.dispatch('removeSign', index);
    },
  },

  computed: {
    signs() {
      return this.$store.getters.signs;
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

    signs() {
      if (!this.searchMask) {
        this.sortedSigns = this.signs;
      }
    },

    searchMask() {
      this.sortedSigns = [];

      this.signs.forEach((element) => {
        if (element.name.toLowerCase().includes(this.searchMask.trim().toLowerCase())) {
          this.sortedSigns.push(element);
        }
      });
    },
  },

  created() {
    this.sortedSigns = this.signs;
    console.log(this.sortedSigns);
  },
};
</script>

<style lang="stylus" scoped>
  .signs-editor {
    margin-top 30px
  }

  .search-field {
    width 30%
    max-width 30%
  }

  .btn-add {
    color #FFF3E0 !important
    width 30%
    margin-top 12px
  }

  .add-field {
    width 30% !important
    max-width 30% !important
  }

  .signs-card {
    width 20%
    margin 5px
  }

  .value-field {
    min-width 50%
    width 50%
    padding 5px
  }
</style>
