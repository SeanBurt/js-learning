// prototype inherit
function Point(x, y) {
  this.x = x
  this.y = y
}
Point.prototype.toString = function () {
  return '(' + this.x + ',' + this.y + ')'
}
var point1 = new Point(2, 3)
console.log(point1.toString())
// syntactic sugar
console.log(typeof Point)

// 定义了一个空的类Point，JavaScript 引擎会自动为它添加一个空的constructor方法。
// constructor方法默认返回实例对象（即this），完全可以指定返回另外一个对象。
class Woo {
}
console.log(new Woo() instanceof Woo)
class Foo {
  constructor() {
    return Object.create(null)
  }
}
console.log(new Foo() instanceof Foo)

// static method
// 类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”
class Foo {
  static classMethod() {
    return 'hello'
  }
}
Foo.classMethod() // 'hello'
var foo = new Foo()
foo.classMethod()  // TypeError: foo.classMethod is not a function

// 与 ES5 一样，在“类”的内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。
class MyClass {
  constructor() {
  }
  get prop() {
    return 'getter'
  }
  set prop(value) {
    console.log('setter: '+value)
  }
}
let inst = new MyClass();
inst.prop = 123;  // setter: 123
inst.prop  // 'getter'

// 类的实例属性: 类的实例属性可以用等式，写入类的定义之中。
class MyClass {
  myProp = 42;
  constructor() {
    console.log(this.myProp); // 42
  }
}

// 类的静态属性
class MyClass {
  static myStaticProp = 42;
  constructor() {
    console.log(MyClass.myStaticProp); // 42
  }
}

/*  implement class  */
class Person {
  constructor () {
    this.sex = 0
  }
  say (word) {
    console.log(word)
  }
}
let p = new Person()
console.log(p.sex)
p.say('hello')
/*  class inherit  */
class Man extends Person {
  constructor () {
    // call parent class constructor
    super()
    this.sex = 1
  }
}
let m = new Man()
console.log(m.sex)
