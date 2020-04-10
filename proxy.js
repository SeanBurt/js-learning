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

// Object.defineProperty()
const object1 = {};
Object.defineProperty(object1, "property1", {
  value: 42,
  writable: false
})
console.log(object1.property1);
object1.property1 = 72;
console.log(object1.property1);

var o = {};
Object.defineProperty(o, "a", {
  value: 37,
  writable: true,
  enumerable: true,
  configurable: true
});
console.log(o.a);

var bValue;
Object.defineProperty(o, "b", {
  get() {
    return bValue;
  },
  set(newValue) {
    bValue = newValue;
  },
  configurable: true,
  enumerable: true
})
console.log(o.b);
bValue = 38;
console.log(o.b);

function Archiver() {
  var temperature = null;
  var archive = [];
  
  Object.defineProperty(this, "temperature", {
    get() {
      console.log("get");
      return temperature;
    },
    set(value) {
      temperature = value;
      archive.push({val: temperature});
    }
  });
  this.getArchive = function() { return archive; };
}

var arc = new Archiver();
arc.temperature = 11;
console.log(arc.temperature);
arc.temperature = 12;
console.log(arc.temperature, arc.getArchive());
