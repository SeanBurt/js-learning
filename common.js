// 字符串全部替换正则版
function replaceAll (val, str, replaceStr) {
  let regx = new RegExp(`${str}`, 'g')
  return val.replace(regx, replaceStr)
}

// 字符串全部替换split版
function replaceAll2 (val, str, replaceStr) {
  return val.split(str).join(replaceStr)
}

// 用setTimeout实现setInterval
function mySetInterval (callback, duration, count) {
  function interval () {
    if (typeof count === 'undefined' || count-- > 0) {
      setTimeout(interval, duration)
      try {
        callback()
      } catch (ex) {
        throw ex
      }
    }
  }
  setTimeout(interval, duration)
}
