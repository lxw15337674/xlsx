
export default {
  namespaced: true,
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
};
