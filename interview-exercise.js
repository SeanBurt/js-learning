// judge type: typeof instanceof Object.prototype.toString.call()
var o = {
  a: 1,
  f: function () {
    console.log('f')
  }
}
console.log(typeof o.a, typeof o.f, typeof o.b, typeof o, typeof null)

// function parameter passing
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
func2(o1);
console.log(o1.name);

// judge object type
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

// prototype and constructor
function SuperType () {
  this.value = true;
}
SuperType.prototype.getSuperTypeValue = function () {
  return this.value;
}
function SubType () {
  this.subValue = true;
}
SubType.prototype = new SuperType();
SubType.prototype.getSubTypeValue = function () {
  return this.subValue;
}
let instance = new SubType();
instance instanceof SubType;
instance instanceof SuperType;
instance.constructor === SubType;
instance.constructor === SuperType;

// temporal dead zone
let x = 10;
function func () {
  console.log(x);
  let x = 20;
  return x * x;
}
func();

// NaN null undefined
null == undefined
null === undefined
null == NaN
NaN == NaN
