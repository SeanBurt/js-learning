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
