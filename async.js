/*
* async 返回值
*/
async function a () {
  return 1
}
console.log(a())
a().then((res)=>{console.log(res)})

/*
* await 获取返回值
*/
async function b () {
  return 2
}
(async () => {
  console.log(await b())
})()

/**
 * 多个异步事件调用
 */
const wait1 = () => {
    console.log('wait1')
}
const wait2 = () => {
    console.log('wait2')
}
const callWaiter1 = async () => {
    console.log('call waiter1 start')
    await wait1()
    await wait2()
    console.log('call waiter1 end')
}
const callWaiter2 = async () => {
    console.log('call waiter2 start')
    await wait1()
    await wait2()
    console.log('call waiter2 end')
}
(()=>{
  callWaiter1()
  callWaiter2()
  console.log('end')
})()

/**
 * 异步事件的捕获处理
 */
const waiter = async (isBusy) => {
  console.log('waiter start')
  if (isBusy) {
    return Promise.reject('waiter error')
  } else {
    return Promise.resolve('waiter end')
  }
}
const callWaiter = async (isErr) => {
  console.log('calll waiter start')
  await waiter(1)
    .then((info) => {
      console.log(info)
    })
    .catch((err) => {
      console.error(err)
    })
  if (isErr) {
    return Promise.reject('calll waiter error')
  } else {
    return Promise.resolve('calll waiter end')
  }
}
callWaiter(1)
    .then((info) => {
      console.log(info)
    })
    .catch((err) => {
      console.error(err)
    })

/*
* promise 异步处理
*/
const callWaiter = () => {
  console.log('call waiter start')
  return new Promise((resolve, reject) => {
    console.log('promise start')
    resolve('done')
    console.log('promise end')
  })
}
callWaiter().then((value) => {
  console.log(value)
}, (err) => {
  console.log(err)
})
console.log('call waiter end')
callWaiter().then((value) => {
  console.log(value)
}, (err) => {
  console.log(err)
})
console.log('call waiter end')

// promise callstack
new Promise(resolve => {
  resolve(8)
}).then(t => {console.log(t)})
new Promise(resolve => {
  resolve(1)
  Promise.resolve().then(() => {console.log(2)})
  Promise.resolve().then(() => {console.log(5)})
  window.setTimeout(()=>{console.log(7)}, 0)
  console.log(4)
}).then(t => console.log(t)).then(() => {console.log(6)})
console.log(3)
