// 类型判断: typeof instanceof Object.prototype.toString.call()
var o = {
  a: 1,
  f: function () {
    console.log('f')
  }
}
console.log(typeof o.a, typeof o.f, typeof o.b, typeof o, typeof null)

// 函数参数传递
var a = 3;
function func (a) {
  a = 10;
  console.log(a);
}
func();
console.log(a);

var o = {};
function func1 (o) {
  o.name = 'mr li';
}
console.log(o.name);
func1(o);
console.log(o.name);

var o1 = {};
function func2 (o) {
  o.name = 'mr li';
  o = new Object();
  o.name = 'mr lee';
}
console.log(o1.name);
func1(o1);
console.log(o1.name);

// 类型判断
const obj = {
  i: 0,
  toString: function () {
      return this.i++;
  }
};
obj.i++;
if (obj == 1 && obj ==2 && obj == 3) {
  console.log(obj.i);
}

// map and parseInt
['1', '2', '3'].map(parseInt);
