let sheetNum = 1,
    DefaultRowsLength = 100,
    DefaultColsLength = 100;
function createTable() {
    let table = [];
    for (let row = 0; row < DefaultRowsLength; row++) {
        table[row] = [];
        for (let col = 0; col < DefaultColsLength; col++) {
            table[row][col] = `行：${row}，列：${col}`;
        }
    }
    return table;
}
export default {
    namespaced: true,
    state: {
        sheets: {},
        sheetNames: [],
        activeSheetName: '',
    },
    mutations: {
        initSheet(state) {
            let sheetName = `sheet${sheetNum}`;
            state.sheets[sheetName] = createTable();
            state.sheetNames.push(sheetName);
            state.activeSheetName = sheetName;
        },
        switchSheet(state, sheetName) {
            state.activeSheetName = sheetName;
        },
        addSheet(state) {
            let sheetName;
            function checkSheetName() {
                sheetName = `sheet${sheetNum}`;
                if (state.sheets[sheetName]) {
                    sheetNum++;
                    checkSheetName();
                }
            }
            checkSheetName();
            state.sheets[sheetName] = createTable();
            state.sheetNames.push(sheetName);
            state.activeSheetName = sheetName;
        },
        saveWorkbook(state, workbook) {
            state.workbookList.push(workbook);
        },
        updateActiveSheetName(state, sheetName) {
            state.activeSheetName = sheetName;
        },
        // updateCell
        // updateCell(state, { rowIndex, colIndex, value }) {
        //     state.sheets[state.activeSheetName][rowIndex].splice(colIndex, 1, value);
        // },
        // addRow(state, { index, value = '' }) {
        //     let sheet = state.sheets[state.activeSheetName];
        //     let row = Array(sheet[0].length).fill(value);
        //     sheet.splice(index, 0, row);
        // },
        // addCol(state, { index = 0, value = '' }) {
        //     let sheet = state.sheets[state.activeSheetName];
        //     for (let row of sheet) {
        //         row.splice(index, 0, value);
        //     }
        // },
        // clearArea(state, { colStartIndex, colEndIndex, rowStartIndex, rowEndIndex }) {
        //     for (let rowIndex = rowStartIndex; rowIndex <= rowEndIndex; rowIndex++) {
        //         for (let colIndex = colStartIndex; colIndex <= colEndIndex; colIndex++) {
        //             state.sheets[state.activeSheetName][rowIndex].splice(colIndex, 1, '');
        //         }
        //     }
        // },
        // removeRow(state, index) {
        //     state.sheets[state.activeSheetName].splice(index, 1);
        // },
        // removeCol(state, index) {
        //     let sheet = state.sheets[state.activeSheetName];
        //     for (let row of sheet) {
        //         row.splice(index, 1);
        //     }
        // },
    },
    getters: {
        activeTable(state) {
            return state.sheets[state.activeSheetName];
        },
    },
    actions: {},
};
