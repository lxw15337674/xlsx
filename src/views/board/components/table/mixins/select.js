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
                startCell: {},
                endCell: {},
            },
            selectContent: {
                width: 0,
                height: 0,
                left: 0,
                top: 0,
            },
            selectStart: false,
            selectedCellList: [],
        };
    },
    watch: {
        select: {
            deep: true,
            handler() {
                this.getSelectContent();
            },
        },
    },
    methods: {
        getSelectContent() {
            let rect = getTwoElementsRect(this.select.startCell, this.select.endCell);
            let scroller = this.$refs.scroller.$el.getBoundingClientRect();
            this.selectContent = {
                left: numToPx(rect.left - scroller.left),
                top: numToPx(rect.top - scroller.top),
                width: numToPx(rect.width),
                height: numToPx(rect.height),
            };
        },
        startSelect(evt, rowIndex, colIndex) {
            evt.preventDefault();
            this.select.startCell = evt.currentTarget;
            this.select.endCell = evt.currentTarget;
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
        colsSelect(colIndex) {
            this.select.colEndIndex = colIndex;
        },
        isSelect(evt, rowIndex, colIndex) {
            if (!this.selectStart) {
                return;
            }
            this.select.endCell = evt.currentTarget;
            this.select.rowEndIndex = rowIndex;
            this.select.colEndIndex = colIndex;
        },
        rowsSelect(rowIndex) {
            this.select.rowEndIndex = rowIndex;
        },
        isActive(colIndex) {
            return (
                Math.min(this.select.colStartIndex, this.select.colEndIndex) <= colIndex &&
                colIndex <= Math.max(this.select.colStartIndex, this.select.colEndIndex)
            );
        },
    },
};
