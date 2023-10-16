```js
// js 调用安卓方法
WebViewJavascriptBridge.callHandler(事件名, 参数, (data)=>{})

// 未分配事件名发送
window.WebViewJavascriptBridge.send(data, callback)
// 未分配事件名让java发送到js
window.WebViewJavascriptBridge.init((message, responseCallback)=>{
   // message 是java发送过来的数据
   responseCallback({ title: 'hhhh' })                                 
})

// js定义方法 给java调用
WebViewJavascriptBridge.registerHandler(事件名, (data, responseCallback)=>{
	responseCallback('123')                                        
})

// 检测是否有全局对象
if(window.WebViewJavascriptBridge) {
    // todo
} else {
    document.addEventListener('WebViewJavascriptBridgeReady', function(){
        // todo
    })
}
```

[github地址](https://github.com/lzyzsd/JsBridge)

## 调试工具

1. vConsole 第三方包
2. chrome://inspect/#devices 谷歌浏览器调试（如果显示404，开启科学上午嗷）[链接](https://www.jianshu.com/p/c778fa62fdc2)