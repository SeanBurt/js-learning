// ---1
// judge type: typeof instanceof Object.prototype.toString.call()
let o = {
  a: 1,
  f: function () {
    console.log("f");
  },
};
console.log(typeof o.a, typeof o.f, typeof o.b, typeof o, typeof null);

// ---2
// function parameter passing
let a = 3;
function func(a) {
  a = 10;
  console.log(a);
}
func();
console.log(a);

let o = {};
function func1(o) {
  o.name = "mr li";
}
console.log(o.name);
func1(o);
console.log(o.name);

let o1 = {};
function func2(o) {
  o.name = "mr li";
  o = new Object();
  o.name = "mr lee";
  console.log(o.name);
}
console.log(o1.name);
func2(o1);
console.log(o1.name);

// ---3
// judge object type
const obj = {
  i: 0,
  toString: function () {
    return this.i++;
  },
};
obj.i++;
if (obj == 1 && obj == 2 && obj == 3) {
  console.log(obj.i);
}

// ---4
// map and parseInt
["1", "2", "3"].map(parseInt);

// ---5
// prototype and constructor
function SuperType() {
  this.value = true;
}
SuperType.prototype.getSuperTypeValue = function () {
  return this.value;
};
function SubType() {
  this.subValue = true;
}
SubType.prototype = new SuperType();
SubType.prototype.getSubTypeValue = function () {
  return this.subValue;
};
let instance = new SubType();
instance instanceof SubType;
instance instanceof SuperType;
instance.constructor === SubType;
instance.constructor === SuperType;

// ---6
// temporal dead zone
let x = 10;
function func() {
  console.log(x);
  let x = 20;
  return x * x;
}
func();

// ---7
// NaN null undefined
null == undefined;
null === undefined;
null == NaN;
NaN == NaN;
NaN === NaN;

// ---8
// about this (not strict pattern)
let name = "the window";
let obj = {
  name: "the object",
  getName: function () {
    return function () {
      return this.name;
    };
  },
};
console.log(obj.getName()());

let name = "the window";
let obj = {
  name: "the object",
  getName: function () {
    let that = this;
    return function () {
      return that.name;
    };
  },
};
console.log(obj.getName()());

let name = "the window";
let obj = {
  name: "the object",
  getName: function () {
    return this.name;
  },
};
console.log(obj.getName());
console.log(obj.getName());
console.log((obj.getName = obj.getName)());

// ---9
// recursion
let i = 0;
function fn() {
  i++;
  if (i < 10) {
    fn();
  } else {
    return i;
  }
}
let result = fn();
console.log(result);

// ---10
// basic packaging type
let str = "some text";
str.color = "red";
console.log(str.color);

// ---11
// distinct array
Array.prototype.distinct = function () {
  let ary = this;
  let result = [];
  for (let i = 0, l = ary.length; i < l; i++) {
    for (let x = i + 1; x < l; x++) {
      if (ary[i] === ary[x]) {
        j = ++i;
      }
    }
    result.push(ary[i]);
  }
  return result;
};
const arra = [1, 2, 3, 4, 4, 1, 1, 2, 1, 1, 1];
arra.distinct();

Array.prototype.distinct1 = function () {
  let arr = this;
  let obj = {};
  let result = [];
  for (let i = 0, l = arr.length; i < l; i++) {
    if (!obj[arr[i]]) {
      obj[arr[i]] = 1;
      result.push(arr[i]);
    }
  }
  return result;
};
let a = [1, 2, 3, 4, 5, 6, 5, 3, 2, 4, 56, 4, 1, 2, 1, 1, 1, 1, 1, 1];
let b = a.distinct1();
console.log(b.toString());

let arr = [1, 2, 3, 3];
let resultarr = [...new Set(arr)];
console.log(resultarr);

// ---12
// EventEmitter
class Event {
  constructor() {
    this._cache = [];
  }
  on(type, callback) {
    let fns = (this._cache[type] = this._cache[type] || []);
    if (fns.indexOf(callback) === -1) {
      fns.push(callback);
    }
    return this;
  }
  trriger(type, data) {
    let fns = this._cache[type];
    if (Array.isArray(fns)) {
      fns.forEach((fn) => fn(data));
    }
    return this;
  }
  off(type, callback) {
    let fns = this._cache[type];
    if (Array.isArray(fns)) {
      if (callback) {
        let index = fns.indexOf(callback);
        if (index !== -1) {
          fns.splice(index, 1);
        }
      } else {
        fns.length = 0;
      }
    }
    return this;
  }
  once(type, callback) {
    let wrapFun = () => {
      callback.call(this);
      this.off(type, wrapFun);
    };
    this.on(type, wrapFun);
    return this;
  }
}
let e = new Event();
e.on("click", function (data) {
  console.log(data);
});
e.trriger("click", "666");
console.log(e);

// ---13
// Promise 状态改变
new Promise((resolve, reject) => {
  reject();
  resolve();
})
  .then((res) => {
    console.log("success1", res);
  })
  .catch((err) => {
    console.log("error1", err);
  })
  .then((res) => {
    console.log("success2", res);
  });

// ---14
// 广度递归
// 写一个方法打印如下结构 name
// 要求打印顺序为 root, child_0, child_1, child_0_0, child_1_0
const data = {
  name: "root",
  children: [
    {
      name: "child_0",
      children: [
        {
          name: "child_0_0",
          children: [],
        },
      ],
    },
    {
      name: "child_1",
      children: [
        {
          name: "child_1_0",
          children: [],
        },
      ],
    },
  ],
};
function breadthTraval(self) {
  if (!self) {
    return;
  }
  let queue = [];
  let node = null;
  queue.push(self);
  while (queue.length) {
    node = queue.shift();
    console.log(node.name);
    if (node.children.length) {
      node.children.forEach((item) => queue.push(item));
    }
  }
}
breadthTraval(data);

// ---15
// array flat
let ary = [1, [2, 3], [4, [5, 6], 7], 8];
console.log("flat depth 1: ", ary.flat());
console.log("flat depth 2: ", ary.flat(2));
console.log("flat depth any: ", ary.flat(Infinity));

// 单层深度实现
const flattened = (arr) => [].concat(...arr);
console.log(flattened(ary));
function flat1(ary) {
  return ary.reduce((acc, val) => acc.concat(val), []);
}
console.log(flat1(ary));

// 多层深度实现
function flatDeep(arr, d = 1) {
  return d > 0
    ? arr.reduce(
        (acc, val) =>
          acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val),
        []
      )
    : arr.slice();
}
console.log(flatDeep(ary, Infinity));
const eachFlat = (arr = [], depth = 1) => {
  const result = []; // 缓存递归结果
  // 开始递归
  (function flat(arr, depth) {
    // forEach 会自动去除数组空位
    arr.forEach((item) => {
      // 控制递归深度
      if (Array.isArray(item) && depth > 0) {
        // 递归数组
        flat(item, depth - 1);
      } else {
        // 缓存元素
        result.push(item);
      }
    });
  })(arr, depth);
  // 返回递归结果
  return result;
};
console.log(eachFlat(ary, Infinity));

// ---16
// Promise.all() 实现
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "foo");
});
Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values);
});

Promise.all = function (promises) {
  let results = [];
  let promiseCount = 0;
  let promisesLength = promises.length;
  return new Promise(function (resolve, reject) {
    for (let val of promises) {
      Promise.resolve(val).then(
        function (res) {
          results[promiseCount] = res;
          promiseCount++;
          if (promiseCount === promisesLength) {
            return resolve(results);
          }
        },
        function (err) {
          return reject(err);
        }
      );
    }
  });
};

Promise.all1 = function (promises) {
  let results = [];
  let promiseCount = 0;
  let promisesLength = promises.length;
  return new Promise(function (resolve, reject) {
    for (let val of promises) {
      Promise.resolve(val).then(
        function (res) {
          results[promiseCount] = res;
          promiseCount++;
          if (promiseCount === promisesLength) {
            return resolve(results);
          }
        },
        function (err) {
          return reject(err);
        }
      );
    }
  });
};
Promise.all1([promise1, promise2, promise3]).then((values) => {
  console.log(values);
});

// ---17
// call 实现
Function.prototype.myCall = function (context) {
  let ctx = Object(context) || window;
  ctx.fn = this;
  let args = [...arguments].slice(1);
  let res = ctx.fn(...args);
  delete ctx.fn;
  return res;
};
function hello() {
  console.log(this, arguments);
}
hello.myCall({ a: 1 }, 2, 3);
hello();

// ---18
// array slice 实现
Array.prototype.mySlice = function (num1, num2) {
  let ary = [];
  let item1 = Math.abs(num1) > this.length ? 0 : num1;
  item1 = isNaN(item1)
    ? 0
    : item1 < 0
    ? Math.ceil(item1 + this.length)
    : Math.floor(item1);
  let item2 =
    num2 === undefined && (num1 <= this.length || isNaN(item1))
      ? this.length
      : num2 < 0
      ? Math.ceil(num2 + this.length)
      : Math.floor(num2);
  for (let i = item1; i < item2 && i < this.length; i++) {
    ary[ary.length] = this[i];
  }
  return ary;
};
let ary = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
console.log(ary.mySlice(2.7, 7.7));
console.log(ary.mySlice(1));
console.log(ary.mySlice(0, -1));

// ---19
// 观察者模式实现
<p>点击页面，更新视图</p>;
class Dep {
  /* subs 存放观察者 watcher 对象 */
  constructor() {
    this.subs = [];
  }
  /* 添加观察者 */
  addSub(sub) {
    this.subs.push(sub);
  }
  /* 通知观察者更新数据 */
  notify() {
    console.log("~~~ Dep update ~~~");
    this.subs.forEach((sub) => {
      sub.update();
    });
  }
}
class Watcher {
  /* new Watcher 时将该对象赋值给 Dep.target，在get中会用到 */
  constructor() {
    Dep.target = this;
  }
  update() {
    console.log("~~~ Watcher update views ~~~");
  }
}
function observer(obj) {
  Object.keys(obj).forEach((key) => {
    let val = obj[key];
    const dep = new Dep();
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: function reactiveGetter() {
        /* 将Dep.target（即当前的 Watcher 对象存入 dep 的 subs 中） */
        dep.addSub(Dep.target);
        return val;
      },
      set: function (newVal) {
        if (val === newVal) {
          return;
        }
        /* 在set的时候触发dep的notify来通知所有的Watcher对象更新视图 */
        val = newVal;
        dep.notify();
        console.log("observer 视图更新～");
      },
    });
  });
}
class Mvvm {
  constructor(options) {
    this._data = options.data;
    observer(this._data);
    /* 新建一个Watcher观察者对象，这时候Dep.target会指向这个Watcher对象 */
    new Watcher();
    console.log(this._data.name);
  }
}
let o = new Mvvm({
  data: {
    name: "mvvm ~",
  },
});
document.body.addEventListener("click", () => {
  o._data.name = "mvvm update~" + new Date().getTime();
});

// ---20
// 青蛙跳台阶 Fibonacci
// f(n) = f(n-1) + f(n - 2);
function ways(n) {
  if (n < 1) {
    return 0;
  }
  if (n < 3) {
    return n;
  }
  let s1 = 1,
    s2 = 2,
    s3 = 1;
  for (let i = 3; i <= n; i++) {
    s3 = s1 + s2;
    console.log(s3);
    s1 = s2;
    s2 = s3;
  }
  return s3;
}
console.log(ways(10));

// ---21
// 数组转成嵌套对象
// ["a","b","c","d"] => {a:{b:{c:{d:null}}}}
let ary = ["a", "b", "c", "d"];
function nest(ary) {
  function nested(key, obj) {
    return { [key]: obj };
  }
  let obj = null;
  ary.reverse().forEach((item) => {
    obj = nested(item, obj);
  });
  return obj;
}
console.log(nest(ary));
