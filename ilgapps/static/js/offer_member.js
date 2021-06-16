/**
 * Created by insight on 17/6/12.
 */
var member = function () {

    return {

        init: function () {

            $('#bannerPicUpload').on('change', function () {
                var fullPath = $(this).val();
                var getSuffix = fullPath.split('.');
                var ext = getSuffix[getSuffix.length - 1];
                var extArray = new Array("jpg", "bmp", "jpeg", "png", "gif");
                var pos = $.inArray(ext, extArray);
                if (pos == -1) {
                    alert('请选择常用图片格式:jpg,bmp,jpeg,png等..');
                    return false;
                }
                var params = $("#form_sample").formToArray();
                $("#form_sample").ajaxSubmit({
                    "url": "/utils/api/upload_file/",
                    "data": params,
                    "type": 'post',
                    "dataType": 'json',
                    "success": function (data) {
                        var img = $('<img/>');
                        img.css('width', '100%');
                        img.attr('src', '/upload/temp/' + data.filename);
                        $('#showBanner').empty();
                        $('#showBanner').append(img);
                        $('#bannerPicName').val(data.filename);
                    },
                    "error": function (xhr, status, error) {
                        alert("上传失败：" + error);
                    }
                });
            });

            $('#saveMember').on('click', function (e) {
                e.preventDefault;
                params = {};
                params['member_name'] = $('#member_name').val();
                params['bannerPicName'] = $('#bannerPicName').val();
                params['card'] = $('#card').val();
                params['age'] = $('#age').val();
                params['address'] = $('#address').val();
                params['email'] = $('#email').val();
                params['password'] = $('#password').val();
                params['person_id'] = $('#person_id').val();
                params['bannerUrl'] = $('#bannerUrl').val();

                $.ajax({
                    "url": "/offer/api/saveMember/",
                    "data": params,
                    "type": 'post',
                    "dataType": 'json',
                    "success": function (data) {
                        if (data.ret == 0) {
                            alert('保存成功');
                            $(".pop-box").fadeOut();
                            $('#responsive').modal('hide');
                            location.reload();
                        }
                    },
                    "error": function (xhr, status, error) {
                        alert("上传失败：" + error);
                    }
                });

            });

            $('#newBanner').on('click', function (e) {
                //alert("22");
                $(".pop-box").fadeIn();
                e.preventDefault();
                $('#member_name').val(null);
                $('#card').val(null);
                $('#age').val(null);
                $('#address').val(null);
                $('#email').val(null);
                $('#password').val(null);
                $('#showBanner').empty();
                $('#responsive').modal();
            });

            $(".edit").on('click', function (e) {
                 e.preventDefault();
                var params={};
                params['id'] = $(this).attr('id');
                params['operationcode'] = "query";
                $.ajax({
                    "dataType": "json",
                    "type": "post",
                    "url": "/offer/api/memberOperation/",
                    "data": params,
                    "success": function (data) {
                        $(".pop-box").fadeIn();
                        $('#member_name').val(data.msg.member_name);
                        $('#card').val(data.msg.card);
                        $('#age').val(data.msg.age);
                        $('#address').val(data.msg.address);
                        $('#email').val(data.msg.email);
                        $('#person_id').val(data.msg.person_id);
                        $('#password').val(data.msg.password);
                        var img = $('<img/>');
                        img.css('width', '100%');
                        img.attr('src',  data.msg.image);
                        $('#showBanner').empty();
                        $('#showBanner').append(img);
                        $('#bannerUrl').val(data.msg.image);
                        $('#responsive').modal();
                    },
                    "error": function (xhr, status, error) {
                        alert("Fail to load：" + error);
                    }
                })
            });

            $(".remove").on('click', function (e) {
                params = {};
                params['id'] = $(this).attr('id');
                params['operationcode'] = "remove";
                $.ajax({
                    "dataType": "json",
                    "type": "post",
                    "url": "/offer/api/memberOperation/",
                    "data": params,
                    "success": function (data) {
                        alert("删除成功");
                        location.reload();
                    },
                    "error": function (xhr, status, error) {
                        alert("Fail to load：" + error);
                    }
                })
            });


            $(".pop-box").on('click', function (e) {
                $(".pop-box").fadeOut();
                $('#responsive').modal('hide');
            });

            $(".gyqx").on('click', function (e) {
                $(".pop-box").fadeOut();
                $('#responsive').modal('hide');
            })
        }
    }
}();