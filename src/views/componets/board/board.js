import { indexToChar, symbolToIndex } from 'src/utils/transform';
import XLSX from 'xlsx';

//统一单元格位置：第几行第几列，现有row，再有col
export default {
  data() {
    return {
      store: {
        startX: undefined,
        startY: undefined,
        miniWidth: 30,
      },
      // 列头
      colsHeader: [
        {
          width: 100,
        },
      ],
      // 行头
      rowsHeader: [
        {
          height: null,
        },
      ],
      cellInput: {
        rowIndex: 0,
        colIndex: 0,
        value: '',
        style: {
          left: '',
          top: '',
          width: '',
          height: '',
          display: 'none',
        },
      },
      table: [],
    };
  },
  model:{
    prop:'data',
    event:'sheetChange',
  },
  props: {
    data: {
      require: true,
      type: Object,
    },
  },
  filters: {
    indexToChar(index) {
      if (index) {
        return indexToChar(index - 1);
      } else {
        return ' ';
      }
    },
  },
  watch: {
    data: {
      deep: true,
      handler(val) {
        this.clearTable()
        for (let [key, value] of Object.entries(val)) {
          let [col, row] = symbolToIndex(key);
          this.table[row].splice(col, 1, value);
        }
      },
    },
  },
  mounted() {
    this.tableInit();
  },
  computed: {
    tableRect() {
      return this.$refs.table.getBoundingClientRect();
    },
    tableData: {
      get() {
        let obj = {};
        for (let colIndex in this.table) {
          for (let rowIndex in this.table[colIndex]) {
            let key = indexToChar(colIndex) + (1 + parseInt(rowIndex));
            obj[key] = this.table[colIndex][rowIndex];
          }
        }
        return obj;
      },

    },
    tableWidth() {
      return this.colsHeader.reduce((total, item) => {
        return total + item.width;
      }, 0);
    },
    // 输入框宽度,高度自适应
    cellInputRect() {
      if (this.cellInput.value) {
        let strList = this.cellInput.value
          .split('\n')
          .map((item) => item.length);
        let width = Math.max(
          Math.max(...strList) * 8 + 20,
          parseFloat(this.cellInput.style.width),
        );
        let height = Math.max(
          strList.length * 17 + 10,
          parseFloat(this.cellInput.style.height.slice(0, -2)),
        );
        return {
          width: `${width}px`,
          height: `${height}px`,
        };
      }
      return {};
    },
  },
  methods: {
    clearTable: function() {
      for (let item in this.table) {
        this.clearCol(item);
      }
    },
    clearRow(rowIndex) {
      for (let index in this.table[rowIndex]) {
        this.table[rowIndex].splice(index, 1, '');
      }
    },
    clearCol(colIndex) {
      for (let item of this.table) {
        item.splice(colIndex - 1, 1, '');
      }
    },
    exportFile() {
      let sheet = XLSX.utils.aoa_to_sheet(this.table);
      let workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, sheet, 'test');
      XLSX.writeFile(workbook, 'test.xlsx');
    },
    tableInit() {
      for (let row = 0; row < 30; row++) {
        this.table.splice(row, 0, []);
        this.rowsHeader.splice(row, 1, { height: null });
        for (let col = 0; col < 30; col++) {
          this.table[row].splice(col, 0, '');
          if (row === 0) {
            this.colsHeader.splice(col + 1, 1, { width: 100 });
          }
        }
      }
    },
    handleCellClick(evt, rowIndex, colIndex) {
      let cell = this.table[colIndex][rowIndex];
      let cellRect = evt.currentTarget.getBoundingClientRect();
      this.cellInput = {
        rowIndex: rowIndex,
        colIndex: colIndex,
        value: cell,
        style: {
          left: `${evt.currentTarget.offsetLeft}px`,
          top: `${evt.currentTarget.offsetTop}px`,
          width: `${cellRect.width}px`,
          height: `${cellRect.height}px`,
          display: '',
        },
      };
      this.$nextTick(() => {
        this.$refs.cellInput.focus();
      });
    },
    handleCellInputBlur() {
      this.table[this.cellInput.colIndex].splice(this.cellInput.rowIndex,1,this.cellInput.value)
      this.cellInput = this.$options.data.call(this).cellInput;
    },
    currentPosition(rowIndex, colIndex) {
      return `${String.fromCharCode(65 + colIndex)}${rowIndex + 1}`;
    },

    // 列拉伸
    colResizeStart(evt, index) {
      evt.preventDefault();
      let vue = this,
        vertAxis = vue.$refs.vertAxis.style;
      vertAxis.display = '';
      vertAxis.left = `${evt.pageX - this.tableRect.left}px`;
      document.body.style.cursor = 'col-resize';
      let HandleOnMouseMove = function HandleOnMouseMove(evt) {
        vertAxis.left = `${evt.pageX - vue.tableRect.left}px`;
      };
      let HandleOnMouseUp = function(evt) {
        vertAxis.display = 'none';
        document.body.style.cursor = '';
        vue.colsHeader[index].width =
          evt.pageX - vue.$refs.cols[index].getBoundingClientRect().left;
        window.removeEventListener('mousemove', HandleOnMouseMove);
        window.removeEventListener('mouseup', HandleOnMouseUp);
      };
      window.addEventListener('mouseup', HandleOnMouseUp);
      // window.addEventListener('mousemove', debounce(HandleOnMouseMove, 1000));
      window.addEventListener('mousemove', HandleOnMouseMove);
    },
    // 行拉伸
    rowResizeStart(evt, index) {
      evt.preventDefault();
      let vue = this;
      const tableTop = this.tableRect.top;
      let horiAxis = vue.$refs.horiAxis.style;
      vue.store.startY = evt.pageY;
      horiAxis.display = '';
      horiAxis.top = `${evt.pageY - tableTop}px`;
      let HandleOnMouseMove = function(evt) {
        evt.stopPropagation();
        horiAxis.top = `${evt.pageY - tableTop}px`;
        document.body.style.cursor = 'ns-resize';
      };
      let HandleOnMouseUp = function(evt) {
        horiAxis.display = 'none';
        document.body.style.cursor = '';
        let height =
          evt.pageY - vue.$refs.rows[index].getBoundingClientRect().top;
        vue.rowsHeader[index].height = `${height}px`;
        window.removeEventListener('mousemove', HandleOnMouseMove);
        window.removeEventListener('mouseup', HandleOnMouseUp);
      };
      window.addEventListener('mouseup', HandleOnMouseUp);
      window.addEventListener('mousemove', HandleOnMouseMove);
    },
  },
};
