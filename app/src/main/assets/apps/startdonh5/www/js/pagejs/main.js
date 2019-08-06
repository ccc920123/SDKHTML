$(function () {
    var page = [
        {
            url: "../html/main_home.html",//子页面HTML地址，支持本地地址和网络地址
            id: "mainhome",//子页面标志
            styles: {
                top: "45px",//子页面顶部位置 mui标题栏默认高度为45px
                bottom: "50px",//子页面底部位置
                // width:subpage-width,//子页面宽度，默认为100%
                // height:subpage-height,//子页面高度，默认为100%

            },
            // extras:{}//额外扩展参数
        },
        {
            url: "../html/main_phone.html",//子页面HTML地址，支持本地地址和网络地址
            id: "mainphone",//子页面标志
            styles: {
                top: "45px",//子页面顶部位置 mui标题栏默认高度为45px
                bottom: "50px",//子页面底部位置
                // width:subpage-width,//子页面宽度，默认为100%
                // height:subpage-height,//子页面高度，默认为100%

            },
            // extras:{}//额外扩展参数
        },
        {
            url: "../html/main_email.html",//子页面HTML地址，支持本地地址和网络地址
            id: "mainemail",//子页面标志
            styles: {
                top: "45px",//子页面顶部位置 mui标题栏默认高度为45px
                bottom: "50px",//子页面底部位置
                // width:subpage-width,//子页面宽度，默认为100%
                // height:subpage-height,//子页面高度，默认为100%

            },
            // extras:{}//额外扩展参数
        },
        {
            url: "../html/main_settings.html",//子页面HTML地址，支持本地地址和网络地址
            id: "settings",//子页面标志
            styles: {
                top: "45px",//子页面顶部位置 mui标题栏默认高度为45px
                bottom: "50px",//子页面底部位置
                // width:subpage-width,//子页面宽度，默认为100%
                // height:subpage-height,//子页面高度，默认为100%

            },
            // extras:{}//额外扩展参数
        }
    ];

    // $.each($("#navbottom").find("a"), function (index, ele) {
    //     ele.click(function (index) {
    //         mui.init({subpages: [page[index]]});
    //     });
    // });

    $("#home").click(function () {
        mui.init({subpages: [page[0]]});
    });
    $("#phone").click(function () {
        mui.init({subpages: [page[1]]});
        // plus.webview.getWebviewById("mainhome").hide();

    });
    $("#email").click(function () {
        mui.init({subpages: [page[2]]});
    });
    $("#settings").click(function () {
        mui.init({subpages: [page[3]]});
    });
    mui.init({
        subpages: [
            page[1]
        ]
    })


});