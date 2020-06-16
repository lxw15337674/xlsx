//统一单元格位置：第几行第几列，现有row，再有col

import { indexToChar } from 'src/utils/transform';
import leftTable from './components/left-table';
import CInput from 'src/components/input/input.vue';
import contextMenu from 'src/components/context-menu/context-menu';
import contextItem from 'src/components/context-menu/context-item';
import contextMenuMixins from './mixins/context-menu.js';
import resize from './mixins/resize';
import canvas from './mixins/canvas';
import select from './mixins/select';
export default {
  components: { leftTable, CInput, contextMenu, contextItem },
  mixins: [contextMenuMixins, resize, canvas, select],
  data() {
    return {
      cellInput: {
        rowIndex: 0,
        colIndex: 0,
        value: '',
      },
      data: [],
      // 列头
      colsHeader: [
        {
          width: 100,
        },
      ],
      // 行头
      rowsHeader: [],
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
        this.data = val;
        this.headerInit();
      },
    },
    data: {
      deep: true,
      handler(val) {
        this.$emit('updateTable', val);
      },
    },
  },
  filters: {
    indexToChar(index) {
      return indexToChar(index);
    },
  },
  computed: {
    cellInputStyle() {
      let currentCell =
        this.cellInput.colIndex +
        this.cellInput.rowIndex * this.colsHeader.length;
      if (!this.$refs.cell) {
        return {
          left: '100px',
          top: '40px',
          minHeight: '40px',
          minWidth: '100px',
        };
      }
      let cell = this.$refs.cell[currentCell];
      return {
        left: `${cell.offsetLeft}px`,
        top: `${cell.offsetTop}px`,
        minWidth: `${cell.offsetWidth}px`,
        minHeight: `${cell.offsetHeight}px`,
      };
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
          this.rowsHeader.splice(rowIndex, 1, { height: '40px' });
        }
      }
      //列
      for (let colIndex = 0; colIndex < this.data[0].length; colIndex++) {
        if (!this.colsHeader[colIndex]) {
          this.colsHeader.splice(colIndex, 1, { width: 100 });
        }
      }
    },
    currentPosition(rowIndex, colIndex) {
      return `${String.fromCharCode(65 + colIndex)}${rowIndex + 1}`;
    },
    handleCellClick(evt, rowIndex, colIndex) {
      this.cellInput.rowIndex = rowIndex;
      this.cellInput.colIndex = colIndex;
      this.cellInput.value = this.data[rowIndex][colIndex];
    },
  },
};
