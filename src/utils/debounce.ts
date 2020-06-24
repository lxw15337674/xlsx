export default function debounce(fn: Function, wait: number = 50) {
  // 缓存一个定时器id
  let timer = null;
  // 这里返回的函数时每次用户实际调用的防抖函数
  // 如果已经设定过定时器了就清空上一次的定时器
  // 开始一个定时器，延迟执行用户传入的方法
  return function(...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      //将实际的this和参数传入用户实际调用的函数
      fn.apply(this, args);
    }, wait);
  };
}
