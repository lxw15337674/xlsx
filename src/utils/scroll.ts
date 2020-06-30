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
            return Number(index) > 0 ? Number(index) - 1 : 0; // -1使得表格高度始终大于显示高度，这样不会拖拽空白的情况。
            // return Number(index)
        }
    }
}
//查找结束位置
function findEndIndex(visibleLength: number, startIndex: number, list: number[]): number {
    let size = 0;
    let endIndex = startIndex;
    debugger
    while (endIndex <= list.length - 1 && size < visibleLength) {
        size += list[endIndex];
        endIndex++;
    }
    return endIndex + 1; // +1使得表格高度始终大于显示高度，这样不会拖拽空白的情况。
}
// 获取当前表格的索引值，例如[2,10]
export function findVisibleIndex(scrollTop: number, visibleLength: number, list: number[]): [number, number] {
    let start = findStartIndex(scrollTop, list);
    let end = findEndIndex(visibleLength, start, list);
    return [start, end];
}

//查找指定元素的位置
interface row {
    height: number;
}
export function findItemTop(index: number, list: row[]): number {
    return list.slice(0, index).reduce((total, item) => {
        return total + item.height;
    }, 0);
}
