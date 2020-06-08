import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    workBookList: [],
  },
  mutations: {
    saveWorkBook(state, workBook) {
      state.workBookList.push(workBook);
    },
  },
  getters: {
    getWorkBookByIndex(state, index) {
      return state.workBookList[index];
    },
  },
  actions: {},
  modules: {},
});
