import CTable from 'src/components/CTable/CTable.vue';
import sheetBar from './components/sheetBar/sheetBar.vue';
import XLSX from 'xlsx';
import menuBar from './components/menuBar/menuBar.vue';
import History from './components/history/history.vue';
import { objToArray } from 'src/utils/transform';
export default {
    name: 'board',
    components: { History, sheetBar, menuBar, CTable },
    data: function () {
        const DefaultSheetName = 'sheet1'
        return {
            workbook: XLSX.utils.book_new(),
            activeSheetName: DefaultSheetName,
            workbookName: '新建表格',
            activeSheet: [[]]
        };
    },
    created() {
        this.workbookInit()
    },
    watch: {
        activeSheet: {
            deep: true,
            handler(val) {
                this.workbook.Sheets[this.activeSheetName] = XLSX.utils.aoa_to_sheet(val)
            }
        }
    },
    methods: {
        exportSheet() {
            let sheet = XLSX.utils.aoa_to_sheet(this.activeSheet);
            let workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, sheet, 'test');
            XLSX.writeFile(workbook, 'test.xlsx');
        },

        workbookInit(rowsLength = 30, colsLength = 30) {
            let table = []
            for (let row = 0; row < rowsLength; row++) {
                table[row] = []
                for (let col = 0; col < colsLength; col++) {
                    table[row][col] = ''
                }
            }
            let sheet = XLSX.utils.aoa_to_sheet(table);
            XLSX.utils.book_append_sheet(this.workbook, sheet, 'sheet1')
            this.activeSheet = objToArray(this.workbook.Sheets[this.activeSheetName])
            // this.$set(this.workbook.Sheets,'sheet1',obj)
        },
        switchWorkbook(workbook) { },
        sheetSelect(sheet) {
            this.activeSheetName = sheet;
        },
        onPickFile() {
            this.$refs.fileInput.click();
        },
        exportFile() {
            if (this.workbook) {
                XLSX.writeFile(this.workbook, `${this.workbookName}.xlsx`)
            }
        },

        importFile() {
            if (!this.$refs.fileInput.files.length) return
            let file = this.$refs.fileInput.files[0],
                fileReader = new FileReader()
            fileReader.onload = e => {
                try {
                    let data = e.target.result;
                    let workbook = XLSX.read(data, { type: 'binary' });
                    for (let [key, value] of Object.entries(workbook)) {
                        this.$set(this.workbook, key, value);
                    }
                    this.activeSheetName = workbook.SheetNames[0];
                    this.workbookName = file.name.split('.')[0]
                    this.activeSheet = objToArray(this.workbook.Sheets[this.activeSheetName])
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