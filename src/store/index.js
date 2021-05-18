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
      const newClass = Object.assign(data, {});
      newClass.signs = [];
      state.classes.push(data);
    },

    removeClass(state, index) {
      state.classes.splice(index, 1);
    },

    addSign(state, data) {
      const sign = Object.assign(data, {});
      sign.visibleFields = false;
      state.signs.push(sign);
    },

    removeSign(state, index) {
      state.signs.splice(index, 1);
    },

    addSignToClass(state, payload) {
      const item = state.classes.find((x) => x.name === payload.className);
      item.signs.push(payload.sign);
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

    addSignToClass({ commit }, payload) {
      commit('addSignToClass', payload);
    },
  },
  getters: {
    classes: (state) => state.classes,
    signs: (state) => state.signs,
  },
});
