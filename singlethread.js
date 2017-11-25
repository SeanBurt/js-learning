//example 1
setTimeout(()=>{
  console.log('timer start')
},0)
new Promise((resolve)=>{
  console.log('for loop start')
  for(let i=0;i<10000;i++){
    i===99 && resolve()
  }
}).then(()=>{
  console.log('then function start')
})
console.log('code execute end')

//example 2
setTimeout(()=>{
  setTimeout(()=>{
    console.log('timer 1')
  },0)
},0)
setTimeout(()=>{
  setTimeout(()=>{
    console.log('timer 2')
  },0)
})
new Promise((resolve)=>{
  setTimeout(()=>{
    resolve()
  },0)
}).then(()=>{
  console.log('timer 3')
})
console.log('code end')

//example 3
console.log('code start')
setTimeout(()=>{
  setTimeout(()=>{
    console.log('timer 1')
  },0)
},0)
setTimeout(()=>{
  setTimeout(()=>{
    console.log('timer 2')
  },0)
})
new Promise((resolve)=>{
  console.log('promise start')
  resolve()
  console.log('promise end')
}).then(()=>{
  setTimeout(()=>{
    console.log('timer 3')
  })
})
console.log('code end')

//example 4
new Promise((resolve)=>{
  console.log('promise start')
  say(hello);
  resolve();
}).then(()=>{
  console.log('promise end')
})
function say(fn){console.log('say');fn()}
function hello(){console.log('hello')}

