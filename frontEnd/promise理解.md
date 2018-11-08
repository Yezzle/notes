## Promise的个人理解

### 1. 创建Promise对象
  在new Promise()对象的时候其实Promise里面的状态就已经开始了:pending => resolved/rejected
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
&nbsp;&nbsp;就像上面将要执行的异步操作封装成一个promise对象,我们使用的第三方请求库fetch,axios等都是这样封装ajax请求的,这样你就可以通过promise对象直接传入一个回调函数：<br>&nbsp;&nbsp;&nbsp;&nbsp;<code>.then(()=>{\/\*do something\*\/})</code>
<br>&nbsp;&nbsp;这时如果想在回调函数里面搞些异步的事情并且传递参数，请看.then()的用法
  
  ### 2. Promise.then()用法
  
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
  输出结果是这样的：打印请求响应res同时打印undefined.因为请求结束时后面两个resolve都是同步调用的，而第一个resolve并没有办法将定时器中的返回值传给第二个resolve，但是可以直接返回res传给下一个.then回调函数,但是我们就是要返回一个异步的结果怎么办呢<br><br>
  接下来改造一下resolve
  ```javascript
  ...
  const resolve = (res)=>{
    return new Promise((r,j)=>{
       setTimeout(()=>{
          console.log(res);
          r(res)
        },1000)
      }
    })
   ...
  ```
  再执行一次链式调用可以看到：<br>
  请求完成后先打印res 一秒之后再次答应res<br>
  这样就实现了我们的异步链式调用<br>
  
  数据传递总的来说就是resolve/reject函数的返回值的转递
  
  ### 3. Promise.resovle()
  
  Promise.resolve()的作用其实就是将传入的对象转化成promise，如果传入一个对象，则返回一个对象，
  
