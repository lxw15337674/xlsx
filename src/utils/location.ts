import * as math from './math';
interface rect {
    left: string;
    top: string;
    height: string;
    width: string;
}
interface node {
    width: number;
    height: number;
    top: number;
    bottom: number;
    left: number;
    right: number;
}
function getOffset(el: HTMLElement): node {
    return {
        width: el.offsetWidth,
        height: el.offsetHeight,
        left: el.offsetLeft,
        top: el.offsetTop,
        bottom: el.offsetTop + el.offsetHeight,
        right: el.offsetLeft + el.offsetWidth,
    };
}
/**
 * 获取两个元素之间的距离
 */
// export function getTwoElementsRect(el1: HTMLElement, el2: HTMLElement): rect {
//     let rect1: node = el1.getBoundingClientRect();
//     let rect2: node = el2.getBoundingClientRect();
//     return {
//         left: Math.min(rect1.left, rect2.left),
//         top: Math.min(rect1.top, rect2.top),
//         height: Math.max(rect2.bottom, rect1.bottom) - Math.min(rect1.top, rect2.top),
//         width: Math.max(rect2.right, rect1.right) - Math.min(rect1.left, rect2.left),
//     };
// }

/**
 * 获取两个单元格之间的矩形边界
 */
interface selectedIndex {
    rowStartIndex: number;
    colStartIndex: number;
    rowEndIndex: number;
    colEndIndex: number;
}

export function getRectBetweenTwoCells(
    selected: selectedIndex,
    rows: number[],
    cols: number[],
): rect {
    let [rowStartIndex, rowEndIndex] = math.sort([selected.rowStartIndex, selected.rowEndIndex]);
    let [colStartIndex, colEndIndex] = math.sort([selected.colStartIndex, selected.colEndIndex]);
    return {
        left: `${math.total(cols, 0, colStartIndex)}px`,
        width: `${math.total(cols, colStartIndex, colEndIndex + 1)}px`,
        top: `${math.total(rows, 0, rowStartIndex)}px`,
        height: `${math.total(rows, rowStartIndex, rowEndIndex + 1)}px`,
    };
}

interface cellIndex {
    rowIndex: number;
    colIndex: number;
}
export function getCellPosition(cellIndex: cellIndex, rows: number[], cols: number[]) {
    return {
        left: `${math.total(cols, 0, cellIndex.colIndex)}px`,
        minWidth: `${cols[cellIndex.colIndex]}px`,
        top: `${math.total(rows, 0, cellIndex.rowIndex)}px`,
        minHeight: `${rows[cellIndex.rowIndex]}px`,
    };
}
// /**
//  * 获取元素的矩形边界
//  * 等同于getBoundingClientRect()
//  */
// export function getRect(el: HTMLElement): node {
//     let rect = el.getBoundingClientRect();
//     return {
//         x: rect.x,
//         y: rect.y,
//         width: rect.width,
//         height: rect.height,
//         top: rect.top,
//         bottom: rect.bottom,
//         left: rect.left,
//         right: rect.right,
//     };
// }
