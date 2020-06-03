// 原型链继承
function SuperType () {
  this.property = true;
}
SuperType.prototype.getSuperValue = function () {
  return this.property;
};
function SubType () {
  this.subproperty = false;
}
SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;
SubType.prototype.getSubValue = function () {
  return this.subproperty;
};
let instance = new SubType();
console.log(instance.getSuperValue());

// 借用构造函数继承
function Person (name) {
  this.name = name;
}
function Student (name) {
  Person.call(this, name);
}
let p = new Person('li si');
let s1 = new Student('li xiao ming');
let s2 = new Student('li xiao ai');
console.log(p.name);
console.log(s1.name);
console.log(s2.name);

// 组合继承
function Animal (name) {
  this.name = name;
}
Animal.prototype.action = function () {
  console.log(`${this.name} move...`);
}
function Dog (name) {
  Animal.call(this, name);
}
Dog.prototype = new Animal();
Dog.prototype.run = function () {
  console.log(`${this.name} run...`);
}
let animal = new Animal('animal');
let dog1 = new Dog('er ha');
animal.action();
dog1.action();
dog1.run()

// 原型式继承
function createObj(obj) {
  function F() {}
  F.prototype = obj;
  return new F();
}
let o = {a: 1, b: 2};
console.log(createObj(o).a);

// 寄生式继承
function createAnother(o) {
  let clone = Object(o);
  clone.sayHi = function() {
    console.log("Hi");
  }
  return clone;
}
let o = {a: 1, b: 2};
createsAnother(o).sayHi();

// 寄生组合式继承
function inheritPrototype(subType, superType){
  let prototype = Object.create(superType.prototype); // 创建对象，创建父类原型的一个副本
  prototype.constructor = subType;                    // 增强对象，弥补因重写原型而失去的默认的constructor 属性
  subType.prototype = prototype;                      // 指定对象，将新创建的对象赋值给子类的原型
}
// 父类初始化实例属性和原型属性
function SuperType(name){
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function(){
  alert(this.name);
};
// 借用构造函数传递增强子类实例属性（支持传参和避免篡改）
function SubType(name, age){
  SuperType.call(this, name);
  this.age = age;
}
// 将父类原型指向子类
inheritPrototype(SubType, SuperType);
// 新增子类原型属性
SubType.prototype.sayAge = function(){
  alert(this.age);
}
let instance1 = new SubType("xyc", 23);
let instance2 = new SubType("lxy", 23);
instance1.colors.push("2"); // ["red", "blue", "green", "2"]
instance1.colors.push("3"); // ["red", "blue", "green", "3"]
