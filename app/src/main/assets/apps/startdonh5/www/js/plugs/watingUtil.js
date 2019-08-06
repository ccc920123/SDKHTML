//主要封装手机端的一部分样式
(function ($, doc) {

    // 表示手机才会进来的方法

    mui.init({
        statusBarBackground: '#0f41f7'
    });
    //开启消息提示框
}(mui, document));


//消息等待框
//isShow ,开启或者关闭  true 打开，false 关闭
//btn提交按钮控件
//progressbar 顶端进度条的控件，一般加载 pc web显示使用
function waiting(isShow, btn, progressbar) {
    // 只有手机端盖才会进入该方法（plusReady）
    mui.plusReady(function (isShow) {
        //系统消息等待框
        var nwaiting;
        if (isShow == true) {
            nwaiting = plus.nativeUI.showWaiting();
        } else {
            if (isEmpty(nwaiting) == false)
                nwaiting.closeWaiting();
        }
        return
    });

    if (isEmpty(btn) == false) {
        //先判断btn是不是我们指定的按钮类型
        var btnclass = btn.attr("class");
        if (btnclass.indexOf("mui-btn") != -1) {
            if (isShow == true) {
                mui(btn).button('loading');
            } else {
                mui(btn).button('reset');
            }
        }
    }
    if (isEmpty(progressbar) == false) {
        var progressbarclass = progressbar.attr("class");
        if (progressbarclass.indexOf("mui-progressbar") != -1) {
            if (isShow == true) {
                progressbar.show();
            } else {
                progressbar.hide();
            }
        }
    }
}

function isEmpty(obj) {
    if (typeof obj == "undefined" || obj == null || obj == "") {
        return true;
    } else {
        return false;
    }
}