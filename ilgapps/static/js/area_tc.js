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
//区域增加
$('#add-chau').on('click',function(){
    var mHeight = $(".main-content").height();
    $(".pop-box.chau").css("height",mHeight+20);
    $(".pop-box.sure-edit-box.chau").fadeIn();
    $(".sure-edit-box.chau .pop-main").addClass("fade");
    $(".pop-bg,.qx-btn").on("click",function(){
            $(".pop-box.sure-edit-box").fadeOut();
            $(".sure-edit-box .pop-main").removeClass("fade");
    })
    $("#chau_name").val(null);
    $("#chau_en").val(null);
    $('.chau .pop-top').html('增加区域');
    $('#chau_id').val(null);
});
//区域保存
$('.sure-edit-box.chau .sure-btn').click(function(){
    var params = {};
    params['type'] = 'chau';
    var form_valid = true;
    $('.sure-edit-box.chau .pop-middle [id]').each(function(){
        params[$(this).attr('id')] = $(this).val();
        if (!$(this).val() && $(this).attr('id') != 'chau_id'){
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
        "url": "/category/api/saveAreaTc/",
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
//国家增加
$('#add-country').on('click',function(){
    var mHeight = $(".main-content").height();
    $(".pop-box.country").css("height",mHeight+20);
    $(".pop-box.sure-edit-box.country").fadeIn();
    $(".sure-edit-box.country .pop-main").addClass("fade");
    $(".pop-bg,.qx-btn").on("click",function(){
            $(".pop-box.sure-edit-box").fadeOut();
            $(".sure-edit-box .pop-main").removeClass("fade");
    })
    var select_p = $(".pop-box.sure-edit-box.country #parent_id").parents('.section');
    select_p.find('span').text('区域');
    $(".pop-box.sure-edit-box.country .pop-top").text('增加国家区域');
    $('#parent_id').remove();
    var clone_node = $('#parent_id_bk').clone();
    clone_node.attr('id','parent_id');
    clone_node.show();
    select_p.append(clone_node);

    $('#cat_id').val(null);
    $("#country_cn").parent().show() && $("#country_cn").val(null);
    $("#country_en").parent().show() && $("#country_en").val(null);
    $("#city_name").parent().hide();
    $("#city_name_en").parent().hide();
});
//国家编辑
$('.one-lv .edit').on('click',function(){
    //var mHeight = $(".main-content").height();
    //$(".pop-box.country").css("height",mHeight+20);
    //$(".pop-box.sure-edit-box.country").fadeIn();
    //$(".sure-edit-box.country .pop-main").addClass("fade");
    //$(".pop-bg,.qx-btn").on("click",function(){
    //        $(".pop-box.sure-edit-box").fadeOut();
    //        $(".sure-edit-box .pop-main").removeClass("fade");
    //})
    //var select_p = $(".pop-box.sure-edit-box.country #parent_id").parents('.section');
    //select_p.find('span').text('区域');
    //$(".pop-box.sure-edit-box.country .pop-top").text('编辑国家区域');
    //$('#parent_id').remove();
    //var clone_node = $('#parent_id_bk').clone();
    //clone_node.attr('id','parent_id');
    //clone_node.show();
    //select_p.append(clone_node);
    //$('#parent_id').val($(this).attr('p_value').split(',')[0]);
    //var catId = $(this).attr('tag_id');
    //var nodeList = $(this).parent().prev().children();
    //$("#cat_id").val(catId);
    //$("#country_cn").parent().show() && $("#country_cn").val(nodeList.eq(0).text().split('|')[0]);
    //$("#country_en").parent().show() && $("#country_en").val(nodeList.eq(0).text().split('|')[1]);
    //$("#city_name").parent().hide();
    //$("#city_name_en").parent().hide();
    var mHeight = $(".main-content").height();
    $(".pop-box.chau").css("height",mHeight+20);
    $(".pop-box.sure-edit-box.chau").fadeIn();
    $(".sure-edit-box.chau .pop-main").addClass("fade");
    $(".pop-bg,.qx-btn").on("click",function(){
            $(".pop-box.sure-edit-box").fadeOut();
            $(".sure-edit-box .pop-main").removeClass("fade");
    });
    var chau = $(this).prev().find('span').text();
    $("#chau_name").val(chau.split('|')[0]);
    $("#chau_en").val(chau.split('|')[1]);
    $('.chau .pop-top').html('编辑区域');
    $("#chau_id").val($(this).attr('tag_id'));
});
//国家、城市保存
$('.sure-edit-box.country .sure-btn').click(function(){
    var params = {};
    if($(".pop-box.sure-edit-box.country #parent_id").prev().text() == '区域'){
         params['type'] = 'country';
    }else if($(".pop-box.sure-edit-box.country #parent_id").prev().text() == '国家'){
        params['type'] = 'city';
    }
    else{
        return;
    }
    var form_valid = true;
    $('.sure-edit-box.country .pop-middle [id]').each(function(){
        params[$(this).attr('id')] = $(this).val();
        if (params['type'] == 'country'){
            if ($(this).attr('id') != 'cat_id' &&
                $(this).attr('id') != 'city_name' &&
                $(this).attr('id') != 'city_name_en' &&
                !$(this).val()){
                form_valid = false;
            }
        }else if(params['type'] == 'city'){
            if ($(this).attr('id') != 'cat_id' &&
                $(this).attr('id') != 'country_cn' &&
                $(this).attr('id') != 'country_en' &&
                !$(this).val()){
                form_valid = false;
            }
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
        "url": "/category/api/saveAreaTc/",
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
//城市增加
$(".level_one .add").on("click",function(){
    var mHeight = $(".main-content").height();
    $(".pop-box.country").css("height",mHeight+20);
    $(".pop-box.sure-edit-box.country").fadeIn();
    $(".sure-edit-box.country .pop-main").addClass("fade");
    $(".pop-bg,.qx-btn").on("click",function(){
            $(".pop-box.sure-edit-box").fadeOut();
            $(".sure-edit-box .pop-main").removeClass("fade");
    });
    var select_p = $(".pop-box.sure-edit-box.country #parent_id").parents('.section');
    select_p.find('span').text('国家');
    $(".pop-box.sure-edit-box.country .pop-top").text('增加城市区域');
    var catId = $(this).attr('tag_id');
    var nodeList = $(this).parent().prev().children();
    $("#cat_id").val(null);
    $("#parent_id").empty();
    $('#parent_id').append('<option value="'+catId+'">'+nodeList.eq(0).text().split("|")[0]+'</option>');
    $("#parent_id").val(catId);
    $("#country_cn").parent().hide();
    $("#country_en").parent().hide();
    $("#city_name").parent().show() && $("#city_name").val(null);
    $("#city_name_en").parent().show() && $("#city_name_en").val(null);

});
//国家编辑
$('.level_one>.edit').on('click',function(){
    var mHeight = $(".main-content").height();
    $(".pop-box.country").css("height",mHeight+20);
    $(".pop-box.sure-edit-box.country").fadeIn();
    $(".sure-edit-box.country .pop-main").addClass("fade");
    $(".pop-bg,.qx-btn").on("click",function(){
            $(".pop-box.sure-edit-box").fadeOut();
            $(".sure-edit-box .pop-main").removeClass("fade");
    });
    var select_p = $(".pop-box.sure-edit-box.country #parent_id").parents('.section');
    select_p.find('span').text('区域');
    $(".pop-box.sure-edit-box.country .pop-top").text('编辑国家区域');
    $('#parent_id').remove();
    var clone_node = $('#parent_id_bk').clone();
    clone_node.attr('id','parent_id');
    clone_node.show();
    select_p.append(clone_node);
    $('#parent_id').val($(this).attr('p_value').split(',')[0]);
    var catId = $(this).attr('tag_id');
    var nodeList = $(this).parent().prev().children();
    $("#cat_id").val(catId);
    $("#country_cn").parent().show() && $("#country_cn").val(nodeList.eq(0).text().split('|')[0]);
    $("#country_en").parent().show() && $("#country_en").val(nodeList.eq(0).text().split('|')[1]);
    $("#city_name").parent().hide();
    $("#city_name_en").parent().hide();


});
//城市编辑
$('.level_two .edit').on('click',function(){
    var mHeight = $(".main-content").height();
    $(".pop-box.country").css("height",mHeight+20);
    $(".pop-box.sure-edit-box.country").fadeIn();
    $(".sure-edit-box.country .pop-main").addClass("fade");
    $(".pop-bg,.qx-btn").on("click",function(){
            $(".pop-box.sure-edit-box").fadeOut();
            $(".sure-edit-box .pop-main").removeClass("fade");
    });
    var select_p = $(".pop-box.sure-edit-box.country #parent_id").parents('.section');
    select_p.find('span').text('国家');
    $(".pop-box.sure-edit-box.country .pop-top").text('编辑城市区域');
    $('#parent_id').empty();
    $('#parent_id').append('<option value="'+$(this).attr('p_value').split(',')[0]+'">'+$(this).attr('p_value').split(',')[1]+'</option>');
    $("#parent_id").val($(this).attr('p_value').split(',')[0]);
    var catId = $(this).attr('tag_id');
    var nodeList = $(this).parent().prev().children();
    $("#cat_id").val(catId);
    $("#city_name").parent().show() && $("#city_name").val(nodeList.eq(0).text().split('|')[0]);
    $("#city_name_en").parent().show() && $("#city_name_en").val(nodeList.eq(0).text().split('|')[1]);
    $("#country_cn").parent().hide();
    $("#country_en").parent().hide();
});


//
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
        if($(this).hasClass('sure-btn')){
            var params = {};
            params['cat_id'] = del_id;
            $.ajax({
                "dataType": "json",
                "type": "post",
                "url": "/category/api/deleteAreaTc/",
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
$(".del").click(function(){
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