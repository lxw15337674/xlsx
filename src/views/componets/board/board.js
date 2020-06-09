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
        for (let row = 0; row < 100; row++) {
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
        this.colsHeader.push({ width: 100 });
      });
    },
    // 列拉伸
    colResizeStart(evt, index) {
      evt.preventDefault();
      let vue = this;
      const tableLeft = vue.$refs.table.getBoundingClientRect().left;
      let vertAxis = vue.$refs.vertAxis.style;
      vertAxis.display = '';
      vertAxis.left = `${evt.pageX -
        vue.$refs.table.getBoundingClientRect().left}px`;
      document.body.style.cursor = 'col-resize';
      let HandleOnMouseMove = function HandleOnMouseMove(evt) {
        vertAxis.left = `${evt.pageX - tableLeft}px`;
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
      const tableTop = vue.$refs.table.getBoundingClientRect().top;
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
