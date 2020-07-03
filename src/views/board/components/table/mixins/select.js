import { once } from 'src/utils/dom';
import * as location from '@/utils/location.ts';
import { numToPx, getCellIndex } from 'src/utils/transform.ts';
import * as select from 'src/utils/select.ts';

export default {
    data() {
        return {
            selectedIndex: {
                rowStartIndex: null,
                colStartIndex: null,
                rowEndIndex: null,
                colEndIndex: null,
            },

            selectStart: false,
            // selectedCellList: [], //TODO 多选情况
        };
    },
    watch: {},
    computed: {
        selectedContent() {
            return location.getRectBetweenTwoCells(
                this.selectedIndex,
                this.rowsList,
                this.colslist,
            );
        },
    },
    methods: {
        startSelect(evt, rowIndex, colIndex) {
            if (evt.button === 0) {
                evt.preventDefault();
                //  this.selectedIndex.startCell = evt.currentTarget;
                //  this.selectedIndex.endCell = evt.currentTarget;
                this.selectedIndex.rowStartIndex = rowIndex;
                this.selectedIndex.rowEndIndex = rowIndex;
                this.selectedIndex.colStartIndex = colIndex;
                this.selectedIndex.colEndIndex = colIndex;
                this.selectedStart = true;
                let HandleOnMouseUp = (evt) => {
                    this.selectedStart = false;
                };
                once(window, 'mouseup', HandleOnMouseUp);
            }
        },
        rowSelect(rowIndex) {
            this.selectedIndex.rowStartIndex = rowIndex;
            this.selectedIndex.colStartIndex = 0;
            this.selectedIndex.rowEndIndex = rowIndex;
            this.selectedIndex.colEndIndex = this.colsHeader.length - 1;
        },
        colSelect(colIndex) {
            this.selectedIndex.rowStartIndex = 0;
            this.selectedIndex.colStartIndex = colIndex;
            this.selectedIndex.rowEndIndex = this.rowsHeader.length - 1;
            this.selectedIndex.colEndIndex = colIndex;
        },
        colsSelect(colIndex) {
            this.selectedIndex.colEndIndex = colIndex;
        },
        handleMouseEnter(evt, rowIndex, colIndex) {
            if (!this.selectedStart) {
                return;
            }
            this.selectedIndex.endCell = evt.currentTarget;
            this.selectedIndex.rowEndIndex = rowIndex;
            this.selectedIndex.colEndIndex = colIndex;
        },
        /*右键事件：判断鼠标位置是否在选择框中，如果在则表示操作选择框中数据，如果不在则表示操作鼠标位置的单位格
         */
        handleContextMenu(evt, rowIndex, colIndex) {
            if (!select.isSelected(rowIndex, colIndex, this.selectedIndex)) {
                this.selectedIndex.rowStartIndex = rowIndex;
                this.selectedIndex.rowEndIndex = rowIndex;
                this.selectedIndex.colStartIndex = colIndex;
                this.selectedIndex.colEndIndex = colIndex;
            }
        },
        rowsSelect(rowIndex) {
            this.selectedIndex.rowEndIndex = rowIndex;
        },
        isActive(colIndex) {
            return (
                Math.min(this.selectedIndex.colStartIndex, this.selectedIndex.colEndIndex) <=
                    colIndex &&
                colIndex <=
                    Math.max(this.selectedIndex.colStartIndex, this.selectedIndex.colEndIndex)
            );
        },
    },
};
