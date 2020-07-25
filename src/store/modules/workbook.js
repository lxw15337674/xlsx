import webWorker from 'src/utils/webWorker';
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
        updateCell({ state }, { rowIndex, colIndex, value }) {
            state.sheets[state.activeSheetName][rowIndex].splice(colIndex, 1, value);
        },
        addRow(state, { index, value = '' }) {
            let sheet = state.sheets[state.activeSheetName];
            let row = Array(sheet[0].length).fill(value);
            sheet.splice(index, 0, row);
        },
        addCol(state, { index = 0, value = '' }) {
            let sheet = state.sheets[state.activeSheetName];
            for (let row of sheet) {
                row.splice(index, 0, value);
            }
        },
        removeRow(state, index) {
            state.sheets[state.activeSheetName].splice(index, 1);
        },
        removeCol(state, index) {
            let sheet = state.sheets[state.activeSheetName];
            for (let row of sheet) {
                row.splice(index, 1);
            }
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
