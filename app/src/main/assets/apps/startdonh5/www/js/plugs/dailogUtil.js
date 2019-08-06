//消息会话框工具类,简单封装，具体可参考官方教程
// http://dev.dcloud.net.cn/mui/ui/#dialog

//警告框
/**
 *
 * @param msg
 *@param callback  传入方法 function(){}
 * 官方使用方法：
 * mui.alert('欢迎使用官方方法', '提示', function() {
					//TODO 这里是你要处理的事情
				});
 *
 */

function alertDailog(msg) {

    mui.alert(msg,"提示",null);


}
function alertDailog(msg,callback) {

    mui.alert(msg,"提示",callback);


}

/**
 * 消息确认框
 * @param msg
 * @param callback 传入带参数方法function(e){}
 * 官方使用方法：
 * var btnArray = ['否', '是'];
   mui.confirm('MUI是个好框架，确认？', 'Hello MUI', btnArray, function(e) {
					if (e.index == 1) {
						//TODO 1表示处理的‘是’这个按钮事件
					} else {
						//TODO 处理的‘否’这个按钮事件
					}
				})
 */
function confirmDailog(msg,callback) {
    mui.confirm(msg,"提示",['否', '是'],callback)
}


