/**
 * Created by insight on 17/5/8.
 */
$('#forgetpass').on('click', function (e) {
    var params = {};
    params['email'] = $('#email').val();
    if (!params['email'])
    {
        alert("请输入email地址！");
        return false;
    }
     $.ajax({
        "dataType": "json",
        "type": "post",
        "url": "/forgotpass/",
        "data": params,
        "success": function (data) {
            if (data.ret == 1) {
                alert("重置密码邮件发送成功！请检查邮件后进行重置密码");
                location.href="/admin/";

            }
            else if (data.ret == 0)
            {
                alert("邮件服务器正忙，请稍后再试！");
                location.href="/admin/";
            }
            else if (data.ret == 404)
            {
                alert("所输入邮件地址不存在，请检查后重新输入！");
                location.reload();
            }
            else {
                location.reload();
            }
        },
        "error": function (xhr, status, error) {

        }
    });
    $("#forgetpass").hide()
    $(".btn.disabled").show();
})

$('#saveNewPass').on('click', function (e) {
    params = {};
    params['userkey'] = $('.onlymark').attr('value');
    params['password1'] = $('#password1').val();
    params['password2'] = $('#password2').val();
    if (params['password1'] != params['password2']) {
        alert("新密码两次输入不匹配，请重新输入！");
        return false;
    }
    if (!params['password1']) {
        alert('请输入新密码!');
        return false;
    }
    if (!params['password2']) {
        alert('请重新输入新密码!');
        return false;
    }
    $.ajax({
        "dataType": "json",
        "type": "post",
        "url": "/showSetPassword/",
        "data": params,
        "success": function (data) {
            if (data.ret == 1) {
                alert("修改密码成功！");
                location.href="/admin/";
            }
            else {
                alert("链接已失效，请重新进行忘记密码操作！");
                location.href="/admin/";
            }
        },
        "error": function (xhr, status, error) {

        }
    });
})
