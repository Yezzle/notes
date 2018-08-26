(function(global){

    //这是一个简单播放器的原生js封装，很多功能只是设想但并未实现，这里只是一个框架思路
    //功能：可实现播放器任意位置，播放器自定义样式，传入ulr资源路径，播放控制
    //设置默认值
    var defaultes = {
        audioUrl : "",  //播放文件资源路径
        nodeID : "",  //播放器插入的节点
        boxStyel : "",  //可设置播放器样式（未实现）
        bottonSrc : "",  //可设置按钮样式(未实现)
        //模板html 
        htmls :` <audio autoplay loop style="width: 10px">  
                    <source src="" type="audio/mpeg">
                </audio>
                <a style="width: 24px;height: 24px;background: gold;display:inline-block"></a>
                <select style="vertical-align: top">
                    <option value="kldykxq">克罗地亚狂想曲</option>
                    <option value="totwfg">The one tty whereg</option>
                </select>`
    }

    /**
     * 用户启动播放的接口
     * @param {*} options 传入一个对象，格式以上面{defauls}对象位置准 
     */
    var plugCode = function(options){
        var settings = Object.assign({},defaultes,options);  //引用用户传入的设置
        
        var audioDOM = document.getElementById(settings.nodeID);  //拿到要插入的节点node
        if(!audioDOM) audioDOM = document.body;  //否则就插入到body里面
  
        var audioBOX = document.createElement("div");  //播放器的最外层div
        audioBOX.id = "myMusicePlayer";  //设置最外层div的id
        audioBOX.style = "top: 10px;left: 20px;opacity: 0.5;overflow: hidden;"  //播放器样式
        audioBOX.innerHTML = settings.htmls;  
        audioDOM.appendChild(audioBOX); //添加到用户指定id节点

        var audioPlay = audioBOX.querySelectorAll("audio")[0]; //拿到操作的节点dom
        var backSrc = audioBOX.querySelectorAll("a")[0];
        var sourceSelector = audioBOX.querySelectorAll("select")[0];

        audioPlay.src = settings.audioUrl;  //设置默认的播放资源（这时已经开始播放了）
        var func = {
            play:function () {
                audioPlay.play(); //播放
            },
            pause:function () {
                audioPlay.pause();  //暂停
            }
        }

        /**
         * 点击事件
         */
        function handleClick() {
            if (this.state) {
                func.play();
                this.state = false;
            }else{
                func.pause();
                this.state = true;
            }
        }

        backSrc.addEventListener("click",handleClick);  //使用原生js添加点击事件

        /**
         * 实现微信进入自动播放
         */
        if (navigator.userAgent.toLocaleLowerCase().match(/micromessenger/i)) {
            document.addEventListener("WeiXinJSBridgeReady",function onBridgeReady() {
                WeixinJSBridge.invoke("getNetworkType",{},function (e) {
                    func.play();
                })
            }
        )}; //end if

    }; // end plugCode

    global.myMusicPlayer = plugCode;  //挂载到window对象下面共用户使用


})(typeof window === 'undefined'?this:window); //闭包运行