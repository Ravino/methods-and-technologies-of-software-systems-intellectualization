import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    classes: [],
    signsForClassifier: [],
    signs: [],
    types: [
      'range',
      'enum',
      'number',
      'boolean',
    ],
  },

  mutations: {
    markerBrokenClass(state, data) {
      if(state.classes[data.position].broken == data.flag) {
        return null;
      }

      state.classes[data.position].broken = data.flag;
      state.classes[data.position].comment = data.comment;
    },

    addClass(state, data) {
      const newClass = Object.assign(data, {});
      newClass.signs = [];
      newClass.broken = false;
      newClass.comment = null;
      state.classes.push(data);
    },

    removeClass(state, index) {
      state.classes.splice(index, 1);
    },

    addSign(state, data) {
      const sign = Object.assign(data, {});
      sign.visibleFields = false;
      sign.values = [0, 0];
      sign.type = null;
      sign.broken = false;
      sign.comment = null;
      state.signs.push(sign);
    },

    removeSign(state, index) {
      state.signs.splice(index, 1);
    },

    addSignToClass(state, payload) {
      const item = state.classes.find((x) => x.name === payload.className);
      item.signs.push(payload.sign);
    },

    addSignsForClassifier(state, signs) {
      state.signsForClassifier = signs;
    },

    markerBrokenSignsForClassifier(state, data) {
      if(state.classes[data.positionClass].signs[data.positionSign].broken == data.flag) {
        return null;
      }


      state.classes[data.positionClass].signs[data.positionSign].broken = data.flag;
      state.classes[data.positionClass].signs[data.positionSign].comment = data.comment;
    },
  },

  actions: {
    markerBrokenClass({ commit }, data) {
      commit('markerBrokenClass', data);
    },

    markerBrokenSignsForClassifier({ commit }, data) {
      commit('markerBrokenSignsForClassifier', data);
    },

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

    addSignsForClassifier({ commit }, signs) {
      commit('addSignsForClassifier', signs);
    },
  },
  getters: {
    classes: (state) => state.classes,
    signs: (state) => state.signs,
    types: (state) => state.types,
  },
});
