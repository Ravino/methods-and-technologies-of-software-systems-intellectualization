<template lang="pug">
  .wrp
    v-row( no-gutters )
      v-col( cols="6" )
        v-list( subheader dark )
          v-subheader Подходящие классы
          v-list-item( v-for="item in correctClasses" :key="item.name")
            v-list-item-title {{item.name}}
      v-col( cols="6" )
        v-list( subheader dark )
          v-subheader Возможные классы
          v-list-item( v-for="item in potentialClasses" :key="item.name")
            v-list-item-title {{item.name}}
</template>

<script>
export default {
  name: 'ClassifierResult',

  computed: {
    correctClasses() {
      return this.$store.getters.correctClasses;
    },

    potentialClasses() {
      return this.$store.getters.potentialClasses;
    },
  },
};
</script>
