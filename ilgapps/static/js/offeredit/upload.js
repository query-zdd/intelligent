/**
 * Created by insight02 on 15-8-20.
 */
//excel 批量上传
$("#browseZip").on('change', function () {
    var fullPath = $(this).val();
    var getSuffix = fullPath.split('.');
    if (getSuffix[getSuffix.length - 1] != 'xls') {
        if (getSuffix[getSuffix.length - 1] != 'xlsx'){
            alert("请选择xls或者xlsx文件！");
            return false;
        }
    }
    var filaName = fullPath.split('\\');
    filaName = filaName[filaName.length - 1];
    $('#filePath').val(filaName);
    $("#btn-upload").attr('disabled',false);
    //$("#browseZip").attr('disabled',true);
    $("#browseFle").attr('disabled',true);
    return true;
});

$("#form_sample").submit(function () {
    $("#up_gif").show();
    var params = $("#form_sample").formToArray();
    $("#form_sample").ajaxSubmit({
        "url": "/offer/api/fileUploadOffer/",
        "data": params,
        "type": 'post',
        "dataType": 'json',
        "beforeSend": function () {
            $("#over").show();
            $("#layout").show();
        },
        "success": function (data) {
            $("#up_gif").hide();
            if (data.ret == 1) {
                alert(data.message);
                 $(".loading").hide();
                $("#error_show_sm").empty();
                err_str = '';
                for (var i = 0; i < data.data.length; i++){
                    err_str +='<li><span>第'+data.data[i].i+'个</span>'+data.data[i].reason+'</li>';
                }
                $("#error_show_sm").append(err_str);
                $(".offer-error").show();
                $(".edit-form-bg,.sure-btn").on("click", function () {
                    $(".offer-error").hide();
                })
            }
            else if (data.ret == 2) {
                alert(data.message);
                $("#over").hide();
                $("#layout").hide();
                 window.location.reload();
            }
            else if (data.ret == 0) {
                alert('上传excel包成功...\n\n\n成功导入' + data.itemToDbSuccess + '个offer信息');
                for (var i = 0; i < data.data.length; i++){
                    alert('第'+data.data[i].i+'个，'+data.data[i].reason);
                }
                $("#over").hide();
                $("#layout").hide();
                window.location.reload();
            }
            else if (data.message == '导入成功') {
                alert('上传excel包成功...\n\n\n成功导入' + data.itemToDbSuccess + '个offer信息');
                $("#over").hide();
                $("#layout").hide();
                window.location.reload();
            }
            else if (data.message == '导入失败') {
                alert('上传文件为空或者非excel包!');
                $("#over").hide();
                $("#layout").hide();
                 window.location.reload();
            }
        },
        "error": function (xhr, status, error) {
            alert("提交失败：excel格式错误！");
            $("#over").hide();
            $("#layout").hide();
             window.location.reload();
        },
        resetForm: true,
        clearForm: true

    });
    return false;
});


//zip1包批量上传
$("#browseZip3").on('change', function () {
    var fullPath = $(this).val();
    var getSuffix = fullPath.split('.');
    if (getSuffix[getSuffix.length - 1] != 'zip') {
        if (getSuffix[getSuffix.length - 1] != 'zip'){
            alert("请选择zip包文件！");
            return false;
        }
    }
    var filaName = fullPath.split('\\');
    filaName = filaName[filaName.length - 1];
    $('#offer_zip').val(filaName);
    $("#btn-upload3").attr('disabled',false);
    //$("#browseZip").attr('disabled',true);
    $("#browseFle3").attr('disabled',true);
    return true;
});

$("#form_sample3").submit(function () {
    $("#up_gif").show();
    var params = $("#form_sample3").formToArray();
    $("#form_sample3").ajaxSubmit({
        "url": "/offer/api/fileUploadOfferZip/",
        "data": params,
        "type": 'post',
        "dataType": 'json',
        "beforeSend": function () {
            $("#over").show();
            $("#layout").show();
        },
        "success": function (data) {
            $("#up_gif").hide();
            if (data.ret == 1) {
                alert(data.message);
                var pathname = window.location.pathname;
                var search = window.location.search;
                var url = '/admin?srcurl=' + pathname + search;
                window.location.href = url;
            }
            else if (data.ret == 2) {
                alert(data.message);
                $("#over").hide();
                $("#layout").hide();
            }
            else if (data.message == '导入成功') {
                alert('上传zip包成功...\n\n\n成功导入' + data.itemToDbSuccess + '个offer信息');
                $("#over").hide();
                $("#layout").hide();
                window.location.reload();
            }
            else if (data.message == '导入失败') {
                alert('上传文件为空或者非zip包!');
                $("#over").hide();
                $("#layout").hide();
                 window.location.reload();
            }
            else if (data.message == 'zip包格式不符') {
                alert('zip包格式不符，请按照规定格式上传！');
                $("#over").hide();
                $("#layout").hide();
                 window.location.reload();
            }
        },
        "error": function (xhr, status, error) {
            alert("提交失败：" + error);
            $("#over").hide();
            $("#layout").hide();
             window.location.reload();
        },
        resetForm: true,
        clearForm: true

    });
    return false;
});

//zip2包批量上传
$("#browseZip4").on('change', function () {
    var fullPath = $(this).val();
    var getSuffix = fullPath.split('.');
    if (getSuffix[getSuffix.length - 1] != 'zip') {
        if (getSuffix[getSuffix.length - 1] != 'zip'){
            alert("请选择zip包文件！");
            return false;
        }
    }
    var filaName = fullPath.split('\\');
    filaName = filaName[filaName.length - 1];
    $('#offer_zip2').val(filaName);
    $("#btn-upload4").attr('disabled',false);
    //$("#browseZip").attr('disabled',true);
    $("#browseFle4").attr('disabled',true);
    return true;
});

$("#form_sample4").submit(function () {
    $("#up_gif").show();
    var params = $("#form_sample4").formToArray();
    $("#form_sample4").ajaxSubmit({
        "url": "/merchant/api/fileuploadZip2/",
        "data": params,
        "type": 'post',
        "dataType": 'json',
        "beforeSend": function () {
            $("#over").show();
            $("#layout").show();
        },
        "success": function (data) {
            $("#up_gif").hide();
            if (data.ret == 1) {
                alert(data.message);
                var pathname = window.location.pathname;
                var search = window.location.search;
                var url = '/admin?srcurl=' + pathname + search;
                window.location.href = url;
            }
            else if (data.ret == 2) {
                alert(data.message);
                $("#over").hide();
                $("#layout").hide();
            }
            else if (data.message == '导入成功') {
                alert('上传zip包成功...\n\n\n成功导入' + data.itemToDbSuccess + '个offer信息');
                $("#over").hide();
                $("#layout").hide();
                window.location.reload();
            }
            else if (data.message == '导入失败') {
                alert('上传文件为空或者非zip包!');
                $("#over").hide();
                $("#layout").hide();
                 window.location.reload();
            }
            else if (data.message == 'zip包格式不符') {
                alert('zip包格式不符，请按照规定格式上传！');
                $("#over").hide();
                $("#layout").hide();
                 window.location.reload();
            }
        },
        "error": function (xhr, status, error) {
            alert("提交失败：" + error);
            $("#over").hide();
            $("#layout").hide();
             window.location.reload();
        },
        resetForm: true,
        clearForm: true

    });
    return false;
});

//logo 图
$("#browseZip1").on('change', function () {
    var fullPath = $(this).val();
    var getSuffix = fullPath.split('.');
    if (getSuffix[getSuffix.length - 1] != 'AI') {
        if (getSuffix[getSuffix.length - 1] != 'ESP'){
            alert("请选择AI文件！");
            return false;
        }
    }
    var filaName = fullPath.split('\\');
    filaName = filaName[filaName.length - 1];
    $('#merchant_logo_ai').val(filaName);
    $("#btn-upload1").attr('disabled',false);
    //$("#browseZip").attr('disabled',true);
    $("#browseFle").attr('disabled',true);
    return true;
});

$("#form_sample1").submit(function () {
    var params = $("#form_sample1").formToArray();
    params.push({name: "flag", required: false, type: "text", value: 1});
    $("#form_sample1").ajaxSubmit({
        "url": "/offer/api/fileUploadOfferImg/",
        "data": params,
        "type": 'post',
        "dataType": 'json',
        "beforeSend": function () {
            $("#over").show();
            $("#layout").show();
        },
        "success": function (data) {
            if (data.ret == 1) {
                alert(data.message);
                var pathname = window.location.pathname;
                var search = window.location.search;
                var url = '/admin?srcurl=' + pathname + search;
                window.location.href = url;
            }
            else if (data.ret == 2) {
                alert(data.message);
                $("#over").hide();
                $("#layout").hide();
            }
            else if (data.message == '导入成功') {
                alert('成功导入' + data.itemToDbSuccess + '文件');
                $('#merchant_logo_ai').val(data.itemToDbSuccess);
                $("#btn-upload1").attr('disabled',true);
                $("#over").hide();
                $("#layout").hide();
            }
            else if (data.message == '导入失败') {
                alert('上传文件为空或者非AI包!');
                $("#over").hide();
                $("#layout").hide();
            }
        },
        "error": function (xhr, status, error) {
            alert("提交失败：" + error);
            $("#over").hide();
            $("#layout").hide();
        },
        resetForm: true,
        clearForm: true

    });
    return false;
});

//logo jpg文件
$("#browseZip2").on('change', function () {
    var fullPath = $(this).val();
    var getSuffix = fullPath.split('.');
    if (getSuffix[getSuffix.length - 1] != 'jpg') {

            alert("请选择jpg文件！");
            return false;

    }
    var filaName = fullPath.split('\\');
    filaName = filaName[filaName.length - 1];
    $('#merchant_logo').val(filaName);
    $("#btn-upload2").attr('disabled',false);
    //$("#browseZip").attr('disabled',true);
    $("#browseFle").attr('disabled',true);
    return true;
});

$("#form_sample2").submit(function () {
    var params = $("#form_sample2").formToArray();
    params.push({name: "flag", required: false, type: "text", value: 2});
    $("#form_sample2").ajaxSubmit({
        "url": "/offer/api/fileUploadOfferImg/",
        "data": params,
        "type": 'post',
        "dataType": 'json',
        "beforeSend": function () {
            $("#over").show();
            $("#layout").show();
        },
        "success": function (data) {
            if (data.ret == 1) {
                alert(data.message);
                var pathname = window.location.pathname;
                var search = window.location.search;
                var url = '/admin?srcurl=' + pathname + search;
                window.location.href = url;
            }
            else if (data.ret == 2) {
                alert(data.message);
                $("#over").hide();
                $("#layout").hide();
            }
            else if (data.message == '导入成功') {
                alert('成功导入' + data.itemToDbSuccess + '文件');
                $('#merchant_logo').val(data.itemToDbSuccess);
                $("#btn-upload2").attr('disabled',true);
                var logo_src = "/upload/temp/"+data.itemToDbSuccess;
                $("#logo_show img").attr('src',logo_src)
                $("#over").hide();
                $("#layout").hide();
            }
            else if (data.message == '导入失败') {
                alert('上传文件为空或者非AI包!');
                $("#over").hide();
                $("#layout").hide();
            }
        },
        "error": function (xhr, status, error) {
            alert("提交失败：" + error);
            $("#over").hide();
            $("#layout").hide();
        },
        resetForm: true,
        clearForm: true

    });
    return false;
});

//logo 头图文件
$("#browseZip21").on('change', function () {
    var fullPath = $(this).val();
    var getSuffix = fullPath.split('.');
    if (getSuffix[getSuffix.length - 1] != 'jpg') {

            alert("请选择jpg文件！");
            return false;

    }
    var filaName = fullPath.split('\\');
    filaName = filaName[filaName.length - 1];
    $('#merchant_logo_img').val(filaName);
    $("#btn-upload21").attr('disabled',false);
    //$("#browseZip").attr('disabled',true);
    $("#browseFle").attr('disabled',true);
    return true;
});

$("#form_sample21").submit(function () {
    var params = $("#form_sample2").formToArray();
    params.push({name: "flag", required: false, type: "text", value: 3});
    $("#form_sample21").ajaxSubmit({
        "url": "/offer/api/fileUploadOfferImg/",
        "data": params,
        "type": 'post',
        "dataType": 'json',
        "beforeSend": function () {
            $("#over").show();
            $("#layout").show();
        },
        "success": function (data) {
            if (data.ret == 1) {
                alert(data.message);
                var pathname = window.location.pathname;
                var search = window.location.search;
                var url = '/admin?srcurl=' + pathname + search;
                window.location.href = url;
            }
            else if (data.ret == 2) {
                alert(data.message);
                $("#over").hide();
                $("#layout").hide();
            }
            else if (data.message == '导入成功') {
                alert('成功导入' + data.itemToDbSuccess + '文件');
                $('#merchant_logo_img').val(data.itemToDbSuccess);
                $("#btn-upload21").attr('disabled',true);
                var logo_src = "/upload/temp/"+data.itemToDbSuccess;
                $("#logo_show21 img").attr('src',logo_src);
                $("#over").hide();
                $("#layout").hide();
            }
            else if (data.message == '导入失败') {
                alert('上传文件为空或者非AI包!');
                $("#over").hide();
                $("#layout").hide();
            }
        },
        "error": function (xhr, status, error) {
            alert("提交失败：" + error);
            $("#over").hide();
            $("#layout").hide();
        },
        resetForm: true,
        clearForm: true

    });
    return false;
});

//权益主图
$("#browseZip22").on('change', function () {
    var fullPath = $(this).val();
    var getSuffix = fullPath.split('.');
    if (getSuffix[getSuffix.length - 1] != 'jpg') {

            alert("请选择jpg文件！");
            return false;

    }
    var filaName = fullPath.split('\\');
    filaName = filaName[filaName.length - 1];
    $('#offer_thumb_img').val(filaName);
    $("#btn-upload22").attr('disabled',false);
    //$("#browseZip").attr('disabled',true);
    $("#browseFle").attr('disabled',true);
    return true;
});

$("#form_sample22").submit(function () {
    var params = $("#form_sample22").formToArray();
    params.push({name: "flag", required: false, type: "text", value: 4});
    $("#form_sample22").ajaxSubmit({
        "url": "/offer/api/fileUploadOfferImg/",
        "data": params,
        "type": 'post',
        "dataType": 'json',
        "beforeSend": function () {
            $("#over").show();
            $("#layout").show();
        },
        "success": function (data) {
            if (data.ret == 1) {
                alert(data.message);
                var pathname = window.location.pathname;
                var search = window.location.search;
                var url = '/admin?srcurl=' + pathname + search;
                window.location.href = url;
            }
            else if (data.ret == 2) {
                alert(data.message);
                $("#over").hide();
                $("#layout").hide();
            }
            else if (data.message == '导入成功') {
                alert('成功导入' + data.itemToDbSuccess + '文件');
                $('#offer_thumb_img').val(data.itemToDbSuccess);
                $("#btn-upload22").attr('disabled',true);
                var logo_src = "/upload/temp/"+data.itemToDbSuccess;
                $("#thumb_show22 img").attr('src',logo_src);
                $("#over").hide();
                $("#layout").hide();
            }
            else if (data.message == '导入失败') {
                alert('上传文件为空或者非AI包!');
                $("#over").hide();
                $("#layout").hide();
            }
        },
        "error": function (xhr, status, error) {
            alert("提交失败：" + error);
            $("#over").hide();
            $("#layout").hide();
        },
        resetForm: true,
        clearForm: true

    });
    return false;
});


//zip1包批量上传
$("#browseZip77").on('change', function () {
    var fullPath = $(this).val();
    var getSuffix = fullPath.split('.');
    if (getSuffix[getSuffix.length - 1] != 'zip') {
        if (getSuffix[getSuffix.length - 1] != 'zip'){
            alert("请选择zip包文件！");
            return false;
        }
    }
    var filaName = fullPath.split('\\');
    filaName = filaName[filaName.length - 1];
    alert(filaName)
    $('#offer_zip77').val(filaName);
    $("#btn-upload77").attr('disabled',false);
    //$("#browseZip").attr('disabled',true);
    $("#browseFle77").attr('disabled',true);
    return true;
});


$("#form_sample77").submit(function () {
    $("#up_gif").show();
    var params = $("#form_sample77").formToArray();
    $("#form_sample77").ajaxSubmit({
        "url": "/offer/api/fileUploadOfferZipPcc/",
        "data": params,
        "type": 'post',
        "dataType": 'json',
        "beforeSend": function () {
            $("#over").show();
            $("#layout").show();
        },
        "success": function (data) {
            $("#up_gif").hide();
            if (data.ret == 1) {
                alert(data.message);
                var pathname = window.location.pathname;
                var search = window.location.search;
                var url = '/admin?srcurl=' + pathname + search;
                window.location.href = url;
            }
            else if (data.ret == 2) {
                alert(data.message);
                $("#over").hide();
                $("#layout").hide();
            }
            else if (data.message == '导入成功') {
                alert('上传zip包成功...\n\n\n成功导入' + data.itemToDbSuccess + '个offer信息');
                $("#over").hide();
                $("#layout").hide();
                window.location.reload();
            }
            else if (data.message == '导入失败') {
                alert('上传文件为空或者非zip包!');
                $("#over").hide();
                $("#layout").hide();
                 window.location.reload();
            }
            else if (data.message == 'zip包格式不符') {
                alert('zip包格式不符，请按照规定格式上传！');
                $("#over").hide();
                $("#layout").hide();
                 window.location.reload();
            }
        },
        "error": function (xhr, status, error) {
            alert("提交失败：" + error);
            $("#over").hide();
            $("#layout").hide();
             window.location.reload();
        },
        resetForm: true,
        clearForm: true

    });
    return false;
});





