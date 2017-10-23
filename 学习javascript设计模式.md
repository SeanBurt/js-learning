# javascript 设计模式
## 封装
### 数据封装
 ```
const Mailbox = () =>{
    let _mails = {};
    return {
        send:(key) => {
            console.log(_mails[key]);
        },
        receive:(mail) => {
            _mails[mail.key] = mail;
        },
        empty:() => {
            _mails = {};
        },
        destroy:() => {
            _mails = null;
        }
    }
}
let mailbox = Mailbox();
mailbox.receive({key:"xiaoming",content:"hello wolrd"});
mailbox.send("xiaoming");
 ```
 每个邮箱盒子中的信件不对外暴露，属于私有的。对于用户来说可以往邮箱中放入信件，并且可以通过专用的秘钥获取信件。
### 封装类型
抽象类和接口的实现
### 封装变化
把存在变化的方面进行封装，当变化时只是进行封装部分的替换。
## 继承
### 基于原型的继承
```
//原型模式（克隆）
Object.create = Object.create || function(obj){
    function F(){
    }
    F.prototype = obj;
    return new F();
};
```
```
//new一个对象过程
function Person(info){
    this.info = info;
}
Person.prototype.getInfo = () => {
    return this.info;
}
const objectFactory = function(){
    let obj = new Object(),
        Constructor = [].shift.call(arguments),
        ret = null;
    
    obj.__proto__ = Constructor.prototype;
    ret = Constructor.apply(obj,arguments);
    return typeof ret === "object" ? ret : obj;
}
let a = objectFactory(Person,{name:"seven"});
console.log(a.info);
console.log(a.getInfo());
console.log(Object.getPrototypeOf(a) === Person.prototype);
```
```
//es6 class语法
class Animal {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
}
class Dog extends Animal {
    constructor(name) {
        super(name);
    }
    speak() {
        return "woof";
    }
}
let dog = new Dog("Scamp");
console.log(dog.getName() + " says " + dog.speak());
```
## this
### 丢失的this
```
let obj = {
    myName:"seven",
    getName:function() {
        return this.myName;
    }
}
console.log(obj.getName());
let getName2 = obj.getName;
console.log(getName2());
```
### call和apply
```
//Function.prototype.bind
Function.prototype.bind = function() {
    var self = this,
        context = [].shift.call( arguments ),
        args = [].slice.call( arguments );

        return function() {
            return self.apply(context,[].concat.call(args,[].slice.call(arguments)));
        } 
};
let obj1 = {
    name: 'sven'
};
let func = function( a, b, c, d ) {
    alert ( this.name );
    alert ( [ a, b, c, d ] )
}.bind( obj1, 1, 2 );
func( 3, 4 );
```
## 闭包
```
//javascript函数作用域：当函数执行完毕，函数内部变量则销毁，因此函数外部无法访问函数内部的变量。
//闭包
let func1 = function() {
    let a = 1;
    alert(a);
}
//普通函数执行完毕后，变量销毁。再次执行重新申请内存、使用变量、销毁变量
func1();

//形成闭包后，函数执行完毕后，变量被return返回的函数引用，一直在内存中存在。再次调用函数，直接使用内存中存在的变量
let func2 = function(){
    let a = 1;
    return function() {
        alert(a++);
    }
}();
func2();
```
## 高阶函数
### 需具备的条件
高阶函数满足至少一点：函数可以作为参数被传递；函数可以作为返回值输出。
### 函数作为参数传递
```
//回调函数
const getUserInfo = (params,callback) => {
    $.ajax(params.url,(data) => {
        if(typeof callback === "function") {
            callback(data);
        }
    })
}
getUserInfo({url:""},() => {
    console.log("ajax callback execute");
})

//Array.prototype.sort
[1,4,3].sort((a,b) => {
    return a - b;
})
```
### 函数作为返回值输出
```
//判断数据类型
const Type = {};
for(let i=0,type;type=["String","Array","Number"][i++];) {
    Type["is"+type] = (obj) => {
        return Object.prototype.toString.call(obj) === "[object " + type + "]";
    }
}
console.log(Type.isArray([2,3,4]));

//getSingle
const getSingle = function(fn) {
    let ret = null;
    return function() {
        return ret || (ret = fn.apply(this,arguments));
    }
}
```
### 高阶函数实现AOP
#### AOP
AOP(面向切面编程)的主要作用：把一些跟核心业务逻辑模块无关的功能抽离出来，这些跟业务逻辑无关的功能通常包括日志统计、安全控制、异常处理等。把这些功能抽离出来之后，再通过“动态织入”的方式渗入业务逻辑模块中。这样做的好处既可以保持业务逻辑模块的纯净和高内聚性，又可以很方便地复用日志统计等功能模块。
### javascript实现AOP
通常，在javascript中实现AOP，指把一个函数“动态织入”到另外一个函数之中。

```
//扩展Function.prototype实现AOP
Function.prototype.before = function(beforeFn) {
    let _self = this;
    return function() {
        beforeFn.apply(this,arguments);
        return _self.apply(this,arguments);
    }
}
Function.prototype.after = function(afterFn) {
    let _self = this;
    return function() {
        let ret = _self.apply(this,arguments);
        afterFn.apply(this,arguments);
        return ret;
    }
}
let func3 = function() {
    console.log(2);
}
func3 = func3.before(function(){
    console.log(1);
}).after(function(){
    console.log(3);
});
func3();
```
### 函数截流
```
//函数截流
var throttle = function(fn,interval) {
    var isFirst = true,
        timer = null,
        _self = fn;
    return function() {
        var args = arguments,
            _me = this;
        if(isFirst) {
            _self.apply(_me,args);
            isFirst = false;
        }
        if(timer) {
            return false;
        }
        timer = setTimeout(function(){
            clearTimeout(timer);
            timer = null;
            _self.apply(_me,args);
        },interval||500);
    }
}
window.onresize = throttle(function(){
    console.log(1);
});
```
### 分时函数
```
//分时函数
var timeChunk = function(ary,fn,count,interval) {
    var obj = null,
        timer = null;
    var start = function() {
        for(var i=0,l=ary.length;i<Math.min(count||1,l);i++) {
            obj = ary.shift();
            fn(obj);
        }
    }
    return function() {
        timer = setInterval(function(){
            if(ary.length === 0) {
                ary = null;
                return clearInterval(timer);
            }
            start();
        },interval||200);
    }
}
var ary = [];
for(var i=1;i<=1000;i++) {
    ary.push(i);
}
var renderList = timeChunk(ary,function(n){
    var div = document.createElement("div");
    div.innerHTML = n;
    document.body.appendChild(div);
},10,200);
renderList();
```
### 惰性加载函数
```
//惰性加载函数
var addEvent = function(elem,type,handler) {
    if(window.addEventListener) {
        addEvent = function(elem,type,handler) {
            elem.addEventListener(type,handler,false);
        }
    }else if(window.attachEvent) {
        addEvent = function(elem,type,handler) {
            elem.attachEvent("on"+type,handler);
        }
    }
    addEvent(elem,type,handler);
};
```
## 单例模式
### 使用场景
保证一个类仅有一个实例，并提供一个访问它的全局访问点。例如：线程池，全剧缓存，window对象等。
### 实现单例
```
//标准单例实现
var Singleton = function(name) {
    this.name = name;
    this.instance = null;
}
Singleton.prototype.getName = function() {
    return this.name;
}
Singleton.getInstance = function(name) {
    if(!this.instance) {
        this.instance = new Singleton(name);
    }
    return instance;
}
//闭包实现全局唯一实例
Singleton.getInstance = (function() {
    var instance = null;
    return function(name) {
        if(!instance) {
            instance = new Singleton(name);
        }
        return instance;
    }
})();
//单例代理
var ProxcySingleton = (function() {
    var instance = null;
    return function(ctor) {
        if(!instance) {
            instance = new ctor([].pop.call(arguments));
        }
        return instance;
    }
})();
var Person = function(sex) {
    this.sex = sex;
}
Person.prototype.getSex = function() {
    return this.sex;
}
var o1 = new ProxcySingleton(Person,"man"),
    o2 = new ProxcySingleton(Person,"man");
console.log(o1===o2);
```
### 通用惰性单例
