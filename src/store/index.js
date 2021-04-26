import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    classes: [],
    signs: [],
  },
  mutations: {
    addClass(state, data) {
      state.classes.push(data);
    },

    removeClass(state, index) {
      state.classes.splice(index, 1);
    },

    addSign(state, data) {
      state.signs.push(data);
    },

    removeSign(state, index) {
      state.signs.splice(index, 1);
    },
  },
  actions: {
    addClass({ commit }, data) {
      commit('addClass', data);
    },

    removeClass({ commit }, index) {
      commit('removeClass', index);
    },

    addSign({ commit }, data) {
      commit('addSign', data);
    },

    removeSign({ commit }, index) {
      commit('removeSign', index);
    },
  },
  getters: {
    classes: (state) => state.classes,
    signs: (state) => state.signs,
  },
});
