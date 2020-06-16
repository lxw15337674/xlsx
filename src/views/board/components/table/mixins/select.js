import { once } from 'src/utils/dom';
import { getOffset, numToPx } from 'src/utils/location';

export default {
  data() {
    return {
      select: {
        rowStartIndex: 0,
        colStartIndex: 0,
        startCell: undefined,
        rowEndIndex: 0,
        colEndIndex: 0,
        endCell: undefined,
      },
      selectStart: false,
    };
  },
  computed: {
    selectStyle() {
      let sCell = this.select.startCell;
      let eCell = this.select.endCell;
      if (!sCell) {
        return;
      }
      if (!eCell) {
        return {
          left: numToPx(sCell.offsetLeft),
          top: numToPx(sCell.offsetTop),
          width: numToPx(sCell.offsetWidth),
          height: numToPx(sCell.offsetHeight),
        };
      }
    },
  },
  methods: {
    startSelect(evt, rowIndex, colIndex) {
      this.select.rowStartIndex = rowIndex;
      this.select.colStartIndex = colIndex;
      this.select.startCell = getOffset(evt.currentTarget);
      this.selectStart = true;
      let HandleOnMouseUp = (evt) => {
        this.selectStart = false;
      };
      once(window, 'mouseup', HandleOnMouseUp);
    },
    isSelect(evt, rowIndex, colIndex) {
      if (!this.selectStart) {
        return;
      }
      this.select.rowEndIndex = rowIndex;
      this.select.colEndIndex = colIndex;
      this.select.endCell = getOffset(evt.currentTarget);
    },
  },
};
