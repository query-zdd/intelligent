/**
 * Created by insight on 17/5/5.
 */
function schedule(number) {
            params = {};
            params['schedule'] = String(number);
            $.ajax({
                "dataType": "json",
                "type": "post",
                "url": "/offer/api/scheduleOperation/",
                "data": params,
                "success": function (data) {
                    if (data.ret == 1) {
                        alert("操作成功！");
                        //window.history.go(-1);
                        //location.reload();
                        location.reload();

                    }
                    else {
                        location.reload();
                    }
                },
                "error": function (xhr, status, error) {

                }
            });
        };
function strickOntop(number) {
    var idArray = new Array();
    idArray.push(String(number));
    var params = {};
    params['numberlist'] = JSON.stringify(idArray);
    params['schedule'] = "stricktop";
            $.ajax({
        "dataType": "json",
        "type": "post",
        "url": "/offer/api/scheduleOperation/",
        "data": params,
        "success": function (data) {
            if (data.ret == 1) {
                alert("操作成功！");
                location.reload();

            }
            else {
                location.reload();
            }
        },
        "error": function (xhr, status, error) {

        }
    });
}

$('.offer-shcedule').next().find('li').on('click', function (e) {
    if ($(this).hasClass('check-ex')){
        var obj = document.getElementsByName('b');
        var s = '';
        for (var i = 0; i < obj.length; i++) {
            if (obj[i].checked) s += obj[i].value + ',';
        }
        if (s.length == 0){
            alert('请先勾选权益');
            return;
        }
        var params = {};
        params['schedule'] = "topart";
        params['numberlist'] = s;
    }else if ($(this).hasClass('total-ex')){
        if (confirm("是否添加结果搜索中所有权益至日历?") == false) {
            return;
        }
        var params = {};
        params['schedule'] = "toall";
        params['numberlist'] = $('#numberlist').attr('value');
    }
    $.ajax({
        "dataType": "json",
        "type": "post",
        "url": "/offer/api/scheduleOperation/",
        "data": params,
        "success": function (data) {
            if (data.ret == 1) {
                alert("操作成功！");
                location.reload();

            }
            else {
                location.reload();
            }
        },
        "error": function (xhr, status, error) {

        }
    });

});

//批量删除
$('#scheduledeleteP').on('click', function (e) {
    if ($('.vip-time').find(':checked').size() == 0) {
        alert('请勾选权益');
        return false;
    }
    else {
        if (confirm("确认要移除所选择的权益？") == false) {
            return;
        }
        else {

            var idArray = new Array();
            $('.vip-time').find(':checked').each(function () {
                idArray.push($(this).val());
            });
            var params = {};
            params['id'] = JSON.stringify(idArray);
            params['schedule'] = "toalldel";
            $.ajax({
                "dataType": "json",
                "type": "post",
                "url": "/offer/api/scheduleOperation/",
                "data": params,
                "success": function (data) {
                    if (data.ret == 1) {
                        alert("操作成功！");
                        location.reload();

                    }
                    else {
                        location.reload();
                    }
                },
                "error": function (xhr, status, error) {

                }
            });
        }
    }
});


$('#scheduledeleteA').on('click', function (e) {
        if (confirm("确认要移除所有权益？") == false) {
            return;
        }
        else {
            var params = {};
            params['schedule'] = "toalldelusers";
            $.ajax({
                "dataType": "json",
                "type": "post",
                "url": "/offer/api/scheduleOperation/",
                "data": params,
                "success": function (data) {
                    if (data.ret == 1) {
                        alert("操作成功！");
                        location.reload();

                    }
                    else {
                        location.reload();
                    }
                },
                "error": function (xhr, status, error) {

                }
            });
        }
});

//批量导出
$('.offer-excel-part').on('click', function (e) {
    e.preventDefault();
    if ($('.vip-time').find(':checked').size() == 0) {
        alert('请勾选权益');
        return false;
    }
    else {

        var idArray = new Array();
        $('.vip-time').find(':checked').each(function () {
            idArray.push($(this).val());
        });
        var params = {};
        params['id'] = JSON.stringify(idArray);


    }
    $.ajax({
        "dataType": "json",
        "type": "post",
        "url": "/offer/api/exportScheduleEl/",
        "data": params,
        "success": function (data) {
            alert('批量权益导出完成！');
            window.location.href = "/offer/api/fileDownload/?flag=8";
        },
        "error": function (xhr, status, error) {
            alert("数据导出出错！");
        }
    });


});

$('.offer-excel-all').on('click', function (e) {
    e.preventDefault();
    if (confirm("确认要导出所有权益？") == false) {
        return;
    }
    var params = {};
    params['operationCode'] = "toall";
    $.ajax({
        "dataType": "json",
        "type": "post",
        "url": "/offer/api/exportScheduleEl/",
        "data": params,
        "success": function (data) {
            alert('全部权益导出完成！');
            window.location.href = "/offer/api/fileDownload/?flag=8";
        },
        "error": function (xhr, status, error) {
            alert("数据导出出错！");
        }
    });


});


$('.offer-stickontop').on('click', function (e) {
    e.preventDefault();
    if ($('.off-table-list tbody').find(':checked').size() == 0) {
        alert('请选择权益');
        return false;
    }
    else {
            var idArray = new Array();
            $('.off-table-list tbody').find(':checked').each(function () {
                idArray.push($(this).val());
            });
            var params = {};
            params['numberlist'] = JSON.stringify(idArray);
            params['schedule'] = "stricktop";

    }
        $.ajax({
        "dataType": "json",
        "type": "post",
        "url": "/offer/api/scheduleOperation/",
        "data": params,
        "success": function (data) {
            if (data.ret == 1) {
                alert("操作成功！");
                location.reload();

            }
            else {
                location.reload();
            }
        },
        "error": function (xhr, status, error) {

        }
    });

});

