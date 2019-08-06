# SDK5Html
# 一个HTML5 打包成Android apk 的框架，在使用该框架前你得有一点Android 开发基础，因为该框架需要使用Android studio 工具进行打包。
![Image text](https://github.com/ccc920123/SDKHTML/blob/master/image/GIF.gif)
如果你在使用该框架打包时，你已经开发出了web 端盖的程序，已经部署在服务器上
并且已经运行起来了，你可以使用本框架的http、https 的方式
来实现打包。
如果你有一个离线的，静态的html，你可以采用本框架进行内部集成，
并且打包成Android apk。
<br/>
<br/>
<br/>
<br/>
在使用本框架你会用到一些官方文档，请查看以下：<br/>

HBuilder : <br/>
**http://www.dcloud.io/**  <br/>
官方号称可以编写一套代码就能运行多个程序端。
<br/>
在该框架中只支持  5+Runtime 和 MUI 这2个实际上就是我们所知道的HTML5 和一个前端框架(MUI)。<br/>
<br>
MUI:
<BR>
**http://dev.dcloud.net.cn/mui/ui/**
<BR>
![Image text](https://github.com/ccc920123/SDKHTML/blob/master/image/zc0001.png)
<br>
更多开发问题请参考开发官网HBuilder
<br><br><br>
 框架打包APK:
 
 <BR>
 
# 1. 将HTML 直接打包到apk内
 
 **HTML 打包在内部注意：**
 <br>
 1.1 在我们的框架中大家可以看到 assets 文件这里面就是存放的是html 的资源。
 <br>
 html内部打包一定要按照 **apps--->xxxx（你随意的名）--->www** 建立你的项目否则
 内部打包成apk 不能实现。
 <br>
 在本次框架中我已给出简单的html实例，蛋酒可以查看html 中的**NCRoad说明.md** 文档
 <br>
 1.2 接下来就是 m**anifest.json** 文件 该文件我们要注意 以下：
    <br>
    
    ` "id": "startdonh5",`  这里必须和你的apps的下一包目录相同 ‘xxxx（你随意的名）’这里
     "launch_path": "http://www.stardon.cn",   这是你程序启动的地址 可以是http,https或者实际的html路径
 <br>
 
 1.3 大家还会看见与apps 平行的目录还有个data 目录，这个目录的作用是当
 运行程序时出现错误时出来程序的界面，简单的说它就是个错误提示的界面。
 在这个界面我们需要注意 dcloud_control.xml 这是错误界面的配置界面。
 里面的
 <br/>
 
         <app appid="startdonh5" appver="1.0.0"/>
 <br/>
  appid 要与 manifest.json 中的 id 一致  appver 要与 manifest.json  version 下的name 一致。
  
  好了，到这里就将html直接打包到内部的方式配置已经说完了，现在来说说怎么启动我们
  准备好的程序呢
  
  在该框架demo中我们都知道程序入口需要看 **AndroidManifest.xml**
  <br>
  **AndroidManifest.xml** 需要 application 节点下添加
  
`  android:name=".NCRoadApplication"`  这是必须的不管你使用那种方式集成都需要这句
 
 
 `<activity 
          android:name="io.dcloud.PandoraEntry" 
          android:configChanges="orientation|keyboardHidden|keyboard|navigation" 
          android:hardwareAccelerated="true" 
          android:launchMode="singleTask" 
          android:screenOrientation="user" 
          android:theme="@style/TranslucentTheme" 
          android:windowSoftInputMode="adjustResize"> 
          <intent-filter> 
          <action android:name="android.intent.action.MAIN" /> 
          <category android:name="android.intent.category.LAUNCHER" /> 
          </intent-filter> 
          </activity> `
  <br>其中io.dcloud.PandoraEntry 时5+sdk 的首页 你可以自己修改成你的启动界面，大家可以看见，
  <br>我的SDK_WebApp.java 是我自定义的启动界面   .  
     
     
 通过以上我想你的程序已经可以运行了，不过这里运行时采用PandoraEntry 为启动界面。不能修改首页样式 <br>
 
 如果有需求要修改 首页启动样式，请采用 SDK_WebApp  页面为启动界面。
 在设置这个未启动界面时，我们就开始接着看下面的
 
 #自定义启动界面，修改访问地址的方法。
 
 前面简单的已经说完，接下来就是重要的了，
 在使用SDK_WebApp作为启动界面时我们要注意SDK_WebApp界面代码中的几个地方
 在SDK_WebApp 类中的内部类**WebviewModeListener** 中大家注意：
 1.
 
`  View view = activity.getLayoutInflater().inflate(R.layout.activity_ncrmain, null);`

<br><br>
大概在165 行，这里加载了一个layout  这个布局就是我们自定义的，我们可以修改这里面的布局来实现自定义启动首页，包括我
在首页做了一个参数设置的入口。
2.

继续看重新的 onCoreInitEnd  方法中有个<br><br>

` webview = SDK.createWebview(activity, url, appid, new IWebviewStateListener() {}`

大家注意这个方法 中的url 与appid  这2个参数很重要 。
<br><br>
url ： 是你要传的访问地址，可以是http，https  也可以是你的assets 下的html 页面
<br>
appid  :就是你的**apps--->xxxx（你随意的名）--->www**  中的xxxx（你随意的名） 
如果你url 使用http，https 的地址，那么这里的appid 请使用：<br>

`UUID.randomUUID().toString()`


<br>
否则他会去直接找你本地的anifest.json 文件下的launch_path 配置的地址

<br>
好了本次的说明就到处结束，直接下载本框架或者demo 可以直接运行看看效果吧
<br>
如果有什么问题请在留言。