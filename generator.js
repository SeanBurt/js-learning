function* helloGenerator() {
  yield "hello1";
  yield "hello2";
  return "hello3";
}
const helloGen = helloGenerator();
helloGen.next();

// yield表达式返回undefined，next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值。
function* numberGenerator() {
  for (let i = 0; true; i++) {
    console.log("i", i);
    if (yield i) {
      i = -1;
    }
  }
}
const numGen = numberGenerator();
numGen.next();
numGen.next();
numGen.next();
numGen.next(true);
numGen.next();

// for of循环可以自动遍历 Generator 函数运行时生成的Iterator对象
function* foo() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
  return 6;
}
const fooGen = foo();
for (let v of fooGen) {
  console.log(v);
}

// 抛出异常
function* gen(x) {
  try {
    var y = yield x + 2;
  } catch (e) {
    console.log(e);
  }
  return y;
}
let g = gen(1);
g.next();
g.throw("出错了");
