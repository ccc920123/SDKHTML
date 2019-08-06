/**
 *标题：ajax封装
 *说明:
 * GET/POST/PUT/DELETE
 * GET：查询资源
 * POST:创建资源
 * PUT：更新资源
 * DELETE：删除资源
 */


/**
 * GET：查询资源
 * @param url
 * @param data
 * @param callback
 */
function doGet(url, data, callback) {
    doRequest('GET', url, data, callback);
}

/**
 * POST:创建资源
 * @param url
 * @param data
 * @param callback
 */
function doPost(url, data, callback) {
    doRequest('POST', url, data, callback);
}

/**
 * PUT：更新资源
 * @param url
 * @param data
 * @param callback
 */
function doPut(url, data, callback) {
    doRequest('PUT', url, data, callback);
}

/**
 * DELETE：删除资源
 * @param url
 * @param data
 * @param callback
 */
function doDelete(url, data, callback) {
    doRequest('DELETE', url, data, callback);
}

/**
 * GET/POST/PUT/DELETE
 * @param type
 * @param url
 * @param data
 * @param callback
 */
function doRequest(type, url, data, callback) {

    $.ajax({
        type: type,
        async : true,
        url: '/ncroad' + url,
        cache:false,
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        },
        data: data,
        dataType: 'json',
        success: function (response) {
            callback(response);
        },
        error:function (response) {
            console.log(response);
        },
        complete: function(XMLHttpRequest, textStatus) {
                // 通过XMLHttpRequest取得响应头，sessionstatus
            var sessionstatus = XMLHttpRequest.getResponseHeader("sessionstatus");
            if (sessionstatus == "TIMEOUT") {
                var win = window;
                while (win != win.top){
                    win = win.top;
                }
                win.location.href= XMLHttpRequest.getResponseHeader("CONTEXTPATH");
            }
        }
    });
}

/**
 * 通过URL跳转时，有数据传递解析数据编码
 */
function GetRequest() {
    var url =decodeURI(decodeURI(location.search)); //获取url中"?"符后的字串，使用了两次decodeRUI解码
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
        return theRequest;
    }
}
/**
 * 使用indexOf判断元素是否存在于数组中
 * @param {Object} arr 数组
 * @param {Object} value 元素值
 */
function isInArray3(arr,value){
    return $.inArray(value,arr)>-1;
}
/**
 * 数据为空时，展示的数据为 -
 */
function nullData(value) {
    if (value === undefined || value === null || value === '' || value === 'null' || value === 'NULL'){
        value = '--';
    }else {
        //不做处理
    }
    return value;
}

/**
 * 数据为空时，展示的数据为 ''
 */
function nullData1(value) {
    if (value === undefined || value === null || value === '' || value === 'null' || value === 'NULL'){
        value = '';
    }else {
        //不做处理
    }
    return value;
}
/**
 * 数据为空时，展示的数据为 0
 */
function nullData2(value) {
    if (value === undefined || value === null || value === '' || value === 'null' || value === 'NULL'){
        value = '0';
    }else {
        //不做处理
    }
    return value;
}

/**
 * 判断数据是否不为空
 */
function isNotEmpty(value) {
    if (value === undefined || value === null || value === '' || value === 'null') {
        return false;
    }else{
        return true;
    }

    }

/**
 * 获取当前时间，格式YYYY-MM-DD
 */
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

/**
 * 将数据库取出的时间格式化
 * time 形如 "2018-05-19T08:04:52.000+0000"
 */
function getFormateDate(time) {
    var date = new Date(time);
    var times = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    return times;
}

window.console = window.console || (function () {
    var c ={};
    c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile= c.clear = c.exception = c.trace = c.assert = function(){};
    return c;
})();

