import XLSX from 'xlsx';
import { objToArray } from '@/utils/transform';
import History from './history/history.vue';
import { mapState } from 'vuex';

export default {
    name: 'cHeader',
    props: {},
    components: { History },
    data() {
        return {};
    },
    methods: {
        exportSheet() {
            let sheet = XLSX.utils.aoa_to_sheet(this.activeSheet);
            let workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, sheet, 'test');
            XLSX.writeFile(workbook, 'test.xlsx');
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
    computed: {
        workbookName: {
            get() {
                return this.$store.state.workbook.activeSheetName;
            },
            set(value) {
                this.$store.commit('workbook/updateActiveSheetName', value);
            },
        },
    },
    mounted() {},
};
