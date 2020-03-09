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
