import { once } from 'src/utils/dom';
import { getTwoElementsRect } from '@/utils/location.ts';
import { numToPx, getCellIndex } from 'src/utils/transform.ts';

export default {
  data() {
    return {
      select: {
        rowStartIndex: null,
        colStartIndex: null,
        rowEndIndex: null,
        colEndIndex: null,
      },
      selectStart: false,
    };
  },
  computed: {
    selectStyle() {
      if (this.select.rowStartIndex === null) {
        return {};
      }
      let sCell = this.$refs.cell[
        getCellIndex(
          this.select.rowStartIndex,
          this.select.colStartIndex,
          this.colsHeader.length,
        )
      ];
      let eCell = this.$refs.cell[
        getCellIndex(
          this.select.rowEndIndex,
          this.select.colEndIndex,
          this.colsHeader.length,
        )
      ];
      let rect = getTwoElementsRect(sCell, eCell);
      return {
        left: numToPx(rect.left),
        top: numToPx(rect.top),
        width: numToPx(rect.width),
        height: numToPx(rect.height),
      };
    },
  },
  methods: {
    startSelect(evt, rowIndex, colIndex) {
      this.select.rowStartIndex = rowIndex;
      this.select.rowEndIndex = rowIndex;
      this.select.colStartIndex = colIndex;
      this.select.colEndIndex = colIndex;
      this.selectStart = true;
      let HandleOnMouseUp = (evt) => {
        this.selectStart = false;
      };
      once(window, 'mouseup', HandleOnMouseUp);
    },
    rowSelect(rowIndex) {
      this.select.rowStartIndex = rowIndex;
      this.select.colStartIndex = 0;
      this.select.rowEndIndex = rowIndex;
      this.select.colEndIndex = this.colsHeader.length - 1;
    },
    colSelect(colIndex) {
      this.select.rowStartIndex = 0;
      this.select.colStartIndex = colIndex;
      this.select.rowEndIndex = this.rowsHeader.length - 1;
      this.select.colEndIndex = colIndex;
    },
    colsSelect(colIndex){
      this.select.colEndIndex = colIndex;
    },
    isSelect(evt, rowIndex, colIndex) {
      if (!this.selectStart) {
        return;
      }
      this.select.rowEndIndex = rowIndex;
      this.select.colEndIndex = colIndex;
    },
    rowsSelect(rowIndex) {
      this.select.rowEndIndex = rowIndex;
    },
    isActive(colIndex) {
      return (
        Math.min(this.select.colStartIndex, this.select.colEndIndex) <=
          colIndex &&
        colIndex <= Math.max(this.select.colStartIndex, this.select.colEndIndex)
      );
    },
  },
};
