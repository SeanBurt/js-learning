// 字符串全部替换正则版
function replaceAll(val, str, replaceStr) {
  let regx = new RegExp(`${str}`, "g");
  return val.replace(regx, replaceStr);
}

// 字符串全部替换split版
function replaceAll2(val, str, replaceStr) {
  return val.split(str).join(replaceStr);
}

// 用setTimeout实现setInterval
function mySetInterval(callback, duration, count) {
  function interval() {
    if (typeof count === "undefined" || count-- > 0) {
      setTimeout(interval, duration);
      try {
        callback();
      } catch (ex) {
        throw ex;
      }
    }
  }
  setTimeout(interval, duration);
}

// 防抖
function debounce(fn, wait = 500) {
  let timerId = null;

  return function () {
    let self = this;
    let args = arguments;

    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
    timerId = setTimeout(function () {
      fn.apply(self, args);
    }, wait);
  };
}

// 截流
function throttle(fn, threshold = 500) {
  let timer = null;
  let last = null;

  return function () {
    const context = this;
    const args = arguments;

    const now = +new Date();
    // 如果之前有执行过并且距离上次执行时间小于阈值，则延迟剩余时间后再执行
    // 保证执行间隔大于阈值
    const remaining = last ? last + threshold - now : 0;
    if (remaining > 0) {
      clearTimeout(timer);

      timer = setTimeout(() => {
        last = +new Date();
        fn.apply(context, args);
      }, remaining);
    }
    // 第一次调用会执行，从上次执行开始超过阈值也会执行
    else {
      last = +new Date();
      fn.apply(context, args);
    }
  };
}
