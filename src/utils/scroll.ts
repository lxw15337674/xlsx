//判断滚动方向
let sLeft = 0,
    sTop = 0;
export function scrollDirection(el: HTMLElement): string {
    if (sLeft != el.scrollLeft) {
        sLeft = el.scrollLeft;
        return 'horizontal';
    }
    if (sTop != el.scrollTop) {
        sTop = el.scrollTop;
        return 'vertical';
    }
}
//todo 二分查找法优化
function binarySearch() {}
//查找开始位置
function findStartIndex(scrollTop: number, list: number[]): number {
    let top = 0;
    for (let index in list) {
        top += list[index];
        if (top >= scrollTop) {
            return Number(index);
        }
    }
}
//查找结束位置
function findEndIndex(visibleLength: number, startIndex: number, list: number[]): number {
    let size = 0;
    let endIndex = startIndex;
    while (endIndex <= list.length - 1 && size < visibleLength) {
        size += list[endIndex];
        endIndex++;
    }
    return endIndex;
}
//获取元素在表格的位置
export function getItemPosition(start: number, end: number, list: number[]): number {
    return list.slice(start, end + 1).reduce((total, item) => {
        return total + item;
    }, 0);
}
// 获取当前表格的索引值，例如{start:0,end:10}
interface VisiblePosition {
    start: number;
    end: number;
}
export function findVisibleIndex(
    length: number,
    visibleLength: number,
    list: number[],
): VisiblePosition {
    let start = findStartIndex(length, list);
    let end = findEndIndex(visibleLength, start, list);
    return {
        start: start,
        end: end,
    };
}
