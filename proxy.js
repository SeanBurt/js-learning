let obj = {};
let objProxy = new Proxy(obj, {
  get(target, propKey, receiver) {
    console.log(`getting ${propKey}!`);
    return Reflect.get(target, propKey, receiver);
  },
  set(target, propKey, value, receiver) {
    console.log(`setting ${propKey}!`);
    return Reflect.set(target, propKey, value, receiver);
  }
})
objProxy.count = 1;
console.log(objProxy.count);

// 自定义校验
function createValidator(target, validator) {
  return new Proxy(target, {
    _validator: validator,
    set(target, propKey, propValue, receiver) {
      if (target.hasOwnProperty(propKey)) {
        let validator = this._validator[propKey];
        if (!!validator(propValue)) {
          return Reflect.set(target, propKey, propValue, receiver);
        } else {
          throw Error(`${propKey} is not a valid property!`);
        }
      }
    }
  });
}
const personValidators = {
  name(val) {
    return typeof val === "string";
  },
  age(val) {
    return typeof val === "number";
  }
}
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    return createValidator(this, personValidators);
  }
}
const mike = new Person('mike', 18);
console.log(mike.name, mike.age);
mike.age = "20";
