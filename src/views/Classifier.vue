<template lang="pug">
v-container.wrp
  Input(typeView="classifier")
  Table(typeView="classifier")
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Input from '../components/Input.vue';
import Table from '../components/Table.vue';


@Component({
  name: "Classifier",
  components: {
    Input,
    Table
  }
})


export default class Classifier extends Vue {}
</script>

<style lang="stylus" scoped>
  .wrp {
    margin 30px 30px 0
  }
</style>
