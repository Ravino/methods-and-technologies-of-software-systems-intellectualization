import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    elements: [],
  },

  mutations: {
    appendElement(state: any, el: any) {
      const formatEl: Array<any> = [];

      el.forEach((element: any) => {
        formatEl.push({ val: element, click: false });
      });

      state.elements.push(formatEl);
    },
  },

  actions: {
    appendElement({ commit }, el: any) {
      commit('appendElement', el);
    },
  },

  getters: {
    getElements: (state: any) => state.elements,
  },
  modules: {
  },
});
