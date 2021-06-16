/*
编辑offer 权益
 */
$('.off-see').on('click', function (e) {
    e.preventDefault();
    var id=$(this).attr('tag');
    window.location.href = "/offer/showOfferEdit/?id=" + id;

});
/*
增加offer 权益
 */
$('.offer-add-btn').on('click', function (e) {
    e.preventDefault();
    var id=$(this).attr('tag');
    window.location.href = "/offer/showOfferEdit/";

});
/*
批量导出权益
 */

$('.offer-excel').next().find('li').on('click', function (e) {
    e.preventDefault();
    if ($(this).hasClass('check-ex')){
        if ($('.off-table-list tbody').find(':checked').size() == 0) {
            alert('请选择权益');
            return false;
        }
        else {
            if (confirm("确认要导出所选择的权益.") == false) {
                return;
            }
            else {
                var idArray = new Array();
                $('.off-table-list tbody').find(':checked').each(function () {
                    idArray.push($(this).val());
                });
                var params = {};
                params['id'] = JSON.stringify(idArray);

            }
        }
    }else if ($(this).hasClass('total-ex')){
        if (confirm("确认要导出所有权益吗?") == false) {
            return;
        }
        var params = {};
        params['id'] = $('#offer-id-list').val();
    }

    $.ajax({
        "dataType": "json",
        "type": "post",
        "url": "/offer/api/exportOfferEl/",
        "data": params,
        "success": function (data) {
            alert('批量权益导出完成！');
            window.location.href = "/offer/api/fileDownload/?flag=3";
        },
        "error": function (xhr, status, error) {
            alert("数据导出出错！");
        }
    });


});
//word
$('.offer-word').next().find('li').on('click', function (e) {
    e.preventDefault();
    if ($(this).hasClass('check-ex')){
        if ($('.off-table-list tbody').find(':checked').size() == 0) {
            alert('请选择权益');
            return false;
        }
        else {
            if (confirm("确认要导出所选择的权益.") == false) {
                return;
            }
            else {
                var idArray = new Array();
                $('.off-table-list tbody').find(':checked').each(function () {
                    idArray.push($(this).val());
                });
                var params = {};
                params['id'] = JSON.stringify(idArray);

            }
        }
    }else if ($(this).hasClass('total-ex')){
        if (confirm("确认要导出所有权益吗?") == false) {
            return;
        }
        var params = {};
        params['id'] = $('#offer-id-list').val();
    }

    $.ajax({
        "dataType": "json",
        "type": "post",
        "url": "/offer/api/exportOfferDoc/",
        "data": params,
        "success": function (data) {
            alert('批量权益导出完成！');
            window.location.href = "/offer/api/fileDownload/?flag=word&name=" + data.message;
        },
        "error": function (xhr, status, error) {
            alert("数据导出出错！");
        }
    });


});


/*
批量导出素材包
 */

$('.offer-youlada').next().find('li').on('click', function (e) {
    e.preventDefault();
    if ($(this).hasClass('check-ex')) {
        if ($('.off-table-list tbody').find(':checked').size() == 0) {
            alert('请选择权益');
            return false;
        }
        else {
            if (confirm("确认要导出所选择权益的素材.") == false) {
                return;
            }
            else {
                var idArray = new Array();
                $('.off-table-list tbody').find(':checked').each(function () {
                    idArray.push($(this).val());
                });
                var params = {};
                params['id'] = JSON.stringify(idArray);

            }
        }
    }else if ($(this).hasClass('total-ex')){
        if (confirm("确认要导出所有权益素材吗?") == false) {
            return;
        }
        var params = {};
        params['id'] = $('#offer-id-list').val();
    }
    $.ajax({
        "dataType": "json",
        "type": "post",
        "url": "/offer/api/exportOfferElZip/",
        "data": params,
        "success": function (data) {
            alert('批量权益导出完成！');
            window.location.href = "/offer/api/fileDownload/?flag=7";
        },
        "error": function (xhr, status, error) {
            alert("数据导出出错！");
        }
    });


});

/*
批量图片素材包导出
 */

$('.offer-img-zip').next().find('li').on('click', function (e) {
    e.preventDefault();
    if ($(this).hasClass('check-ex')) {
        if ($('.off-table-list tbody').find(':checked').size() == 0) {
            alert('请选择权益');
            return false;
        }
        else {
            if (confirm("确认要导出所选择权益的素材.") == false) {
                return;
            }
            else {
                var idArray = new Array();
                $('.off-table-list tbody').find(':checked').each(function () {
                    idArray.push($(this).val());
                });
                var params = {};
                params['id'] = JSON.stringify(idArray);

            }
        }
    }else if ($(this).hasClass('total-ex')){
        if (confirm("确认要导出所有权益素材吗?") == false) {
            return;
        }
        var params = {};
        params['id'] = $('#offer-id-list').val();
    }
    $(".base-loading").show();
    $.ajax({
        "dataType": "json",
        "type": "post",
        "url": "/offer/api/exportOfferImgsZip/",
        "data": params,
        "success": function (data) {
             $(".base-loading").hide();
            alert('批量权益图片素材包导出完成！');
            window.location.href = "/offer/api/fileDownload/?flag=9";
        },
        "error": function (xhr, status, error) {
             $(".base-loading").hide();
            alert("数据导出出错！");
        }
    });


});


$('.dropmenu').mouseover(function(){
    $(this).find('ul.drop-down').show();
});
$('.dropmenu').mouseout(function(){
    $(this).find('ul.drop-down').hide();
});

/*
批量处理图片素材包导出
 */

$('.offer-img-zip-pcc').on('click', function (e) {
    e.preventDefault();
    if (confirm("确认要导出有效权益素材吗?") == false) {
        return;
    }
    var params = {};
    params['id'] = $('#offer-id-list').val();
    $(".base-loading").show();
    $.ajax({
        "dataType": "json",
        "type": "post",
        "url": "/offer/api/exportOfferImgsZipPcc/",
        "data": params,
        "success": function (data) {
             $(".base-loading").hide();
            alert('批量权益图片素材包导出完成！');
            window.location.href = "/offer/api/fileDownload/?flag=9";
        },
        "error": function (xhr, status, error) {
             $(".base-loading").hide();
            alert("数据导出出错！");
        }
    });


});



