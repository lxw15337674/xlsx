import SWorker from 'simple-web-worker';

import { findVisibleIndex } from '@/utils/scroll';

// 获取当前表格的索引值，例如{start:0,end:10}
interface VisiblePosition {
    start: number;
    end: number;
}
let worker;
export default class Worker {
    public actions = [
        // {
        //     message: 'findVisibleIndex',
        //     func: (offset: number, visibleOffset: number, list: number[]): VisiblePosition => {
        //         // 二分查找法
        //         function binarySearch(offset: number, list: number[]): number {
        //             if (list.length === 0) {
        //                 throw '数组不能为空';
        //             }
        //             let startIndex = 0,
        //                 endIndex = list.length - 1,
        //                 midIndex,
        //                 startOffset,
        //                 endOffset;
        //             while (startIndex <= endIndex) {
        //                 midIndex = Math.floor((startIndex + endIndex) / 2);
        //                 startOffset = list[midIndex - 1] || 0;
        //                 endOffset = list[midIndex];
        //                 //处理索引为0的情况
        //                 if (midIndex === 0 && offset <= list[0]) {
        //                     return 0;
        //                 }
        //                 if (startOffset > offset) {
        //                     endIndex = midIndex - 1;
        //                 } else if (startOffset === offset) {
        //                     return midIndex - 1;
        //                 } else if (startOffset <= offset && offset <= endOffset) {
        //                     return midIndex;
        //                 } else if (endOffset < offset) {
        //                     startIndex = midIndex + 1;
        //                 }
        //             }
        //             return list.length;
        //         }
        //
        //         let start = binarySearch(offset, list);
        //         let end = binarySearch(visibleOffset + offset, list) + 1;
        //         return {
        //             start: start,
        //             end: end,
        //         };
        //     },
        // },
        {
            message: 'visibleCache',
            func: (visibleOffset: number, list: number[]) => {
                // 查找结束位置
                function findEndIndex(
                    visibleOffset: number,
                    startIndex: number,
                    list: number[],
                ): number {
                    let size = 0;
                    let endIndex = startIndex;
                    let maxVisibleLength = visibleOffset + list[startIndex];
                    while (endIndex <= list.length - 1 && size <= maxVisibleLength) {
                        size += list[endIndex];
                        endIndex++;
                    }
                    return endIndex;
                }

                let visibleList = [];
                for (let index in list) {
                    visibleList.push(findEndIndex(visibleOffset, Number(index), list));
                }
                return visibleList;
            },
        },
        {
            message: 'sheetInit',
            func: (rowsLength = 100, colsLength = 10) => {
                let table = [];
                for (let row = 0; row < rowsLength; row++) {
                    table[row] = [];
                    for (let col = 0; col < colsLength; col++) {
                        table[row][col] = `行：${row}，列：${col}`;
                    }
                }
                return table;
            },
        },
    ];

    constructor() {
        if (!worker) {
            worker = SWorker.create(this.actions);
        }
        return worker;
    }
}
