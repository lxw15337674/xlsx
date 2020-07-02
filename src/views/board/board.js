import CTable from './components/table/table.vue';
import sheetBar from './components/sheetBar/sheetBar.vue';
import XLSX from 'xlsx';
import menuBar from './components/menuBar/menuBar.vue';
import History from './components/history/history.vue';
import { objToArray } from 'src/utils/transform.ts';
export default {
    name: 'board',
    components: { History, sheetBar, menuBar, CTable },
    data: function() {
        const DefaultSheetName = 'sheet1';
        return {
            workbook: {
                sheets: {
                    [DefaultSheetName]: this.sheetInit(),
                },
                sheetNames: [DefaultSheetName],
            },
            activeSheetName: DefaultSheetName,
            workbookName: '新建表格',
        };
    },
    methods: {
        exportSheet() {
            let sheet = XLSX.utils.aoa_to_sheet(this.activeSheet);
            let workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, sheet, 'test');
            XLSX.writeFile(workbook, 'test.xlsx');
        },

        sheetInit(rowsLength = 500, colsLength = 100) {
            let table = [];
            for (let row = 0; row < rowsLength; row++) {
                table[row] = [];
                for (let col = 0; col < colsLength; col++) {
                    table[row][col] = `行：${row}，列：${col}`;
                }
            }
            return table;
        },
        switchWorkbook(workbook) {},
        sheetSelect(sheet) {
            this.activeSheetName = sheet;
        },
        onPickFile() {
            this.$refs.fileInput.click();
        },
        exportFile() {
            if (this.workbook) {
                XLSX.writeFile(this.workbook, `${this.workbookName}.xlsx`);
            }
        },

        importFile() {
            if (!this.$refs.fileInput.files.length) return;
            let file = this.$refs.fileInput.files[0],
                fileReader = new FileReader();
            fileReader.onload = (e) => {
                try {
                    let data = e.target.result;
                    let workbook = XLSX.read(data, { type: 'binary' });
                    let sheets = {};
                    for (let [key, value] of Object.entries(workbook.Sheets)) {
                        sheets[key] = objToArray(value);
                    }
                    this.workbook.sheets = sheets;
                    this.workbook.sheetNames = workbook.SheetNames;
                    this.activeSheetName = workbook.SheetNames[0];
                    this.workbookName = file.name.split('.')[0];
                    //数据处理
                    this.$store.commit('saveWorkbook', {
                        ...workbook,
                        name: file.name,
                        lastModifiedDate: file.lastModifiedDate,
                    });
                } catch (e) {
                    console.error(e);
                }
            };
            // 以二进制方式打开文件
            fileReader.readAsBinaryString(file);
        },
    },
};
