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
```
var getSingle = function(ctor) {
    var ret = null;
    return function() {
        return ret || (ret = ctor.apply(this,arguments));
    }
}
```
## 策略模式
### 定义
一个基于策略模式的程序至少由两部分组成。第一个部分是一组策略类，策略类封装了具体的算法，并负责具体的计算过程。第二个部分是环境类Context，Context接受客户的请求，随后把请求委托给某一个策略类。要做到这点，说明Context中要维持对某个策略对象的引用。
### 使用场景
```
//公司奖金发放 策略模式(策略计算方式可变，策略应用场景不变)
let strategies = {
    S:salary=>salary*4,
    A:salary=>salary*3,
    B:salary=>salary*2
}
const calculateBonus = (level,salary)=>strategies[level](salary)
console.log(calculateBonus('S', 20000));
//缓动算法
let tween = {
    linear:(t, b, c, d)=>{
        return c*t/d + b
    },
    easeIn:(t, b, c, d)=>{
        return c * ( t /= d ) * t + b
    },
    strongEaseIn:(t, b, c, d)=>{
        return c * ( t /= d ) * t * t * t * t + b
    },
    strongEaseOut:(t, b, c, d)=>{
        return c * ( ( t = t / d - 1) * t * t * t * t + 1 ) + b
    },
    sineaseIn:(t, b, c, d )=>{
        return c * ( t /= d) * t * t + b
    },
    sineaseOut:(t,b,c,d)=>{
        return c * ( ( t = t / d - 1) * t * t + 1 ) + b
    }
}
const Animate = function(dom){
    this.dom = dom;
    this.startTime = 0;
    this.startPos = 0;
    this.endPos = 0;
    this.propertyName = null;
    this.easing = null;
    this.duration = null;
}
Animate.prototype.start = function(propertyName,endPos,duration,easing){
    this.startTime = +new Date;
    this.startPos = this.dom.getBoundingClientRect()[propertyName];
    this.propertyName = propertyName;
    this.endPos = endPos;
    this.duration = duration;
    this.easing = tween[easing];
    let _self = this;
    let timeId = setInterval(function(){
        if(_self.step()===false){
            clearInterval(timeId);
        }
    },19)
}
Animate.prototype.step = function(){
    let t = +new Date;
    if(t >= this.startTime+this.duration){
        this.update(this.endPos);
        return false;
    }
    let pos  = this.easing(t - this.startTime, this.startPos, this.endPos - this.startPos, this.duration);
    this.update(pos);
}
Animate.prototype.update = function(pos){
    this.dom.style[this.propertyName] = pos + "px";
}
let div = document.getElementById('div');
let animate = new Animate(div);
animate.start('left', 500, 5000, 'sineaseOut');
//表单验证
let formStrategies = {
    isNonEmpty:(val,errMsg)=>{
        if(val==="") {
            return errMsg;
        }
    },
    minLength:(val,len,errMsg)=>{
        if(val.length<len){
            return errMsg;
        }
    },
    isMobile:(val,errMsg)=>{
        if(!/(^1[3|5|8][0-9]{9}$)/.test(val)){
            return errMsg;
        }
    }
}
const Validator = function(){
    this.cache = [];
}
Validator.prototype.add = function(dom, rules){
    let _self = this;
    for(let i=0,rule;rule=rules[i++];){
        (function(rule){
            let strategyAry = rule.strategy.split(":"),
                errorMsg = rule.errorMsg;
            _self.cache.push(function(){
                let strategy = strategyAry.shift();
                strategyAry.unshift(dom.value);
                strategyAry.push(errorMsg);
                return formStrategies[strategy].apply(dom, strategyAry);
            })
        })(rule)
    }
}
Validator.prototype.start = function(){
    for(let i=0,validatorFunc;validatorFunc = this.cache[ i++ ];){
        var msg = validatorFunc();
        if(msg){
            return msg;
        }
    }
}
var registerForm = document.getElementById('registerForm');
let validataFunc = (registerForm)=>{
    let validator = new Validator();
    validator.add(registerForm.userName,[{
            strategy:"isNonEmpty",
            errorMsg:"用户名不能为空"
        },{
            strategy:"minLength:6",
            errorMsg:"密码长度不能少于6位"
    }]);
    validator.add(registerForm.password,[{
        strategy:"minLength:6",
        errorMsg:"密码长度不能少于6位"
    }]);
    validator.add(registerForm.phoneNumer,[{
        strategy:"isMobile",
        errorMsg:"手机号码格式不正确"
    }]);
    let errMsg = validator.start();
    return errMsg;
}
registerForm.onsubmit = function(){
    let errMsg = validataFunc(registerForm);
    if (errorMsg){
        alert ( errorMsg );
        return false; 
    }
}
```
## 代理模式
### 定义
代理模式是为一个对象提供一个代用品或占位符，以便控制对它的访问。
### 应用场景
```
//虚拟代理实现图片预加载
let myImage = (function(){
    let imgNode = document.createElement("img");
    document.body.appendChild(imgNode);
    return {
        setSrc:function(src){
            imgNode.src = src;
        }
    }
})()
let proxyImage = (function(){
    let img = new Image;
    img.onload = function(){
        myImage.setSrc(this.src);
    }
    return {
        setSrc:function(src){
            myImage.setSrc("img/beijing.jpg");
            img.src = src;
        }
    }
})()
proxyImage.setSrc('//www.baidu.com/img/baidu_jgylogo3.gif');
//直接返回函数
let myImage = (function(){
    let imgNode = document.createElement("img");
    document.body.appendChild(imgNode);
    return function(src){
        imgNode.src = src;
    }
})()
let proxyImage = (function(){
    let img = new Image;
    img.onload = function(){
        myImage(this.src);
    }
    return function(src){
        myImage("img/beijing.jpg");
        img.src = src;
    }
})()
proxyImage('//www.baidu.com/img/baidu_jgylogo3.gif');
//虚拟代理合并http请求
let syncFile = function(id) {
    console.log("开始同步文件，id为：" + id);
}
let proxcySyncFile = (function(){
    let cache = [],
        timer = null;
    return function(id){
        cache.push(id);
        if(timer) {
            return;
        }
        timer = setTimeout(function(){
            syncFile(cache.join(","));
            clearTimeout(timer);
            timer = null;
            cache.length = 0;
        },2000);
    }
})()
//虚拟代理在惰性加载中的应用
let miniConsole = (function(){
    let cache = [],
        handler = function(ev){
            debugger
            if(ev.keyCode === 113) {
                let script = document.createElement("script");
                script.onload = function(){
                    for(let i=0,fn;fn=cache[i++];) {
                        fn();
                    }
                };
                script.src = "js/miniconsole.js";
                document.getElementsByTagName("head")[0].appendChild(script);
                document.body.removeEventListener("keydown",handler);
            }
        };
    document.body.addEventListener("keydown",handler,false);
    return {
        log:function(){
            let args = arguments;
            cache.push(function(){
                return miniConsole.log.apply(miniConsole,args);
            });
        }
    }
})()
miniConsole.log(11);
//miniconsole.js代码
miniConsole = {
    log:function(){
        console.log(Array.prototype.join.call(arguments));
    }
};
//缓存代理：为一些开销大的运算结果提供暂时的存储
const mult = function(){
    console.log("calculate...");
    let ret = 1;
    for(let i=0,l=arguments.length;i<l;i++){
        ret*=arguments[i];
    }
    return ret;
}
const proxyMult = (function(){
    let cache = {};
    return function(){
        let args = Array.prototype.join.call(arguments,",");
        if(args in cache) {
            return cache[args];
        }
        return cache[args] = mult.apply(this,arguments);
    }
})()
console.log(proxyMult(1,2,3,4,5));
console.log(proxyMult(1,2,3,4,5));
//创建缓存代理工厂
const createProxcyFactory = function(fn){
    let cache = {};
    return function(){
        let args = Array.prototype.join.call(arguments,",");
        if(args in cache){
            return cache[args];
        }
        return cache[args] = fn.apply(this,arguments);
    }
}
let multProxcy = createProxcyFactory(mult);
console.log(multProxcy(1,2,3,4,5,6));
console.log(multProxcy(1,2,3,4,5,6));
```
## 迭代器模式
### 定义
迭代器模式提供一种顺序访问一个聚合对象中的各个元素，而又不暴露该对象的内部表示。
### 场景
// 实现简易图片播放器
let imgPlayer = function(imgData, box) {
    let container = box && document.querySelector(box) || document,
    img = container.querySelector('img'),
    len = imgData.length,
    index = 0;
    img.src = imgData[0];

    var timer = null;

    return {
        first: function() {
            index = 0
            img.src = imgData[index]
        },
        last: function() {
            index = len - 1
            img.src = imgData[index]
        },
        pre: function() {
            if(--index > 0) {
                img.src = imgData[index]
            }else {
                index = 0
                img.src = imgData[index]
            }
        },
        next: function() {
            if(++index < len) {
                img.src = imgData[index]
            }else {
                index = len - 1
                img.src = imgData[index]
            }
        },
        play: function() {
            timer = setInterval(() => {
                if(index > len - 1) {
                    index = 0
                }
                img.src = imgData[index]
                index++
            }, 5000)
        },
        stop: function() {
            clearInterval(timer)
        }
    }
}

let player = new imgPlayer(imgData, '#box')
