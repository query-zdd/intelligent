//各种弹窗

var mainContent = $(".main-content");
var addFadeIn = function () {
    $html = $('<div class="fadeIn-box"><div class="fadeIn-bg"></div><div class="fadeIn-main">' +
        '<div class="fadeIn-top"></div><div class="fadeIn-middle"></div><div class="fadeIn-bottom"></div></div></div>');
    mainContent.append($html);
};
addFadeIn();

var fadeInBox = $(".fadeIn-box");
var fadeInMain = $(".fadeIn-main");
var fadeInTop = $(".fadeIn-top");
var fadeInMiddle = $(".fadeIn-middle");
var fadeInBottom = $(".fadeIn-bottom");
var del_id = '';
var fadeIn = function () {
    var mHeight =mainContent.height();
    fadeInBox.css("height", mHeight + 20);
    fadeInBox.fadeIn();
    fadeInMain.addClass("fade");
    $(".fadeIn-bg").on("click", function () {
        fadeInBox.fadeOut();
        fadeInMain.removeClass("fade");
    })
}
var error = function () {
    fadeIn();
    fadeInTop.empty();
    fadeInTop.append("提示");
    fadeInMiddle.empty();
    fadeInMiddle.prepend('<span>该页面出错，请刷新！</span>');
    fadeInBottom.empty();
    fadeInBottom.prepend('<button class="sure-btn reload">确定</button>');
    $(".reload").on("click", function () {
        fadeInBox.fadeOut();
        fadeInMain.removeClass("fade");
    })
};


var del= function(){
    fadeIn();
    fadeInTop.hide();
    fadeInMiddle.empty();
    fadeInMiddle.css("padding","20px");
    fadeInMiddle.prepend('<span>确认要删除所选记录？</span>');
    fadeInBottom.empty();
    fadeInBottom.prepend('<button class="sure-btn">好</button><button class="qx-btn">取消</button>');
    $(".fadeIn-main .sure-btn,.qx-btn").on("click", function () {
        fadeInBox.fadeOut();
        fadeInMain.removeClass("fade");
    })
};
$(".del").on("click",function(){
    del_id = $(this).attr('tag_id');
    del();
});


