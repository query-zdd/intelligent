/**
 * Created by zhangdd on 17-4-20.
 */
/*
搜索效果
 */
$(".search-add-box .search-box input").focus(function(){
    $(this).addClass('focus');
    $(this).attr("placeholder","");
});
$(".search-add-box .search-box input").blur(function(){
    if($(this).val()==''){
        $(this).removeClass('focus');
        $(this).attr("placeholder","搜索");
    }
});
/*
删除权益类目
 */

//$(".del").on("click",function(){
//    if(confirm('确认删除该权益类目吗?') == false){
//        return;
//    }
//    var params = {};
//    params['cat_id'] = $(this).attr('tag_id');
//    $.ajax({
//        "dataType": "json",
//        "type": "post",
//        "url": "/category/api/deleteCategory/",
//        "data": params,
//        "success": function (data) {
//            alert(data.message);
//            if(data.ret == 0){
//                window.location.reload();
//            }
//
//        },
//        "error": function (xhr, status, error) {
//            alert('失败');
//        }
//    });
//});
/*
增加权益类目
 */
$("#add-category").on("click",function(){
    var mHeight = $(".main-content").height();
    $(".pop-box").css("height",mHeight+20);
    $(".pop-box.sure-edit-box").fadeIn();
    $(".sure-edit-box .pop-main").addClass("fade");
    $(".pop-bg,.qx-btn").on("click",function(){
            $(".pop-box.sure-edit-box").fadeOut();
            $(".sure-edit-box .pop-main").removeClass("fade");
    })
    $("#cat_name").val(null);
    $("#cat_name_en").val(null);
    $("#keywords").val(null);
    $("#cat_desc").val(null);
    $("#parent_id").empty();
    $('#parent_id').append('<option value="0">无</option>');
    $("#paren_id").val(0);
});
/*
编辑权益类目
 */
$(".edit").on("click",function(){
    var mHeight = $(".main-content").height();
    $(".pop-box").css("height",mHeight+20);
    $(".pop-box.sure-edit-box").fadeIn();
    $(".sure-edit-box .pop-main").addClass("fade");
    $(".pop-bg,.qx-btn").on("click",function(){
            $(".pop-box.sure-edit-box").fadeOut();
            $(".sure-edit-box .pop-main").removeClass("fade");
    });
    var catId = $(this).attr('tag_id');
    var nodeList = $(this).parent().prev().children();
    $("#cat_id").val(catId);
    $("#cat_name").val(nodeList.eq(0).text().split('|')[0]);
    $("#cat_name_en").val(nodeList.eq(0).text().split('|')[1]);
    $("#keywords").val(nodeList.eq(1).text());
    $("#cat_desc").val(nodeList.eq(2).text());
    $("#parent_id").empty();
    $('#parent_id').append('<option value="'+$(this).attr('p_value').split(',')[0]+'">'+$(this).attr('p_value').split(',')[1]+'</option>');
    $("#parent_id").val($(this).attr('p_value').split(',')[0]);
});

/*
增加权益类目（子类）
 */
$(".add").on("click",function(){
    var mHeight = $(".main-content").height();
    $(".pop-box").css("height",mHeight+20);
    $(".pop-box.sure-edit-box").fadeIn();
    $(".sure-edit-box .pop-main").addClass("fade");
    $(".pop-bg,.qx-btn").on("click",function(){
            $(".pop-box.sure-edit-box").fadeOut();
            $(".sure-edit-box .pop-main").removeClass("fade");
    });
    var catId = $(this).attr('tag_id');
    var nodeList = $(this).parent().prev().children();
    $("#cat_id").val(null);
    $("#cat_name").val(null);
    $("#cat_name_en").val(null);
    $("#keywords").val(null);
    $("#cat_desc").val(null);
    $("#parent_id").empty();
    $('#parent_id').append('<option value="'+catId+'">'+nodeList.eq(0).text().split("|")[0]+'</option>');
    $("#parent_id").val(catId);
});
//保存
$('.sure-edit-box .sure-btn').click(function(){
    var params = {};
    var form_valid = true;
    $('.sure-edit-box .pop-middle [id]').each(function(){
        params[$(this).attr('id')] = $(this).val();
        if ($(this).attr('id') != 'cat_id' && !$(this).val()){
            form_valid = false;
        }
    });
    if (!form_valid){
        alert('字段不能为空');
        return;
    }
    var btn = $(this);
    btn.text('保存中..');
    btn.attr('disabled','disabled');
    $.ajax({
        "dataType": "json",
        "type": "post",
        "url": "/category/api/saveCategory/",
        "data": params,
        "success": function (data) {
            if(data.ret == 0){
                window.location.reload();
            }else{
                alert('保存失败，请刷新');
            }
            //$(".pop-box.sure-edit-box").fadeOut();
            //$(".sure-edit-box .pop-main").removeClass("fade");

        },

        "error": function (xhr, status, error) {
            alert('失败');
        }
    });

});

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
        if($(this).hasClass('sure-btn')){
            var params = {};
            params['cat_id'] = del_id;
            $.ajax({
                "dataType": "json",
                "type": "post",
                "url": "/category/api/deleteCategory/",
                "data": params,
                "success": function (data) {
                    alert(data.message);
                    if(data.ret == 0){
                        window.location.reload();
                    }

                },
                "error": function (xhr, status, error) {
                    alert('失败');
                }
            });
        }
        fadeInBox.fadeOut();
        fadeInMain.removeClass("fade");
    })
};
$(".del").on("click",function(){
    del_id = $(this).attr('tag_id');
    del();
});
/*
    菜单效果变换
*/
$("#category").addClass("ch-active");
$("#category").parent("ul.sub-menu").css("display","block");
$("#category").parent("ul.sub-menu").parent("li").addClass("open");
$("#OfferConManage").parent("ul.sub-menu").parent("li").find(".arrow").addClass("open");
jQuery("#jquery-accordion-menu").jqueryAccordionMenu();

//
//各种弹窗



