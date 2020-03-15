// 布尔
let isDone: boolean = false;
let createdByNewBoolean: Boolean = new Boolean(1);
console.log(isDone, createdByNewBoolean);

// 数值
let decLiteral: number = 6;
let notANumber: number = NaN;
let infinityNumber: number = Infinity;

// 字符串
let myName: string = "Tom";
let sentence: string = `Hello, my name is ${myName}.
Nice too meet you.`;

// 空值
function alertName(): void {
  alert(" my name is Tom");
}
let unusable: void = undefined;

// Null 和 undefined
let u: undefined = undefined;
let n: null = null;
let num: number = undefined;

// 任意值
let myFavoriteNumber: any = "seven";
myFavoriteNumber = 7;
let something;
something = "sevent";
something = 7;

// 联合类型
let myNumber: string | number = "seven";
myNumber = 7;

// 对象的类型-接口
interface Person {
  name: string;
  age: number;
}
let tom: Person = {
  name: "Tom",
  age: 18
};
interface ParentPerson {
  readonly id: number;
  name: string;
  age?: number;
  [propName: string]: any;
};
let joy: ParentPerson = {
  id: 0,
  name: "Joy",
  age: 16,
  gender: "womale"
}

// 数组的类型
let fibonacci: number[] = [1, 1, 2, 3, 5];
let fibonacciArray: Array<number> = [1, 1, 2, 3, 5];
interface NumberArray {
  [index: number]: number;
}
let fibonacciNumberArray: NumberArray = [1, 1, 2, 3, 5];
let list: any[] = ['xcatliu', 25, { website: 'http://xcatliu.com' }];

// 函数的类型
function sum(x: number, y: number): number {
  return x + y;
}
let sumFunc = function(x: number, y: number): number {
  return x + y;
}
let mySum: (x: number, y: number) => number = function(x: number, y: number): number {
  return x + y;
}
function buildName(firstName?: string, lastName: string = "Cat") {
  return firstName ? `${firstName} ${lastName}` : lastName;
}
function push(ary: number[], ...items: Array<number>) {
  items.forEach(item => {
    ary.push(item);
  })
}
let a = [];
push(a, 1, 2, 3);
function reverse(x: number | string): number | string {
  if (typeof x === "number") {
    return Number(x.toString().split("").reverse().join(""));
  } else if (typeof x === "string") {
    return x.split("").reverse().join("");
  }
}

// 类型断言
function getLength(something: string | number): number {
  if ((something as string).length) {
    return (something as string).length;
  } else {
    return something.toString().length;
  }
}
console.log(getLength('hello'));
console.log(getLength(567890));
