import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    workbookList: [],
  },
  mutations: {
    saveworkbook(state, workbook) {
      state.workbookList.push(workbook);
    },
  },
  getters: {
    getworkbookByIndex(state, index) {
      return state.workbookList[index];
    },
  },
  actions: {},
  modules: {},
});
