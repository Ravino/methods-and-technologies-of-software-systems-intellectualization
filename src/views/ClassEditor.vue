<template lang="pug">
  .class-editor
    v-row( justify="center" no-gutters align="center" )
      v-text-field.search-field(
        solo
        append-icon="mdi-magnify"
        dark
        hide-details
        v-model="searchMask"
        placeholder="Поиск классов"
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
          :rules="[() => (className==null || className.length > 0) || 'This field is required']"
          v-model="className"
          ref="addField"
          required
        )
          template(v-slot:append)
            v-row
              v-btn( text @click="addClass()" ) Добавить

    v-row.class-card-wrp(
      justify="center"
      no-gutters
      align="center"
      :style="!expandAddField ? {marginTop: '12px'} : ''"
    )
      v-card.class-card( dark v-for="( item, index ) in sortedClasses" :key="item.name")
        v-list-item
          v-list-item-content
            v-list-item-title {{item.name}}
          v-list-item-action
            v-icon(@click="removeClass(index)") mdi-delete
</template>

<script>
export default {
  name: 'class-editor',

  data() {
    return {
      expandAddField: false,
      className: null,
      sortedClasses: [],
      searchMask: null,
    };
  },

  methods: {
    addClass() {
      if (!this.className) {
        this.className = '';
        return null;
      }

      const item = this.classes.find(x => x.name === this.className);
      if(item) {
        alert("Данное имя класса уже занято");
        this.className = null;
        return null;
      }


      this.$store.dispatch('addClass', { name: this.className });
      this.className = null;

      return null;
    },

    removeClass(index) {
      this.$store.dispatch('removeClass', index);
    },
  },

  computed: {
    classes() {
      return this.$store.getters.classes;
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
  .class-editor {
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

  .class-card {
    width 20%
    margin 5px
  }
</style>
