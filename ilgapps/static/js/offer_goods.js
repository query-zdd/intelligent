/**
 * Created by insight on 17/6/12.
 */
var goods = function () {

    return {

        init: function () {

            // $('#pos').on('change', function () {
            //     if ($(this).find('[value="' + $(this).val() + '"]').attr('size') != "") {
            //         $('#sizeRecommendesc').show();
            //         $('#sizeRecommend').html($(this).find('[value="' + $(this).val() + '"]').attr('size'));
            //     }
            //     else {
            //         $('#sizeRecommendesc').hide();
            //     }
            // });

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

            $('#saveGoods').on('click', function (e) {
                e.preventDefault;
                params = {};
                params['goods_name'] = $('#goods_name').val();
                params['bannerPicName'] = $('#bannerPicName').val();
                params['goods_sn'] = $('#goods_sn').val();
                params['price'] = $('#price').val();
                params['goods_content'] = $('#goods_content').val();
                params['goods_info'] = $('#goods_info').val();
                params['bannerUrl'] = $('#bannerUrl').val();
                if ($('#goods_id').val()) {
                    params['goods_id'] = $('#goods_id').val();
                }
                $.ajax({
                    "url": "/offer/api/saveGoods/",
                    "data": params,
                    "type": 'post',
                    "dataType": 'json',
                    "success": function (data) {
                        if (data.ret == 0) {
                            alert('保存成功');
                            // $(".pop-box").fadeOut();
                            $('#responsive').modal('hide');
                            location.reload();
                        }
                    },
                    "error": function (xhr, status, error) {
                        alert("上传失败：" + error);
                    }
                });

            });

            $('#newGoods').on('click', function (e) {
                //alert("22");
                // $(".pop-box").fadeIn();
                e.preventDefault();
                $('#goods_name').val(null);
                $('#goods_sn').val(null);
                $('#price').val(null);
                $('#goods_content').val(null);
                $('#goods_info').val(null);
                $('#goods_id').val(null);
                $('#showBanner').empty();
                $('#bannerUrl').val(null);
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
                    "url": "/offer/api/goodsOperation/",
                    "data": params,
                    "success": function (data) {
                        $(".pop-box").fadeIn();
                        $('#goods_name').val(data.msg.goods_name);
                        $('#goods_sn').val(data.msg.goods_sn);
                        $('#price').val(data.msg.goods_price);
                        $('#goods_content').val(data.msg.goods_content);
                        $('#goods_info').val(data.msg.goods_info);
                        $('#goods_id').val(data.msg.goods_id);
                        var img = $('<img/>');
                        img.css('width', '100%');
                        img.attr('src',  data.msg.goods_img);
                        $('#showBanner').empty();
                        $('#showBanner').append(img);
                        $('#bannerUrl').val(data.msg.goods_img);
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
                    "url": "/offer/api/goodsOperation/",
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


            $(".gyqx").on('click', function (e) {
                // $(".pop-box").fadeOut();
                $('#responsive').modal('hide');
            })
        }
    }
}();