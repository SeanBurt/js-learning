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
