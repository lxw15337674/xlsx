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
    };
  },

  props: {
    data: {
      default: function() {
        let array = [];
        for (let row = 0; row < 200; row++) {
          array[row] = [];
          for (let col = 0; col < 30; col++) {
            array[row].push({
              value: '',
              class: [],
            });
          }
        }
        return array;
      },
    },
  },
  filters: {
    charCode: function(index) {
      if (!index) {
        return ' ';
      }
      return String.fromCharCode(65 + index - 1);
    },
  },
  mounted() {
    this.tableInit();
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
          this.cellInput.style.width.slice(0, -2),
        );
        let height = Math.max(
          this.cellInput.style.height.slice(0, -2),
          strList.length * 17 + 10,
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
    handleCellClick(evt, rowIndex, colIndex, cell) {
      let cellRect = evt.currentTarget.getBoundingClientRect();
      this.cellInput.style.left = `${cellRect.left}px`;
      this.cellInput.style.top = `${cellRect.top}px`;
      this.cellInput.style.width = `${cellRect.width}px`;
      this.cellInput.style.height = `${cellRect.height}px`;
      this.cellInput.style.display = '';
      this.cellInput.value = cell.value;
      this.cellInput.rowIndex = rowIndex;
      this.cellInput.colIndex = colIndex;
      this.$nextTick(() => {
        this.$refs.cellInput.focus();
      });
    },
    handleCellInputBlur() {
      this.data[this.cellInput.rowIndex][
        this.cellInput.colIndex
      ].value = this.cellInput.value;
      this.cellInput = this.$options.data.call(this).cellInput;
    },
    currentPosition(rowIndex, colIndex) {
      return `${String.fromCharCode(65 + colIndex)}${rowIndex}`;
    },
    tableInit() {
      this.data.forEach((element) => {
        this.rowsHeader.push({ height: null });
      });
      this.data[0].forEach((element) => {
        this.colsHeader.push({ width: '100' });
      });
    },
    //TODO
    // 待调整
    // 列拉伸
    colResizeStart(evt, index) {
      evt.preventDefault();
      let vue = this;
      let vertAxis = vue.$refs.vertAxis.style;
      vertAxis.display = '';
      vertAxis.left = `${evt.pageX}px`;
      document.body.style.cursor = 'col-resize';
      let HandleOnMouseMove = function(evt) {
        evt.stopPropagation();
        vertAxis.left = `${evt.pageX}px`;
      };
      let HandleOnMouseUp = function(evt) {
        vertAxis.display = 'none';
        document.body.style.cursor = '';
        let width =
          vue.$refs.cols[index].getBoundingClientRect().width +
          evt.pageX -
          vue.store.startX;
        vue.colsHeader[index].width = width;
        document.removeEventListener('mousemove', HandleOnMouseMove);
        document.removeEventListener('mouseup', HandleOnMouseUp);
      };
      document.addEventListener('mouseup', HandleOnMouseUp);
      document.addEventListener('mousemove', HandleOnMouseMove);
    },
    // 行拉伸
    rowResizeStart(evt, index) {
      let vue = this;
      vue.store.startY = evt.pageY;
      vue.vertAxis.display = '';
      vue.vertAxis.top = `${evt.pageY}px`;
      let HandleOnMouseMove = function(evt) {
        evt.stopPropagation();
        vue.vertAxis.top = `${evt.pageY}px`;
        document.body.style.cursor = 'ns-resize';
      };
      let HandleOnMouseUp = function(evt) {
        vue.vertAxis.display = 'none';
        document.body.style.cursor = '';
        let height =
          vue.$refs.rows[index].getBoundingClientRect().height +
          evt.pageY -
          vue.store.startY;
        vue.rowsHeader[index].height = `${height}px`;
        document.removeEventListener('mousemove', HandleOnMouseMove);
        document.removeEventListener('mouseup', HandleOnMouseUp);
      };
      document.addEventListener('mouseup', HandleOnMouseUp);
      document.addEventListener('mousemove', HandleOnMouseMove);
    },
  },
};
