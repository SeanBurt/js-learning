//example 1
try{
  console.log('try start')
  throw new Error('test error')
}catch(ex){
  console.error('inner',ex.message)
}finally{
  console.log('try end')
}

//example 2
(()=>{
    try{
      console.log('try start')
      throw new Error('test error')
      return 'try'
    }catch(ex){
      console.error('inner',ex.message)
      return 'catch'
    }finally{
      console.log('try end')
    }
})()

//example 3
(()=>{
    try{
      console.log('try start')
      throw new Error('test error')
      return 'try'
    }catch(ex){
      console.error('inner',ex.message)
      return 'catch'
    }finally{
      console.log('try end')
      return 'finally'
    }
})()
