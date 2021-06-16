/*
编辑offer 权益
 */
$('.off-see').on('click', function (e) {
    e.preventDefault();
    var id=$(this).attr('tag');
    window.location.href = "/offer/showOfferEditTc/?id=" + id;

});
/*
增加offer 权益
 */
$('.offer-add-btn').on('click', function (e) {
    e.preventDefault();
    var id=$(this).attr('tag');
    window.location.href = "/offer/showOfferEditTc/";

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
        "url": "/offer/api/exportOfferElTc/",
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
        "url": "/offer/api/exportOfferElZipTc/",
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

$('.dropmenu').mouseover(function(){
    $(this).find('ul.drop-down').show();
});
$('.dropmenu').mouseout(function(){
    $(this).find('ul.drop-down').hide();
});


