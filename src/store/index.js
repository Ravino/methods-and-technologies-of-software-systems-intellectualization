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
    potentialClasses: [],
    correctClasses: [],
  },

  mutations: {
    // eslint-disable-next-line consistent-return
    markerBrokenClass(state, data) {
      if (state.classes[data.position].broken === data.flag) {
        return null;
      }

      state.classes[data.position].broken = data.flag;
      state.classes[data.position].comment = data.comment;
    },

    addClass(state, data) {
      const newClass = Object.assign(data, {});
      newClass.signs = [];
      newClass.broken = false;
      newClass.result = false;
      newClass.comment = null;
      state.classes.push(data);
    },

    removeClass(state, index) {
      state.classes.splice(index, 1);
    },

    addSign(state, data) {
      const sign = Object.assign(data, {});
      sign.visibleFields = false;
      sign.value = [];
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
      item.signs.push(JSON.parse(payload.sign));
    },

    removeSignToClass(state, data) {
      const item = state.classes.find((x) => x.name === data.className);
      item.signs.splice(data.signPosition, 1);
    },

    addSignsForClassifier(state, signs) {
      state.signsForClassifier = signs;
    },

    // eslint-disable-next-line consistent-return
    markerBrokenSignsForClassifier(state, data) {
      if (state.classes[data.positionClass].signs[data.positionSign].broken === data.flag) {
        return null;
      }

      state.classes[data.positionClass].signs[data.positionSign].broken = data.flag;
      state.classes[data.positionClass].signs[data.positionSign].comment = data.comment;
    },

    addCorrectClass(state, data) {
      state.correctClasses.push(data);
    },

    addPotentialClass(state, data) {
      state.potentialClasses.push(data);
    },

    // eslint-disable-next-line no-unused-vars
    recoveryCorrectClass(state, data) {
      state.correctClasses = [];
    },

    recoveryPotentialClass(state) {
      state.potentialClasses = [];
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

    removeSignToClass({ commit }, data) {
      commit('removeSignToClass', data);
    },

    addSignsForClassifier({ commit }, signs) {
      commit('addSignsForClassifier', signs);
    },

    addCorrectClass({ commit }, data) {
      commit('addCorrectClass', data);
    },

    addPotentialClass({ commit }, data) {
      commit('addPotentialClass', data);
    },

    recoveryCorrectClass({ commit }, data) {
      commit('recoveryCorrectClass', data);
    },

    recoveryPotentialClass({ commit }, data) {
      commit('recoveryPotentialClass', data);
    },
  },

  getters: {
    classes: (state) => state.classes,
    signs: (state) => state.signs,
    types: (state) => state.types,
    correctClasses: (state) => state.correctClasses,
    potentialClasses: (state) => state.potentialClasses,
    signsForClassifier: (state) => state.signsForClassifier,
  },
});
