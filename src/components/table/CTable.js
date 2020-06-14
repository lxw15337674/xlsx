//统一单元格位置：第几行第几列，现有row，再有col

import { indexToChar } from '../../utils/transform';
import leftTable from './left-table';
export default {
  components: { leftTable },
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
      rowsHeader: [],
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
      data: []
    };
  },
  model: {
    prop: 'table',
    event: 'updateTable',
  },
  props: {
    table: {
      require: true,
      type: Array,
    },
  },
  watch: {
    table: {
      immediate: true,
      deep: true,
      handler(val) {
        this.data = val
        this.headerInit();
      },
    },
    data: {
      deep: true,
      handler(val) {
        this.$emit('updateTable', val)
      }
    }
  },
  filters: {
    indexToChar(index) {
      return indexToChar(index);
    },
  },
  computed: {
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
    tableRect() {
      if (this.$refs.table) {
        return this.$refs.table.getBoundingClientRect();
      } else {
        return {};
      }
    },
    tableWidth() {
      return this.colsHeader.reduce((total, item) => {
        return total + item.width;
      }, 0);
    },
    bodyWidth() {
      return this.tableWidth - 100
    },
    activeCellInput: {
      get() {
        return this.data[this.cellInput.rowIndex][this.cellInput.colIndex];
      },
      set(val) {
        this.data[this.cellInput.rowIndex].splice(
          [this.cellInput.colIndex],
          1,
          val,
        );
      },
    },
  },
  methods: {
    headerInit() {
      //行
      for (let rowIndex = 0; rowIndex < this.data.length; rowIndex++) {
        if (!this.rowsHeader[rowIndex]) {
          this.rowsHeader.splice(rowIndex, 1, { height: `40px` });
        }
      }
      //列
      for (let colIndex = 0; colIndex < this.data[0].length; colIndex++) {
        if (!this.colsHeader[colIndex]) {
          this.colsHeader.splice(colIndex, 1, { width: 100 });
        }
      }
    },
    //行拉伸
    rowResizeStart(evt, index) {
      evt.preventDefault();
      let vue = this,
        horiAxis = vue.$refs.horiAxis.style,
        tableTop = this.tableRect.top;
      vue.store.startY = evt.pageY;
      horiAxis.display = '';
      horiAxis.top = `${evt.pageY - tableTop}px`;
      let HandleOnMouseMove = function (evt) {
        evt.stopPropagation();
        horiAxis.top = `${evt.pageY - tableTop}px`;
        document.body.style.cursor = 'ns-resize';
      };
      let HandleOnMouseUp = function (evt) {
        horiAxis.display = 'none';
        document.body.style.cursor = '';
        let height =
          evt.pageY - vue.store.startY + vue.$refs.rows[index].getBoundingClientRect().height;
        vue.rowsHeader[index].height = `${height}px`;
        window.removeEventListener('mousemove', HandleOnMouseMove);
        window.removeEventListener('mouseup', HandleOnMouseUp);
      };
      window.addEventListener('mouseup', HandleOnMouseUp);
      window.addEventListener('mousemove', HandleOnMouseMove);
    },
    // 列拉伸
    colResizeStart(evt, index) {
      evt.preventDefault();
      let vue = this,
        vertAxis = vue.$refs.vertAxis.style;
      vue.store.startX = evt.pageX
      vertAxis.display = '';
      vertAxis.left = `${evt.pageX - vue.tableRect.left}px`;
      document.body.style.cursor = 'col-resize';
      let HandleOnMouseMove = function HandleOnMouseMove(evt) {
        vertAxis.left = `${evt.pageX - vue.tableRect.left}px`;
      };
      let HandleOnMouseUp = function (evt) {
        vertAxis.display = 'none';
        document.body.style.cursor = '';
        vue.colsHeader[index].width =
          evt.pageX - vue.store.startX + vue.$refs.cols[index].getBoundingClientRect().width;
        window.removeEventListener('mousemove', HandleOnMouseMove);
        window.removeEventListener('mouseup', HandleOnMouseUp);
      };
      window.addEventListener('mouseup', HandleOnMouseUp);
      // window.addEventListener('mousemove', debounce(HandleOnMouseMove, 1000));
      window.addEventListener('mousemove', HandleOnMouseMove);
    },

    currentPosition(rowIndex, colIndex) {
      return `${String.fromCharCode(65 + colIndex)}${rowIndex + 1}`;
    },
    handleCellClick(evt, rowIndex, colIndex) {
      let cell = this.data[rowIndex][colIndex];
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
  },
};
