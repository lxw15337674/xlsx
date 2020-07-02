interface rect {
    left: number;
    top: number;
    height: number;
    width: number;
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
export function getTwoElementsRect(el1: HTMLElement, el2: HTMLElement): rect {
    let rect1: node = el1.getBoundingClientRect();
    let rect2: node = el2.getBoundingClientRect();
    return {
        left: Math.min(rect1.left, rect2.left),
        top: Math.min(rect1.top, rect2.top),
        height: Math.max(rect2.bottom, rect1.bottom) - Math.min(rect1.top, rect2.top),
        width: Math.max(rect2.right, rect1.right) - Math.min(rect1.left, rect2.left),
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
