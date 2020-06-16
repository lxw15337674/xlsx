export default {
  data() {
    return {
      store: {
        startX: undefined,
        startY: undefined,
        miniWidth: 30,
      },
    };
  },
  computed: {
    tableWidth() {
      return this.colsHeader.reduce((total, item) => {
        return total + item.width;
      }, 0);
    },
    bodyWidth() {
      return this.tableWidth - 100;
    },
  },
  methods: {
    //行拉伸
    rowResizeStart(evt, index) {
      evt.preventDefault();
      let vue = this,
        tableRect = this.$refs.table.getBoundingClientRect(),
        horiAxis = vue.$refs.horiAxis.style,
        tableTop = tableRect.top;
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
          evt.pageY -
          vue.store.startY +
          vue.$refs.rows[index].getBoundingClientRect().height;
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
        tableRect = this.$refs.table.getBoundingClientRect(),
        vertAxis = vue.$refs.vertAxis.style;
      vue.store.startX = evt.pageX;
      vertAxis.display = '';
      vertAxis.left = `${evt.pageX - tableRect.left}px`;
      document.body.style.cursor = 'col-resize';
      let HandleOnMouseMove = function HandleOnMouseMove(evt) {
        vertAxis.left = `${evt.pageX - tableRect.left}px`;
      };
      let HandleOnMouseUp = function(evt) {
        vertAxis.display = 'none';
        document.body.style.cursor = '';
        vue.colsHeader[index].width =
          evt.pageX -
          vue.store.startX +
          vue.$refs.cols[index].getBoundingClientRect().width;
        window.removeEventListener('mousemove', HandleOnMouseMove);
        window.removeEventListener('mouseup', HandleOnMouseUp);
      };
      window.addEventListener('mouseup', HandleOnMouseUp);
      window.addEventListener('mousemove', HandleOnMouseMove);
    },
  },
};
