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
