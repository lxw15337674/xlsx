import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    workbookList: [],
  },
  mutations: {
    saveWorkbook(state, workbook) {
      state.workbookList.push(workbook);
    },
  },
  getters: {
    getWorkbookByIndex(state, index) {
      return state.workbookList[index];
    },
  },
  actions: {},
  modules: {},
});
