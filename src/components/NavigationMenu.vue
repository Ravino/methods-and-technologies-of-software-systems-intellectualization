<template lang="pug">
  v-row
    v-menu( offset-y dark )
      template( v-slot:activator="{ on, attrs }" )
        v-btn( text v-bind="attrs" v-on="on" ) Редактор знаний
      v-list
        v-list-item( @click="route('classEditor')" )
          v-list-item-title Классы средств передвижения
        v-list-item( @click="route('signsEditor')" )
          v-list-item-title Признаки
        v-list-item( @click="route('classWithSigns')" )
          v-list-item-title Признаковое описание классов
        v-list-item( @click="route('checkKnowledgeBase')" )
          v-list-item-title Проверка базы знаний
    v-btn( text ) Определить класс
</template>

<script>
export default {
  name: 'navigation-menu',

  methods: {
    route(name) {
      this.$router.push({ name });
    },
  },
};
</script>
