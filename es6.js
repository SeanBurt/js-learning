// let const 块级作用域, const 变量指向的内存地址中的内容不能改变，若是值类型（数字、字符串、布尔），变量值即保存在内存地址中，因此是常量无法改变；若是引用类型（对象），内存地址中存放的是真实值的地址，因此是可以改变指向的值，但是不能修改地址。
const ary = "hello".split("");
for(let i=0,l=ary.length; i<l; i++) {
  console.log(ary[i]);
}
let i = "index";
console.log(i);
const obj = { id: 1, name: "john"};
console.log(obj.name);
obj.name = "mike";
console.log(obj.name);

// destructuring
let [a, b, c] = [1, 2, 3];
let [a, b, c, d, e] = 'hello';
let [head, ...tail] = [1, 2, 3, 4];
let {foo, bar} = {bar: 'bar', foo: 'foo'};
let {log, dir} = console;
let {h: e} = {h: 'hello'}; // h是模式，e是被赋值的变量，‘hello’是值

// 扩展运算 ...
let maxNumber = Math.max(...[34, 56, 23]);
console.log(maxNumber);
const obj1 = {a: 1, b: 2, c: 3};
const obj2 = {...obj1, d: 4};
console.log(obj2);

// parameter default value
function Point (x = 0, y = 0) {
  this.x = x;
  this.y = y;
}
let p = new Point();
console.dir(p);

// ES6 提供了新的数据结构 Set, 它类似于数组，但是成员的值都是唯一的，没有重复的值。
const set1 = new Set([2,3,2,3,4,5,6,1,3]);
set1.forEach(item => console.log(item));

// ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。
const m = new Map();
const o = {p: 'Hello World'};
m.set(o, 'content')
console.log(m.get(o)); // "content"
console.log(m.has(o)); // true
console.log(m.delete(o)); // true
console.log(m.has(o)) // false
