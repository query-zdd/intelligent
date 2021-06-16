/**
 * Created by wangx on 17-4-25.
 */
var g_offer_id_list = new Array();
$(".off-qypl-btn").next().find('li').on("click", function () {
    if ($(this).hasClass('check-ex')) {
        if ($('.off-table-list tbody input:checked').size() == 0) {
            alert('请选择权益');
            return false;
        }
        $('.qy-pl .edit-form-top').text('权益批量导出(JPG/PDF/HTML)');
        $(".qy-pl").show();
        $(".edit-form-bg,.qx-btn").on("click", function () {
            $(".qy-pl").hide();
        });
        $('.off-table-list tbody input:checked').each(function () {
            g_offer_id_list.push($(this).val());
        });
    } else if ($(this).hasClass('total-ex')) {
        $('.qy-pl .edit-form-top').text('权益全部导出(JPG/PDF/HTML)');
        $(".qy-pl").show();
        $(".edit-form-bg,.qx-btn").on("click", function () {
            $(".qy-pl").hide();
        });
        g_offer_id_list = JSON.parse($('#offer-id-list').val());
    }

});
var o_id;
$(".off-out").on("click", function () {
    $(".dao-content").show();
    $(".main-content").hide();
    $(".daoCon-qx").on("click", function () {
        $(".dao-content").hide();
        $(".main-content").show();
    });
    o_id = $(this).attr('tag');
    $("#export_jpg").attr('rol', o_id);
    $("#export_pdf").attr('rol', o_id);
    $("#export_html").attr('rol', o_id);
    var src_str = "/offer/offerExportShowTc/?lang=tc&id=" + o_id;
    $("#export_html_1").attr('src', src_str);
    $("#export_html_3").attr('src', src_str + "&lang=tc");
    $.ajax({
        "dataType": "json",
        "type": "post",
        "url": "/offer/api/getCardAvilTc/",
        "data": {'offer_id': o_id},
        "success": function (data) {
            data = data.avail;
            var first_show = 0;
            for (var i = 0; i < data.length; i++) {
                if (data[i] == 1) {
                    $('#card_sel,#card_sel_2').each(function () {
                        $(this).find('option').eq(i + 1).show();
                        if (first_show == 0) {
                            first_show = i + 1;
                        }
                    });

                }
                else {
                    $('#card_sel,#card_sel_2').each(function () {
                        $(this).find('option').eq(i + 1).hide();
                    });

                }
            }
            $('#card_sel,#card_sel_2').each(function () {
                $(this).find('option').each(function () {
                    $(this).removeAttr('selected');
                });
            });
            $("#export_html_2").attr('src', src_str + "&version=2017&card_type=" + first_show);
            $("#export_html_4").attr('src', src_str + "&version=2017&card_type=" + first_show + "&lang=tc");
            $("#export_html_1").attr('src', src_str + "&version=2016&card_type=" + first_show + "&lang=tc");
            $('#card_sel,#card_sel_2').each(function () {
                $(this).find('option').eq(first_show).attr('selected', 'selected');
            });


        },
        "error": function (xhr, status, error) {
            alert("系统繁忙，请稍后再试！");
        }
    });
});
$('#card_sel,#lang_sel').on('change',function(){
    var src_str = "/offer/offerExportShowTc/?lang="+ $('#lang_sel').val()+"&id=" + o_id;
    $("#export_html_1").attr('src', src_str + "&version=2016&card_type=" + $('#card_sel').val());
});


$('#export_pdf').on('click', function (e) {
    var params = {};
    params['id'] = $(this).attr('rol');
    params['type'] = "pdf";
    //params['lang'] = "tc";
    if ($('.daoCon-title-ul .daoCon-on').attr('name') == 'daoCon2016') {
        params['version'] = "2016";
        params['card_type'] = $('#card_sel option:selected').val();
        params['lang'] = $('#lang_sel option:selected').val();
    }
    else if ($('.daoCon-title-ul .daoCon-on').attr('name') == 'daoCon2017') {
        params['version'] = "2017";
        params['card_type'] = $('#card_sel option:selected').val();
    }
    else if ($('#tab_3').hasClass('active') == true) {
        params['version'] = "2016";
        params['lang'] = 'tc';
    }
    else if ($('#tab_4').hasClass('active') == true) {
        params['version'] = "2017";
        params['card_type'] = $('#card_sel_2 option:selected').val();
        params['lang'] = 'tc';
    }
    $('#export_pdf').html('生成中..');
    $('#export_pdf').attr('disabled', 'disabled');
    $.ajax({
        "dataType": "json",
        "type": "post",
        "url": "/offer/api/offerExportTc/",
        "data": params,
        "success": function (data) {
            if (data.ret == 0) {
                $('#export_pdf').html('导出pdf');
                $('#export_pdf').removeAttr('disabled');
                window.location.href = "/offer/fileDownload/?name=" + encodeURI(data.message);
            }

        },
        "error": function (xhr, status, error) {
            alert("系统繁忙，请稍后再试！");
        }
    });
});
$('#export_jpg').on('click', function (e) {
    var params = {};
    params['id'] = $(this).attr('rol');
    params['type'] = 'jpg';
    //params['lang'] = "tc";
    if ($('.daoCon-title-ul .daoCon-on').attr('name') == 'daoCon2016') {
        params['version'] = "2016";
        params['card_type'] = $('#card_sel option:selected').val();
        params['lang'] = $('#lang_sel option:selected').val()

    }
    else if ($('.daoCon-title-ul .daoCon-on').attr('name') == 'daoCon2017') {
        params['version'] = "2017";
        params['card_type'] = $('#card_sel option:selected').val();
    }
    else if ($('#tab_3').hasClass('active') == true) {
        params['version'] = "2016";
        params['lang'] = 'tc';
    }
    else if ($('#tab_4').hasClass('active') == true) {
        params['version'] = "2017";
        params['card_type'] = $('#card_sel_2 option:selected').val();
        params['lang'] = 'tc';
    }
    $('#export_jpg').html('生成中..');
    $('#export_jpg').attr('disabled', 'disabled');
    $.ajax({
        "dataType": "json",
        "type": "post",
        "url": "/offer/api/offerExportTc/",
        "data": params,
        "success": function (data) {
            if (data.ret == 0) {
                $('#export_jpg').html('导出jpg');
                $('#export_jpg').removeAttr('disabled');
                window.location.href = "/offer/fileDownload/?name=" + encodeURI(data.message);
            }

        },
        "error": function (xhr, status, error) {
            alert("系统繁忙，请稍后再试！");
        }
    });
});

$('#export_html').on('click', function (e) {
    var params = {};
    params['id'] = $(this).attr('rol');
    params['type'] = "html";
    //params['lang'] = "tc";
    if ($('.daoCon-title-ul .daoCon-on').attr('name') == 'daoCon2016') {
        params['version'] = "2016";
        params['card_type'] = $('#card_sel option:selected').val();
        params['lang'] = $('#lang_sel option:selected').val();
    }
    else if ($('.daoCon-title-ul .daoCon-on').attr('name') == 'daoCon2017') {
        params['version'] = "2017";
        params['card_type'] = $('#card_sel option:selected').val();
    }
    else if ($('#tab_3').hasClass('active') == true) {
        params['version'] = "2016";
        params['lang'] = 'tc';
    }
    else if ($('#tab_4').hasClass('active') == true) {
        params['version'] = "2017";
        params['card_type'] = $('#card_sel_2 option:selected').val();
        params['lang'] = 'tc';
    }
    $('#export_html').html('生成中..');
    $('#export_html').attr('disabled', 'disabled');
    $.ajax({
        "dataType": "json",
        "type": "post",
        "url": "/offer/api/offerExportTc/",
        "data": params,
        "success": function (data) {
            $('#export_html').html('导出HTML');
            $('#export_html').attr('disabled', 'disabled');

            if (data.ret == 1) {
                $('#export_html').attr('disabled', false);
                window.location.href = "/offer/fileDownload/?flag=6&filename=" + data.message + '&htmlfile=' + data.htmlfile;
            }


        },
        "error": function (xhr, status, error) {
            alert("系统繁忙，请稍后再试！");
        }
    });
});

$('#formExportConfirm').on('click', function (e) {
    e.preventDefault();
    var params = {};
    $('.qy-pl select').each(function () {
        _key = $(this).attr('name');
        _value = $(this).val()
        params[_key] = _value;
    });
    //var offer_id_list = new Array();
    //$('.off-table-list tbody input:checked').each(function () {
    //    offer_id_list.push($(this).val());
    //});
    params['offer_id'] = g_offer_id_list.join(';');

    $('#formExportConfirm').html('生成中...');
    $('#formExportConfirm').attr('disabled', 'disabled');

    $.ajax({
        "dataType": "json",
        "type": "post",
        "url": "/offer/api/exportOfferBatchTc/",
        "data": params,
        "success": function (data) {
            if (data.ret == 0) {
                $('#formExportConfirm').html('确认');
                $('#formExportConfirm').removeAttr('disabled');
                window.location.href = "/offer/fileDownload/?name=" + encodeURI(data.message);
            }
            if (data.ret == 1) {
                $('#formExportConfirm').html('确认');
                $('#formExportConfirm').removeAttr('disabled');
                window.location.href = "/offer/fileDownload/?flag=5&filename=" + data.message;
            }

        },
        "error": function (xhr, status, error) {
            alert("系统繁忙，请稍后再试！");
        }
    });

});

var mainContent = $(".main-content");
var addFadeIn = function () {
    $html = $('<div class="fadeIn-box"><div class="fadeIn-bg"></div><div class="fadeIn-main">' +
        '<div class="fadeIn-top"></div><div class="fadeIn-middle" id="loc"></div><div class="fadeIn-bottom"></div></div></div>');
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
    var mHeight = mainContent.height();
    fadeInBox.css("height", mHeight + 20);
    fadeInBox.fadeIn();
    fadeInMain.addClass("fade");
    fadeInMain.css('top', '30%');
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
    //fadeInMiddle.prepend('<span>该页面出错，请刷新！</span>');
    fadeInBottom.empty();
    //fadeInBottom.prepend('<button class="sure-btn reload">确定</button>');
    $(".reload").on("click", function () {
        fadeInBox.fadeOut();
        fadeInMain.removeClass("fade");
    })
};


var loc = function (lon, lat) {
    fadeIn();
    fadeInMiddle.css('height', '300px');
    fadeInTop.hide();
    fadeInMiddle.empty();
    fadeInMiddle.css("padding", "20px");
    //fadeInMiddle.prepend('<span>确认要删除所选记录？</span>');
    fadeInBottom.empty();
    var map = new BMap.Map("loc");            // 创建Map实例
    var point = new BMap.Point(Number(lon), Number(lat));
    map.centerAndZoom(point, 17);
    var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});// 左上角，添加比例尺
    var top_left_navigation = new BMap.NavigationControl();  //左上角，添加默认缩放平移控件
    var top_right_navigation = new BMap.NavigationControl({
        anchor: BMAP_ANCHOR_TOP_RIGHT,
        type: BMAP_NAVIGATION_CONTROL_SMALL
    }); //右上角，仅包含平移和缩放按钮
    /*缩放控件type有四种类型:
     BMAP_NAVIGATION_CONTROL_SMALL：仅包含平移和缩放按钮；BMAP_NAVIGATION_CONTROL_PAN:仅包含平移按钮；BMAP_NAVIGATION_CONTROL_ZOOM：仅包含缩放按钮*/

    //添加控件和比例尺
    function add_control() {
        map.addControl(top_left_control);
        map.addControl(top_left_navigation);
        map.addControl(top_right_navigation);
    }

    //移除控件和比例尺
    function delete_control() {
        map.removeControl(top_left_control);
        map.removeControl(top_left_navigation);
        map.removeControl(top_right_navigation);
    }

    add_control();

    //var myIcon = new BMap.Icon("{{ remarkIcon }}", new BMap.Size(200, 200),
    //        {
    //            imageSize:new BMap.Size(80,80),
    //            anchor:new BMap.Size(40,80)
    //
    //        }
    //);
    var marker = new BMap.Marker(point);
    map.addOverlay(marker);
    //fadeInBottom.prepend('<button class="sure-btn">好</button><button class="qx-btn">取消</button>');

};
$(".off-loc").on("click", function () {
    geo = $(this).attr('tag');
    item = geo.split(';')[0]
    if (item) {
        lon = item.split(',')[1]
        lat = item.split(',')[0]
        loc(lon, lat);
    }

});

var del = function () {
    fadeIn();
    fadeInMiddle.css('height', '25px');
    fadeInTop.hide();
    fadeInMiddle.empty();
    fadeInMiddle.css("padding", "20px");
    fadeInMiddle.prepend('<span>确认要删除所选记录？</span>');
    fadeInBottom.empty();
    fadeInBottom.prepend('<button class="sure-btn">好</button><button class="qx-btn">取消</button>');
    $(".fadeIn-main .sure-btn,.qx-btn").on("click", function () {
        if ($(this).hasClass('sure-btn')) {
            var params = {};
            params['off_id'] = del_id;
            $.ajax({
                "dataType": "json",
                "type": "post",
                "url": "/offer/api/deleteOfferTc/",
                "data": params,
                "success": function (data) {
                    alert(data.message);
                    if (data.ret == 0) {
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
$(".off-del").on("click", function () {
    del_id = $(this).attr('tag');
    del();
});