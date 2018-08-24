// 字符串全部替换正则版
function replaceAll1 (val, str) {
  var regx = new RegExp(`^${str}$`, 'g')
  return val.replace(regx, '')
}

// 字符串全部替换split版
function replaceAll2 (val, str) {
  return val.split(str).join('')
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
