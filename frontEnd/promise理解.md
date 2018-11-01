## Promise的个人理解

### 1. 创建Promise对象
```javascript
  new Promise((resolve,reject)=>{
    setTimeout(()=>{
      console.log('一秒时间到了')
       if (typeof want == 'function') {  //want就是你传的一个要搞事情的函数 跟回调一样的
            resolve(want);
        } else {
            reject('TypeError: '+ want +'不是一个函数')
        }
    },1000)
  })
```
&nbsp;&nbsp;就像上面将要执行的异步操作封装成一个promise对象，这样你就可以通过promise对象直接传入一个回调函数：<br>&nbsp;&nbsp;&nbsp;&nbsp;<code>.then(()=>{\/\*do something\*\/})</code>
<br>&nbsp;&nbsp;这时如果想在回调函数里面搞些异步的事情并且传递参数，请看.then()的用法
  
  ### 2. .then()用法
  
