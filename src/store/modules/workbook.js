import webWorker from 'src/utils/webWorker';
import row from 'element-ui/packages/row/src/row';
const DefaultSheetName = 'sheet1';

export default {
    namespaced: true,
    state: {
        sheets: {
            [DefaultSheetName]: [[]],
        },
        sheetNames: [DefaultSheetName],
        activeSheetName: DefaultSheetName,
    },
    mutations: {
        saveWorkbook(state, workbook) {
            state.workbookList.push(workbook);
        },
        updateActiveSheetName(state, sheetName) {
            state.activeSheetName = sheetName;
        },
        initSheet(state, { array, sheetName = state.activeSheetName }) {
            state.sheets[sheetName] = array;
        },
        updateCell(state, { rowIndex, colIndex, value }) {
            state.sheets[state.activeSheetName][rowIndex].splice([colIndex], 1, value);
        },
    },
    getters: {
        activeTable(state) {
            return state.sheets[state.activeSheetName];
        },
    },
    actions: {
        async sheetInit({ commit }, payload) {
            let worker = new webWorker();
            let data = await worker.postMessage('sheetInit', [
                payload.rowsLength,
                payload.colsLength,
            ]);
            commit('initSheet', { array: data });
        },
    },
    modules: {},
};
