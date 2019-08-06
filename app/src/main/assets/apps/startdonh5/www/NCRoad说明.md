该项目构建采用了H5技术<br/>
项目引入js插件有<br/>
**jquery-1.10.2.min.js**<br/>
**mui.js** <br/>
**mui.min.js** <br/>
**mui.picker.min.js** 这是选择器使用的js<br/>
项目引入css有<br/>
**mui.css**<br/>
**mui.min.css**<br/>
**mui.picker.min.css** 这是选择器的样式<br/>
静态界面布局遵循<br/>
头部使用`<header class="mui-bar mui-bar-nav">`<br/>
底部使用`<nav class="mui-bar mui-bar-tab">`<br/>
中间`<div class="mui-content">`<br/>
如果对mu 不了解的可以参考官方说明文档<br/><br/>
http://dev.dcloud.net.cn/mui/ui/<br/>
另外再着两个插件外该项目引入了一个简单登录界面，
已经完全能够使用，具体可用查看login/login.html。<br/>
同时还具有相应的工具包：<br/>
**localStorageUtil.js**<br/>
保存数据工具<br/>
**utilAjax.js**<br/>
Ajax请求网络工具<br/>
**watingUtil.js**<br/>
消息等待框<br/>
web：`<div id="progressbar" class="mui-progressbar mui-progressbar-infinite">
        <span></span>
    </div>`<br/>
    和<br/>
`      <button id='login' type="button" data-loading-text="登录中" class="mui-btn mui-btn-block mui-btn-primary">登录</button>`
<br/>进行控制消息等待状态（查看html）<br/>
移动端，通过js直接控制显示<br/>
渲染空界面可以在html中添加<br/>
`<div class="mui-loading">`<br/>
`    <div class="mui-spinner">`<br/>
`    </div>`<br/>
`</div>`<br/>
进行渲染<br/>
**StringUtil.js**<br/>
判断数据是否为空的工具类<br/>
**dailogUtil.js**<br/>
消息对话框工具<br/>



