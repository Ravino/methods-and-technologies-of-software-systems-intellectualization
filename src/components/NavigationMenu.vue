<template lang="pug">
  v-row
    v-menu( offset-y open-on-hover )
      template( v-slot:activator="{ on, attrs }" )
        v-btn( text v-bind="attrs" v-on="on" ) Редактор знаний
      v-list
        v-list-item
          v-list-item-title Классы средств передвижения
        v-list-item
          v-list-item-title Признаки
        v-list-item
          v-list-item-title Возможные значения признаков
        v-list-item
          v-list-item-title Признаковое описание классов
        v-list-item
          v-list-item-title Значения признаков для классов
        v-list-item
          v-list-item-title Проверка базы знаний
    v-btn( text ) Определить класс
</template>

<script>
export default {
  name: 'navigation-menu',
};
</script>
