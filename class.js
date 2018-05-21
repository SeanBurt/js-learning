// prototype inherit
function Point(x, y) {
  this.x = x;
  this.y = y;
}
Point.prototype.toString = function () {
  return '(' + this.x + ',' + this.y + ')';
};
var point1 = new Point(2, 3);
console.log(point1.toString());

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
