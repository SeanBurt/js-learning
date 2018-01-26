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
