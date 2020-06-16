export function getOffset(el) {
  return {
    offsetWidth: el.offsetWidth,
    offsetHeight: el.offsetHeight,
    offsetLeft: el.offsetLeft,
    offsetTop: el.offsetTop,
  };
}

export function getRect(el) {
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

export function numToPx(number) {
  if (number) {
    return `${number}px`;
  }
}
export function pxToNum(str) {
  if (str) {
    return parseInt(str.slice(0, -2), 10);
  }
}
