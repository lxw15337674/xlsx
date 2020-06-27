interface rect {
    left: number;
    top: number;
    height: number;
    width: number;
}
interface node {
    x: number;
    y: number;
    width: number;
    height: number;
    top: number;
    bottom: number;
    left: number;
    right: number;
}
export function getOffset(el: HTMLElement): object {
    return {
        offsetWidth: el.offsetWidth,
        offsetHeight: el.offsetHeight,
        offsetLeft: el.offsetLeft,
        offsetTop: el.offsetTop,
    };
}
//获取包含两个元素的矩形
export function getTwoElementsRect(el1: HTMLElement, el2: HTMLElement): rect {
    let rect1: node = getRect(el1);
    let rect2: node = getRect(el2);
    return {
        left: Math.min(rect1.left, rect2.left),
        top: Math.min(rect1.top, rect2.top),
        height:
            Math.max(rect2.bottom, rect1.bottom) -
            Math.min(rect1.top, rect2.top),
        width:
            Math.max(rect2.right, rect1.right) -
            Math.min(rect1.left, rect2.left),
    };
}

export function getRect(el: HTMLElement): node {
    let rect = el.getBoundingClientRect();
    return {
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
        top: rect.top,
        bottom: rect.bottom,
        left: rect.left,
        right: rect.right,
    };
}
