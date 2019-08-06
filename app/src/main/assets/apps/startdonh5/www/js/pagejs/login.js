$(function () {
    preload();

    function preload() {
        //关闭等待进度条
        waiting(false, "", $("#progressbar"));
        var menu_style = {
            left: "-70%",
            width: '70%',
            popGesture: "none",
            render: "always"
        };

        if (mui.os.ios) {
            menu_style.zindex = -1;
        }
        //可以进行预加载模式
        // mui.preload({
        //     url:new-page-url,
        //     id:new-page-id,//默认使用当前页面的url作为id
        //     styles:{},//窗口参数
        //     extras:{}//自定义扩展参数
        // });

    }

    var settings = sava.getLocalData("settings");
    var state = sava.getLocalData("state");

    var loginButton = $("#login");
    var accountBox = $("#account");
    var passwordBox = $("#password");
    var autoLoginButton = $("#autoLogin");
    var class1 = autoLoginButton.attr("class");
    if (settings != "{}") {
        accountBox.val(settings.account);
    }
    if (state == true) {

        class1 = class1.concat(" mui-active")
        autoLoginButton.attr("class", class1);
        if (settings != "{}") {
            passwordBox.val(settings.password);
        }
    } else {
        class1 = class1.replace(" mui-active", "");
        autoLoginButton.attr("class", class1);
    }


    loginButton.click(function () {
        //测试跳转
        mui.openWindow({
            url: '../main.html',
            extras: {
                name: 'mui' //扩展参数
            },
            waiting: {
                autoShow: true, //自动显示等待框，默认为true
                title: '正在加载...', //等待对话框上显示的提示内容
            }
        });
        //开启登录按钮等待图案
        waiting(true, loginButton, $("#progressbar"));
        var loginInfo = {
            account: accountBox.val(),
            password: passwordBox.val()
        };
        sava.setLocalData("settings",loginInfo);

        //开始亲请求数据
        doPost("URL", loginInfo, function (response) {

            if (response.success == true) {

            } else {
                mui.toast('登陆失败', {
                    duration: 'short',
                    type: 'div'
                })
            }
            //关闭登录按钮等待图案,//close等待进度条
            waiting(false, loginButton, $("#progressbar"));


        });

    });
    // 记录是否记住账户
    autoLoginButton.click(function () {
        var cl = autoLoginButton.attr("class");
        if (cl.indexOf("mui-active") == -1) //表示没有这个
        {
            autoLoginButton.attr("class", "mui-switch");
            sava.setLocalData("state",false);
        } else {
            sava.setLocalData("state",true);
            class1 = class1.concat(" mui-active");
            autoLoginButton.attr("class", class1);
        }

    });

});
