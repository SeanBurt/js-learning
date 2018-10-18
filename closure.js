function func () {
  for (var i = 0; i < 5; i++) {
    setTimeout(function(){
      console.log(i)
    },0)
  }
}
func()

function func1 () {
  for (var i = 0; i < 5; i++) {
    setTimeout(function(){
      console.log(i)
    }(i),0)
  }
}
func1()

function func2 () {
  for (let i=0; i<5; i++) {
    setTimeout(()=>{
      console.log(i)
    }, 0)
  }
}
func2()

function func3 () {
  for (var i=0; i<5; i++) {
    (function (i) {
      setTimeout(()=>{
        console.log(i)
      }, 0)
    })(i)
  }
}
func3()
