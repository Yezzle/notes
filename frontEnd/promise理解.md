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
  
  then()方法接受两个参数，第一个处理resolve,第二个处理reject
  ```javascript
    const resolve = (res)=>{
      setTimeout(()=>{
        console.log(res);
      },1000)
    }
    const reject = ()=>{
      console.log('rejected')
    }
    get(url).then(resolve,reject)
  ```
  也可以只传一个参数处理resolve,然后在.catch()中处理reject:<code>get(url).then(resolve).catch(reject)</code><br>
  这样在请求收到响应之后1秒后会打印响应,这是两个连续的异步调用。<br><br>如果这样写会怎样呢：
  ```javascript
   ...
   get(url).then(resolve,reject).then(resole)
  ```
  其实这样并不会是想象中的 先打印请求响应然后过一秒再打印undefined.接下来改造一下resolve
  ```javascript
  const resolve = (res)=>{
    return new Promise((r,j)=>{
       setTimeout(()=>{
          console.log(res);
        },1000)
      }
    })
     
  ```
     
