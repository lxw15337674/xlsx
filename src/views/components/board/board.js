import XLSX from 'xlsx';
import { sheetFilter } from 'src/utils/sheetFilter';
import menuBar from 'src/components/menuBar/menuBar';
import CTable from 'src/components/table/CTable.vue';
import { objToArray } from 'src/utils/transform';
//统一单元格位置：第几行第几列，现有row，再有col
export default {
  components: { menuBar, CTable },
  data() {
    return {


      table: [],
    };
  },
  model: {
    prop: 'sheetData',
    event: 'updateSheet',
  },
  props: {
    sheetData: {
      require: true,
      type: Object,
    },
  },

  watch: {
    sheetData: {
      deep: true,
      immediate: true,
      handler(val) {
        this.table = objToArray(val);
      },
    },
    table: {
      deep: true,
      immediate: true,
      handler(val) {
        this.$emit('updateSheet', val);
      },
    },
  },
  computed: {

    // ref(){
    //   return this.sheetData['!ref']
    // },
    // tableData: {
    //   get() {
    //     let obj = {};
    //     for (let colIndex in this.table) {
    //       for (let rowIndex in this.table[colIndex]) {
    //         let key = indexToChar(colIndex) + (1 + parseInt(rowIndex));
    //         obj[key] = this.table[colIndex][rowIndex];
    //       }
    //     }
    //     return obj;
    //   },
    //
    // },


  },
  methods: {
    // clearTable: function() {
    //   for (let item in this.table) {
    //     this.clearCol(item);
    //   }
    // },
    // clearRow(rowIndex) {
    //   for (let index in this.table[rowIndex]) {
    //     this.table[rowIndex].splice(index, 1, '');
    //   }
    // },
    // clearCol(colIndex) {
    //   for (let item of this.table) {
    //     item.splice(colIndex - 1, 1, '');
    //   }
    // },
    exportFile() {
      let sheet = XLSX.utils.aoa_to_sheet(this.table);
      let workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, sheet, 'test');
      XLSX.writeFile(workbook, 'test.xlsx');
    },
    // handleCellInputBlur() {
    //   this.table[this.cellInput.colIndex].splice(
    //     this.cellInput.rowIndex,
    //     1,
    //     this.cellInput.value,
    //   );
    //   // this.cellInput = this.$options.data.call(this).cellInput;
    // },
  },
};
