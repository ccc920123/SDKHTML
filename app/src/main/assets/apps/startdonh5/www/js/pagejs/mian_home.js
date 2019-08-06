$(function () {
    //得到登录的数据
    var userInfo = sava.getLocalData("settings");

    if (userInfo != "{}") {
        mui.toast(userInfo.account);
    }
    alertDailog("我测试这个是否显示")


    var data = [{value: "1", text: "item1"},
        {value: "2", text: "item2"},
        {value: "3", text: "item3"},
        {value: "4", text: "item4"},
    ]
    //初始化选择器
    var picker = new mui.PopPicker();


    $("#showUserPicker").click(function () {
        //设置数据
        picker.setData(data);
        picker.show(function (getSelectedItems) {
            console.log(getSelectedItems);
            console.log(getSelectedItems[0].text);
        })

    });


});