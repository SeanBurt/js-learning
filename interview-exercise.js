1. typeof instanceof Object.prototype.toString.call()
var o = {
  a: 1,
  f: function () {
    console.log('f')
  }
}
console.log(typeof o.a, typeof o.f, typeof o.b, typeof o, typeof null)
