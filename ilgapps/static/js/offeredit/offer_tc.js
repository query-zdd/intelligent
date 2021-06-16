var offer = function () {

//初始图片上传控件dropzone
    // 不同模块图片上传标记:1、缩略图，2、配图多图
    //缩略图
    var picNameList1 = new Array();
    $('.fileupload-preview1').find('img').each(function () {
        var tmpList = $(this).attr('src').split('/');
        var picName = tmpList[tmpList.length - 1];
        picNameList1.push(picName);
    });
    var initImageUpload = function () {

        imgDropzone = $("#fmUpload").dropzone({
            paramName: "resource",
            url: "/utils/api/upload_file/",
            dictDefaultMessage: "将文件拖拽至此区域进行上传（或点击此区域）",
            acceptedFiles: "image/*",
            parallelUploads: 1,
            maxFilesize: 1,
            maxFiles: 5,

            accept: function (file, done) {
                if (picNameList1.length >= 5) {
                    done('最多上传5张主图！请先删除');
                }
                else {
                    done();
                }
            },
            sending: function () {
                $("#btnUploadImage").html('上传中...');
            },
            success: function (file, data) {
                jsondata = JSON.parse(data);
                if (0 === jsondata.ret) { //"success"==file.status &&
                    //$("#nativeUploadPicURI").val(jsondata.fileuri);
                    $("#btnUploadImage").html('确定');
                    var img = new Image();
                    img.src = '/upload/temp/' + jsondata.filename;
                    img.width = 64;
                    img.height = 64;
                    var node = $('<div style="marin:10px"></div>');
                    node.append('<i class="fa fa-trash-o" title="删除" style="margin:30px;cursor:pointer;"></i>')
                    node.append(img);
                    $('.fileupload-preview1').append(node);
                    picNameList1.push(jsondata.filename);
                    //上传成功 保存上传图片地址至xx，修改按钮名称，否则上传失败弹出alter提示


                }
                else {
                    alert("图片添加失败，请重新上传图片!");
                    this.removeFile(file);
                    $("#btnUploadImage").html('确定');
                }
            },
            "error": function (file, xhr, status, error) {
                alert("上传文件失败：" + xhr);
                this.removeFile(file);
                $("#btnUploadImage").html('确定');
            }
        });

    };

    return {
        //main function to initiate the module
        init: function () {

            initImageUpload();//初始图片上传dropzone
            //图片上传窗口确定按钮click事件
            $('#btnUploadImage').on('click', function (e) {
                var uploadImageTabId = $(".tabbable li.active").attr('id');
                if (uploadImageTabId == "nativeUploadTab") {
                    //选择本地上传
                    //if ($("#nativeUploadPicURI").val()) {
                    //    $("#picUrl").val($("#nativeUploadPicURI").val());
                    //    $("#picName").val($("#nativeUploadPicName").val());
                    //
                    //}

                }
                //else if (uploadImageTabId == "wwwUploadTab") {
                //    //选择网络图片
                //    if ($('#wwwUploadPicURL').val()) {
                //        $("#picUrl").val($('#wwwUploadPicURL').val());
                //        $("#picName").val("");
                //    }
                //
                //}
                //$("#newspic").attr("src", $("#picUrl").val())
                // $('#fmUpload').removeClass("dz-started");
                // $('.dz-image-preview').remove();


                Dropzone.instances[0].removeAllFiles();
                //$('#wwwUploadPicURL').val("");
                //$("#nativeUploadPicURI").val("");
                //$("#nativeUploadPicName").val("");
                $("#edit-modal-form2").modal('hide');
            });

            var form2 = $('#form_sample_2');
            var error2 = $('.alert-error', form2);
            var success2 = $('.alert-success', form2);
            //表单校验
            form2.validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-inline', // default input error message class
                focusInvalid: false, // do not focus the last invalid input
                ignore: "",
                rules: {

                     benefit_name: { //
                        required: true
                    },

                     enjoy_special: { //
                        required: true
                    },

                     special_details: { //
                        required: true
                    },

                     offer_rule: { //
                        required: true
                    }

                },

                messages: { // custom messages for radio buttons and checkboxes
                    membership: {
                        required: "Please select a Membership type"
                    },
                    service: {
                        required: "Please select  at least 2 types of Service",
                        minlength: jQuery.format("Please select  at least {0} types of Service")
                    },
                    tags_1: {
                        required: "请输入商品的sku值，并点击下方商品规格的显示按钮，输入商品的价格参数！",
                        minlength: jQuery.format("Please select  at least {0} types of Service")
                    }
                },

                errorPlacement: function (error, element) { // render error placement for each input type
                    if (element.attr("title") == "education") { // for chosen elements, need to insert the error after the chosen container
                        error.insertAfter("#form_2_education_chzn");
                    } else if (element.attr("name") == "membership") { // for uniform radio buttons, insert the after the given container
                        error.addClass("no-left-padding").insertAfter("#form_2_membership_error");
                    } else if (element.attr("title") == "service") { // for uniform checkboxes, insert the after the given container
                        error.addClass("no-left-padding").insertAfter("#form_2_service_error");
                    } else {
                        error.insertAfter(element); // for other inputs, just perform default behavoir
                    }
                },

                invalidHandler: function (event, validator) { //display error alert on form submit
                    success2.hide();
                    error2.show();
                    // App.scrollTo(error2, -200);
                },

                highlight: function (element) { // hightlight error inputs
                    $(element)
                        .closest('.help-inline').removeClass('ok'); // display OK icon
                    $(element)
                        .closest('.control-group').removeClass('success').addClass('error'); // set error class to the control group
                },

                unhighlight: function (element) { // revert the change dony by hightlight
                    $(element)
                        .closest('.control-group').removeClass('error'); // set error class to the control group
                },

                success: function (label) {
                    if (label.attr("for") == "service" || label.attr("for") == "membership") { // for checkboxes and radip buttons, no need to show OK icon
                        label
                            .closest('.control-group').removeClass('error').addClass('success');
                        label.remove(); // remove error label here
                    } else { // display success icon for other inputs
                        label
                            .addClass('valid').addClass('help-inline ok') // mark the current input as valid and display OK icon
                            .closest('.control-group').removeClass('error').addClass('success'); // set success class to the control group
                    }
                },
                doAction: function (form) {
                    success2.show();
                    error2.hide();
                },
                submitHandler: function (form) {
                    success2.show();
                    error2.hide();
                }

            });

            //apply validation on chosen dropdown value change, this only needed for chosen dropdown integration.
            $('.chosen, .chosen-with-diselect', form2).change(function () {
                form2.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
            });

            //apply validation on select2 dropdown value change, this only needed for chosen dropdown integration.
            $('.select2', form2).change(function () {
                form2.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
            });


            $("#form_sample_2").submit(function () {
                if (!form2.valid()) {
                    scrollTo(0, document.height || document.body.style.height);
                    return false;
                }

                var is_on_sale = 0;
                if ($('#isOnSale').attr('checked')) {
                     is_on_sale = 1
                 }
                var card_common = 0;
                var card_golden = 0;
                var card_titanium = 0;
                var card_platinum = 0;
                var card_world_elite = 0;
                var card_world = 0;
                var card_business = 0;
                var card_business_corporate = 0;
                var card_titanium_commercial = 0;

                var card_golden_j = 0;
                var card_platinum_j = 0;
                var card_world_j = 0;
                if ($('#card_golden_j').is(":checked")) {
                    card_golden_j = 1
                }
                if ($('#card_platinum_j').is(":checked")) {
                    card_platinum_j = 1
                }
                if ($('#card_world_j').is(":checked")) {
                    card_world_j = 1
                }
                if ($('#card_common').is(":checked")) {
                    card_common = 1
                }
                if ($('#card_golden').is(":checked")) {
                    card_golden = 1
                }
                if ($('#card_titanium').is(":checked")) {
                    card_titanium = 1
                }
                if ($('#card_platinum').is(":checked")) {
                    card_platinum = 1
                }
                if ($('#card_world_elite').is(":checked")) {
                    card_world_elite = 1
                }
                if ($('#card_world').is(":checked")) {
                    card_world = 1
                }
                if ($('#card_business').is(":checked")) {
                    card_business = 1
                }
                if ($('#card_business_corporate').is(":checked")) {
                    card_business_corporate = 1
                }
                if ($('#card_titanium_commercial').is(":checked")) {
                    card_titanium_commercial = 1
                }


                var groupstr = '';
                var catid = '';
                var cityid = '';
                var chauid = '';
                var countryid = '';


                var params = $("#form_sample_2").formToArray();
                //mccann
                var flag = $("#submit_mccann").attr('rol');
                if (flag) {
                    params.push({name: "flag", required: false, type: "text", value: flag});
                }
                params.push(
                    {name: "is_on_sale", required: false, type: "text", value: is_on_sale},
                    {name: "card_golden_j", required: false, type: "text", value: card_golden_j},
                    {name: "card_platinum_j", required: false, type: "text", value: card_platinum_j},
                    {name: "card_world_j", required: false, type: "text", value: card_world_j},
                    {name: "card_common", required: false, type: "text", value: card_common},
                    {name: "card_golden", required: false, type: "text", value: card_golden},
                    {name: "card_titanium", required: false, type: "text", value: card_titanium},
                    {name: "card_platinum", required: false, type: "text", value: card_platinum},
                    {name: "card_world_elite", required: false, type: "text", value: card_world_elite},
                    {name: "card_world", required: false, type: "text", value: card_world},
                    {name: "card_business", required: false, type: "text", value: card_business},
                    {name: "card_business_corporate", required: false, type: "text", value: card_business_corporate},
                    {name: "card_titanium_commercial", required: false, type: "text", value: card_titanium_commercial},
                    {name: "merchant_logo_ai", required: false, type: "text", value: $('#merchant_logo_ai').val()},
                    {name: "merchant_logo", required: false, type: "text", value: $('#merchant_logo').val()},
                    {name: "merchant_logo_img", required: false, type: "text", value: $('#merchant_logo_img').val()},
                    {name: "offer_thumb_img", required: false, type: "text", value: $('#offer_thumb_img').val()},
                    {name: "picNameList1", required: false, type: "text", value: JSON.stringify(picNameList1)},
                    {
                        name: "desccontent",
                        required: false,
                        type: "text",
                        value: CKEDITOR.instances['editor1'].getData()
                    },
                    {
                        name: "desccontent2",
                        required: false,
                        type: "text",
                        value: CKEDITOR.instances['editor2'].getData()
                    },
                    {
                        name: "desccontent3",
                        required: false,
                        type: "text",
                        value: CKEDITOR.instances['editor3'].getData()
                    }
                );

                //商品类别
                $("#categoryst").find("input[flag='checka']").each(function(e){
                    //判断当前点击的复选框处于什么状态$(this).is(":checked") 返回的是布尔类型
                    var cat_id = $(this).attr('tag');
                    var cat_str = "input[name='b"+cat_id+"']";
                    if ($(this).is(":checked")) {
                        catid = catid + cat_id+ ';';
                    }
                    else {
                        $(this).parents('.yiji').find(cat_str).each(function(e){
                            var cat_id1 = $(this).attr('tag');
                            var cat_str1 = "input[name='c"+cat_id1+"']";
                            if ($(this).is(":checked")) {
                                catid = catid + cat_id1+ ';';
                             }
                            else {
                                $(this).parents('.yiji').find(cat_str1).each(function (e) {
                                    var cat_id2 = $(this).attr('tag');
                                     if ($(this).is(":checked")) {
                                        catid = catid + cat_id2+ ';';
                                     }
                                });
                            }
                        });
                    }

                });
                params.push({name: "cat_id", required: false, type: "text", value: catid});
                //国家地区
                var chau_flag = 0
                 $("#diqubianma").find("input[flag='checka']").each(function(e){
                    //判断当前点击的复选框处于什么状态$(this).is(":checked") 返回的是布尔类型
                    var chau_id = $(this).attr('tag');
                    var chau_str= "input[name='b"+chau_id+"']";
                    if ($(this).is(":checked")) {
                        if(chau_id==0){
                            chau_flag= 1;

                        }
                        chauid = chauid + chau_id+ ';';
                    }
                    else {
                        $(this).parents('.yiji').find(chau_str).each(function(e){
                            var country_id = $(this).attr('tag');
                            var country_str = "input[name='c"+country_id+"']";
                            if ($(this).is(":checked")) {
                                countryid = countryid + country_id+ ';';
                             }
                            else {
                                $(this).parents('.yiji').find(country_str).each(function (e) {
                                    var city_id = $(this).attr('tag');
                                     if ($(this).is(":checked")) {
                                        cityid = cityid + city_id+ ';';
                                     }
                                });
                            }
                        });
                    }

                });
                if (chau_flag==1){
                    chauid = '0;';
                    cityid='';
                    countryid = '';
                }
                params.push({name: "country_id", required: false, type: "text", value: countryid});
                params.push({name: "city_id", required: false, type: "text", value: cityid});
                params.push({name: "chau_id", required: false, type: "text", value: chauid});
                params.push({name: "keywords", required: false, type: "text", value: $('#keywords').val()});

                $("#form_sample_2").ajaxSubmit({

                    "url": "/offer/api/saveOfferTc/",
                    "data": params,
                    "type": 'post',
                    "dataType": 'json',
                    "success": function (data) {
                        alert("保存成功");
                        var str_url = document.referrer;
                        window.location.href = str_url;
                    },
                    "error": function (xhr, status, error) {
                        alert("保存失败：请检查数据完整性！" );
                    },
                    resetForm: true,
                    clearForm: true

                });
                return false;
            });

            // 选择图片
            $('#selPicBtn1').on('click', function (e) {
                alert('1');
               e.preventDefault();
                if (picNameList1.length >= 5) {
                    alert('商户主图仅可以上传5个，请先删除，再上传！');
                    return false;
                }
                $("#edit-modal-form2").modal('show');
                alert('1');
            });
            //清除图片
            $('#cleanPicBtn').on('click', function (e) {
                $("#picUrl").val("");
                $("#picName").val("");
                $("#newspic").attr("src", "");
            });
            // 删除图片
            $('.fa-trash-o').on('click', function (e) {
                e.preventDefault();
                if (confirm("确定删除此张图片吗？") == false) {
                    return;
                }
                var img = $(this).next().attr('src').split('/');
                var imgone = img[img.length - 1];
                var pos = $.inArray(imgone, picNameList1);
                if (pos != -1) {
                    picNameList1.splice(pos, 1);
                }
                $(this).parent().remove();
            });

            ////编辑记录
            //$('.exportPicFormat').on('click', function (e) {
            //    e.preventDefault();
            //    if ($('#sample_1 tbody').find(':checked').size() == 0) {
            //        alert('请选择offer');
            //        return false;
            //    }
            //    else{
            //        $('#edit-modal-form-export').modal();
            //    }
            //
            //});
            //$('#sample_1 button.edit').on('click', function (e) {
            //    //var pageNum = $("#pageNum").val();
            //    //if(pageNum){
            //    //   var oTable = $("#sample_1").DataTable();
            //    //    oTable.page(Number(pageNum)).draw(false);
            //    //}
            //    e.preventDefault();
            //    numiid = $(this).attr('id');
            //    var oTable = $("#sample_1").DataTable();
            //    var pageNum = oTable.page();
            //    window.location.href = "/merchant/offerEdit/?offer_id=" + numiid+'&pageNum='+pageNum;
            //});
            //返回
            $('#go_reback').on('click', function (e) {
                e.preventDefault();
                //window.location.href = "/merchant/showOffer/";
                var str_url = document.referrer;
                window.location.href = str_url;
                //window.location.href = window.history.go(-1);
            });
            //mccann 编辑记录
            //$('#sample_1 button.mccann_edit').on('click', function (e) {
            //    e.preventDefault()
            //    numiid = $(this).attr('id');
            //    flag = 1;
            //    var oTable = $("#sample_1").DataTable();
            //    var pageNum = oTable.page();
            //    window.location.href = "/merchant/offerEdit/?offer_id=" + numiid + "&flag=" + flag +'&pageNum='+pageNum;
            //});
            ////导出页面
            //$('#card_sel').on('change', function () {
            //    var src_str = "/offer/offerExportShow/?id=" + $("#export_pdf").attr('rol') + "&version=2017&card_type=" + $(this).val();
            //    $("#export_html_2").attr('src', src_str);
            //});
            //
            //$('#card_sel_2').on('change', function () {
            //    var src_str = "/offer/offerExportShow/?id=" + $("#export_pdf").attr('rol') + "&version=2017&card_type=" + $(this).val() + "&lang=tc";
            //    $("#export_html_4").attr('src', src_str);
            //});
            //$('#displaySel li').on('click', function () {
            //    if ($(this).find('a').attr('href') == '#tab_1') {
            //        $('#card_sel').hide();
            //    }
            //    else {
            //        $('#card_sel').show();
            //    }
            //});
            //
            //$('#sample_1 button.export').on('click', function (e) {
            //    e.preventDefault();
            //    var o_id = $(this).attr('id');
            //    $("#export_html_zip").attr('rol', $(this).attr('id'));
            //    $("#export_jpg").attr('rol', $(this).attr('id'));
            //    $("#export_pdf").attr('rol', $(this).attr('id'));
            //    var src_str = "/offer/offerExportShow/?id=" + $(this).attr('id');
            //    $("#export_html_1").attr('src', src_str);
            //    $("#export_html_3").attr('src', src_str + "&lang=tc");
            //
            //
            //    $.ajax({
            //        "dataType": "json",
            //        "type": "post",
            //        "url": "/merchant/api/getCardAvil/",
            //        "data": {'offer_id': o_id},
            //        "success": function (data) {
            //            data = data.avail;
            //            var first_show = null;
            //            for (var i = 0; i < data.length; i++) {
            //                if (data[i] == 1) {
            //                    $('#card_sel,#card_sel_2').each(function () {
            //                        $(this).find('option').eq(i).show();
            //                        if (first_show == null) {
            //                            first_show = i + 1;
            //                        }
            //                    });
            //
            //                }
            //                else {
            //                    $('#card_sel,#card_sel_2').each(function () {
            //                        $(this).find('option').eq(i).hide();
            //                    });
            //
            //                }
            //            }
            //            $('#card_sel,#card_sel_2').each(function () {
            //                $(this).find('option').each(function () {
            //                    $(this).removeAttr('selected');
            //                });
            //            });
            //
            //
            //            $("#export_html_2").attr('src', src_str + "&version=2017&card_type=" + first_show);
            //            $("#export_html_4").attr('src', src_str + "&version=2017&card_type=" + first_show + "&lang=tc");
            //            $('#card_sel,#card_sel_2').each(function () {
            //                $(this).find('option').eq(first_show - 1).attr('selected', 'selected');
            //            });
            //
            //
            //        },
            //        "error": function (xhr, status, error) {
            //            alert("系统繁忙，请稍后再试！");
            //        }
            //    });
            //
            //
            //    $("#preview").modal('show');
            //
            //});
            //$('#export_pdf').on('click', function (e) {
            //    var params = {};
            //    params['id'] = $(this).attr('rol');
            //    params['type'] = "pdf";
            //    if ($('#tab_1').hasClass('active') == true) {
            //        params['version'] = "2016";
            //    }
            //    else if($('#tab_2').hasClass('active') == true){
            //        params['version'] = "2017";
            //        params['card_type'] = $('#card_sel option:selected').val();
            //    }
            //    else if($('#tab_3').hasClass('active') == true){
            //        params['version'] = "2016";
            //        params['lang'] = 'tc';
            //    }
            //    else if($('#tab_4').hasClass('active') == true){
            //        params['version'] = "2017";
            //        params['card_type'] = $('#card_sel_2 option:selected').val();
            //        params['lang'] = 'tc';
            //    }
            //    $('#export_pdf').html('生成中..');
            //    $('#export_pdf').attr('disabled','disabled');
            //    $.ajax({
            //        "dataType": "json",
            //        "type": "post",
            //        "url": "/merchant/api/offerExport/",
            //        "data": params,
            //        "success": function (data) {
            //            if (data.ret == 0) {
            //                $('#export_pdf').html('导出pdf');
            //                $('#export_pdf').removeAttr('disabled');
            //                window.location.href = "/merchant/fileDownload/?name=" + encodeURI(data.message);
            //            }
            //
            //        },
            //        "error": function (xhr, status, error) {
            //            alert("系统繁忙，请稍后再试！");
            //        }
            //    });
            //});
            //$('#export_jpg').on('click', function (e) {
            //    var params = {};
            //    params['id'] = $(this).attr('rol');
            //    params['type'] = 'jpg';
            //    if ($('#tab_1').hasClass('active') == true) {
            //        params['version'] = "2016";
            //    }
            //    else if($('#tab_2').hasClass('active') == true){
            //        params['version'] = "2017";
            //        params['card_type'] = $('#card_sel option:selected').val();
            //    }
            //    else if($('#tab_3').hasClass('active') == true){
            //        params['version'] = "2016";
            //        params['lang'] = 'tc';
            //    }
            //    else if($('#tab_4').hasClass('active') == true){
            //        params['version'] = "2017";
            //        params['card_type'] = $('#card_sel_2 option:selected').val();
            //        params['lang'] = 'tc';
            //    }
            //    $('#export_jpg').html('生成中..');
            //    $('#export_jpg').attr('disabled','disabled');
            //    $.ajax({
            //        "dataType": "json",
            //        "type": "post",
            //        "url": "/merchant/api/offerExport/",
            //        "data": params,
            //        "success": function (data) {
            //            if (data.ret == 0) {
            //                $('#export_jpg').html('导出jpg');
            //                $('#export_jpg').removeAttr('disabled');
            //                window.location.href = "/merchant/fileDownload/?name=" + encodeURI(data.message);
            //            }
            //
            //        },
            //        "error": function (xhr, status, error) {
            //            alert("系统繁忙，请稍后再试！");
            //        }
            //    });
            //});
            //$('#offer_search_sn').on('keyup',function(e){
            //   $('#sample_1').dataTable().fnDraw();
            //});
            //$('#timeStart,#timeEnd').on('change',function(){
            //   $('#sample_1').dataTable().fnDraw();
            //});
            //$('#offer_search_city').on('change',function(e){
            //   $('#sample_1').dataTable().fnDraw();
            //});
            //$('#offer_search_cardtype').on('change',function(e){
            //   $('#sample_1').dataTable().fnDraw();
            //});
            //$('#offer_search_country').on('change', function (e) {
            //    var params = {};
            //    params['id'] = $(this).val();
            //    $.ajax({
            //        "dataType": "json",
            //        "type": "post",
            //        "url": "/merchant/api/queryCity/",
            //        "data": params,
            //        "success": function (data) {
            //            var citys = data.ret;
            //            $('#offer_search_city').empty();
            //            $('#offer_search_city').append('<option value="">全部</option>');
            //            for(var i = 0;i < citys.length; i++){
            //                $('#offer_search_city').append('<option value="'+citys[i][1]+'">'+citys[i][0]+'</option>');
            //            }
            //            $('#sample_1').dataTable().fnDraw();
            //
            //
            //        },
            //        "error": function (xhr, status, error) {
            //            alert("系统繁忙，请稍后再试！");
            //        }
            //    });
            //});
            $('#export_html_zip').on('click', function (e) {
                var params = {};
                params['id'] = $(this).attr('rol');
                params['type'] = "html";
                if ($('#tab_1').hasClass('active') == true) {
                    params['version'] = "2016";
                }
                else if($('#tab_2').hasClass('active') == true){
                    params['version'] = "2017";
                    params['card_type'] = $('#card_sel option:selected').val();
                }
                else if($('#tab_3').hasClass('active') == true){
                    params['version'] = "2016";
                    params['lang'] = 'tc';
                }
                else if($('#tab_4').hasClass('active') == true){
                    params['version'] = "2017";
                    params['card_type'] = $('#card_sel_2 option:selected').val();
                    params['lang'] = 'tc';
                }
                $.ajax({
                    "dataType": "json",
                    "type": "post",
                    "url": "/merchant/api/offerExport/",
                    "data": params,
                    "success": function (data) {
                        if (data.ret == 1) {
                            window.location.href = "/merchant/fileDownload/?flag=6&filename=" + data.message;
                        }

                    },
                    "error": function (xhr, status, error) {
                        alert("系统繁忙，请稍后再试！");
                    }
                });
            });

            //导出素材包
            $('#zip1_download').on('click', function (e) {
                var params = {};
                params['sn'] = $(this).attr('rol');
                params['type'] = "zip1";
                $.ajax({
                    "dataType": "json",
                    "type": "post",
                    "url": "/merchant/api/offerExport/",
                    "data": params,
                    "success": function (data) {
                        if (data.ret == 0) {
                            if (data.message == 'no') {
                                alert('当前offer不存在素材，请确认后再下载！');
                            }
                            else {
                                var filename = params['sn'] + '_1.zip';
                                window.location.href = "/merchant/fileDownload/?flag=2&name=" + data.message + '&filename=' + filename;
                            }

                        }

                    },
                    "error": function (xhr, status, error) {
                        alert("系统繁忙，请稍后再试！");
                    }
                });
            });


             //导出素材包
            $('#zip2_download').on('click', function (e) {

                var filename = $(this).attr('rol') + '_2.zip';
                var name = $(this).attr('rol')
                window.location.href = "/merchant/fileDownload/?flag=4&name=" + name + '&filename=' + filename;

            });


            //删除记录
            $('#sample_1 button.delete').on('click', function (e) {
                e.preventDefault();
                if (confirm("确认要删除所选offer?") == false) {
                    return;
                }
                var oTable = $('#sample_1').dataTable();
                var nRow = $(this).parents('tr')[0];
                var params = {};
                params['id'] = $(this).attr('id');
                $.ajax({
                    "dataType": "json",
                    "type": "post",
                    "url": "/merchant/api/deleteOffer/",
                    "data": params,
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
                        }
                        else {
                            oTable.fnDeleteRow(nRow);
                            alert(data.message);
                        }
                    },
                    "error": function (xhr, status, error) {
                        alert("删除失败：" + error);
                    }
                });

            });

            //取消发布
            $('#sample_1 button.isOnsale').on('click', function (e) {
                e.preventDefault();
                if (confirm("确认要取消发布商品?") == false) {
                    return;
                }
                var oTable = $('#sample_1').dataTable();
                var nRow = $(this).parents('tr')[0];
                var params = {};
                params['id'] = $(this).attr('id');
                params['flag'] = 0;
                $.ajax({
                    "dataType": "json",
                    "type": "post",
                    "url": "/goods/api/setGoodsOnsale/",
                    "data": params,
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
                        }
                        else {
                            oTable.fnDeleteRow(nRow);
                            alert(data.message);
                        }
                    },
                    "error": function (xhr, status, error) {
                        alert("系统繁忙，请稍后再试！");
                    }
                });

            });

            //确认发布
            $('#sample_1 button.notOnsale').on('click', function (e) {
                e.preventDefault();
                if (confirm("确认要发布商品?") == false) {
                    return;
                }
                var oTable = $('#sample_1').dataTable();
                var nRow = $(this).parents('tr')[0];
                var params = {};
                params['id'] = $(this).attr('id');
                params['flag'] = 1;
                $.ajax({
                    "dataType": "json",
                    "type": "post",
                    "url": "/goods/api/setGoodsOnsale/",
                    "data": params,
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
                        }
                        else {
                            oTable.fnDeleteRow(nRow);
                            alert(data.message);
                        }
                    },
                    "error": function (xhr, status, error) {
                        alert("系统繁忙，请稍后再试！");
                    }
                });

            });




            //多图编辑
            $('#sample_1 button.picedit').on('click', function (e) {
                e.preventDefault();
                numiid = $(this).attr('id');
                window.location.href = "/goods/editGoodsPics/?goods_id=" + numiid
            });


            //编辑 click

            $("#editor").html($('#editorHtml').val());

            //新增按钮 click
            $('#btn-add').on('click', function (e) {
                e.preventDefault();
                window.location.href = "/goods/addEditGoods/?catId=" + $('#select_category').val()

            });


            //设置目录菜单选中goods
            $("#menu_base").addClass("active");
            $("#menu_base_goods").addClass("active");

            // offer 检索
            $('#cat_select').on('change', function (e) {
                e.preventDefault();
                var oTable = $('#sample_1').dataTable();
                oTable.fnDraw();
            });
            $('#offer_type').on('change', function (e) {
                e.preventDefault();
                var oTable = $('#sample_1').dataTable();
                oTable.fnDraw();
            });
            $('#eop_type').on('change', function (e) {
                e.preventDefault();
                var oTable = $('#sample_1').dataTable();
                oTable.fnDraw();
            });
//            选择商品id传至后台交互
            $('.checkOffer').on('click', function (e) {
                e.preventDefault();
                if (confirm("确认此操作吗？") == false) {
                    return;
                }
                item = {};
                item['offer_id'] = $(this).attr('offer_id');
                item['from'] = $(this).attr('from');
                item['to'] = $(this).attr('to');

                $.ajax({
                    "dataType": "json",
                    "type": "post",
                    "url": "/merchant/api/offerCheckOperation/",
                    "data": item,
                    "success": function (data) {
                        if (data.ret == 0) {
                            alert('操作成功');
                            window.location.href = window.history.go(-1);
                        }
                    },
                    "error": function (xhr, status, error) {
                        alert("请求失败：" + error);
                    }

                })
            });
            $('#sample_1 button.attribute').on('click', function (e) {
                e.preventDefault();
                $('#addAttrValue').empty();
                item = {};
                //item['cat_id'] = $(this).attr('cat_id');
                item['goods_id'] = $(this).attr('id');
                $('#goodsAttr').attr('cat_id', item['cat_id']);
                $.ajax({
                    "dataType": "json",
                    "type": "post",
                    "url": "/goods/api/queryCatAttr/",
                    "data": item,
                    "success": function (data) {
                        $("#displaySku").empty();
                        var strTotal = ""
                        for (var j = 0; j < data.length; j++) {
                            var str = "<tr>";
                            for (var i = 0; i < data[j].length; i++) {
                                str += "<td>" + data[j][i] + "</td>"
                            }
                            str += "</tr>"
                            strTotal += str
                        }
                        $("#displaySku").append(strTotal);
                        $('#edit-modal-form').modal('show');
                    },
                    "error": function (xhr, status, error) {
                        alert("请求失败：" + error);
                    }

                })

            });
            $('#sample_1 button.downpic').on('click', function (e) {
                e.preventDefault();
                var params = {
                    'good_id': $(this).attr('id')
                }
                $.ajax({
                    "dataType": "json",
                    "type": "post",
                    "url": "/goods/api/genGoodQrcodePic/",
                    "data": params,
                    "success": function (data) {
                        if (data.ret == 0) {
                            window.location.href = "/goods/qrcodePicDownload/?gid=" + params['good_id'];
                        }
                        else {
                            alert('下载失败,请刷新后重试');
                        }

                    },
                    "error": function (xhr, status, error) {
                        alert("数据导出出错！" + error);
                    }

                })

            });
            $('#select_category').on('change', function (e) {
                e.preventDefault();
                var oTable = $('#sample_1').dataTable();
                oTable.fnDraw();
            });

            $('#sample_1 thead').find('input').on('change', function (e) {
                e.preventDefault()
                if ($(this).attr('checked') == 'checked') {
                    $('#sample_1 tbody').find(':checkbox').attr('checked', 'checked');
                }
                else {
                    $('#sample_1 tbody').find(':checkbox').removeAttrs('checked');
                }
            });

            $('.deleteBatch').on('click', function (e) {
                e.preventDefault();
                if ($('#sample_1 tbody').find(':checked').size() == 0) {
                    alert('请选择商品');
                }
                else {
                    if (confirm("确认要删除所选商品?该商品被删除后,其关联的库存管理将一并被删除.") == false) {
                        return;
                    }
                    else {
                        var idArray = new Array();
                        $('#sample_1 tbody').find(':checked').each(function () {
                            idArray.push($(this).attr('id'));
                        });
                        var params = {};
                        params['id'] = JSON.stringify(idArray);
                        $.ajax({
                            "dataType": "json",
                            "type": "post",
                            "url": "/goods/api/deleteGoods/",
                            "data": params,
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
                                }
                                else {
                                    alert('删除成功!');
                                    var oTable = $('#sample_1').dataTable();
                                    oTable.fnDraw();
                                }

                            },
                            "error": function (xhr, status, error) {
                                alert("删除失败：" + error);
                            }
                        });
                    }
                }

            });
            //国家变更
            $('#country').on('change', function (e) {
                e.preventDefault();
                var params = {};
                params['id'] = $(this).val();
                $.ajax({
                    "dataType": "json",
                    "type": "post",
                    "url": "/merchant/api/queryCity/",
                    "data": params,
                    "success": function (data) {
                       cityData = data.ret;
                        $("#city").empty();
                        str = '<dl class="check_less">';
                        for (i = 0; i < cityData.length; i++){
                            str =str+'<dd><input type="checkbox" name="'+cityData[i][1]+
                                '" class="span12 m-wrap" value="'+cityData[i][1]+
                                '">'+cityData[i][0]+ '</dd>';
                        }
                        str = str+ '</dl>';
                        $("#city").append(str);
                        App.init();

                    },
                    "error": function (xhr, status, error) {
                        alert("发生未知错误");
                    }
                });

            });

            $('.timeOutBatch').on('click', function (e) {
                e.preventDefault();
                if ($('#sample_1 tbody').find(':checked').size() == 0) {
                    alert('请先选择offer！');
                    return;
                }
                else {
                    if (confirm("确认要提交审核吗?") == false) {
                        return;
                    }
                    $("#up_gif").show();
                    var offer_id_list = new Array();
                    $('#sample_1 tbody').find(':checked').each(function () {
                        offer_id_list.push($(this).attr('id'));
                    });
                    var params = {};
                    params['offer_id'] = offer_id_list.join(';')
                    params['to'] = 1;
                    $.ajax({
                        "dataType": "json",
                        "type": "post",
                        "url": "/merchant/api/offerCheckOperation/",
                        "data": params,
                        "success": function (data) {
                            $("#up_gif").hide();
                            var oTable = $('#sample_1').dataTable();
                            oTable.fnDraw();

                        },
                        "error": function (xhr, status, error) {
                            alert("发生未知错误");
                        }
                    });

                }
            });
            $('.submitLegal').on('click', function (e) {
                e.preventDefault();

                if (confirm("确认要提交审核吗?") == false) {
                    return;
                }
                $("#up_gif").show();
                var params = {};
                params['offer_id'] = $(this).attr('id')
                params['to'] = 1;
                $.ajax({
                    "dataType": "json",
                    "type": "post",
                    "url": "/merchant/api/offerCheckOperation/",
                    "data": params,
                    "success": function (data) {
                        $("#up_gif").hide();
                        var oTable = $('#sample_1').dataTable();
                        oTable.fnDraw();

                    },
                    "error": function (xhr, status, error) {
                        alert("发生未知错误");
                    }
                });

            });
            $('.legalpassBatch,.legalfailBatch').on('click', function (e) {
                e.preventDefault();
                if ($('#sample_1 tbody').find(':checked').size() == 0) {
                    alert('请先选择offer！');
                    return;
                }

                if (confirm("确认此操作吗?") == false) {
                    return;
                }
                $("#up_gif").show();
                var params = {};
                var offer_id_list = new Array();
                $('#sample_1 tbody').find(':checked').each(function () {
                    offer_id_list.push($(this).attr('id'));
                });
                params['offer_id'] = offer_id_list.join(';')
                if ($(this).hasClass('legalpassBatch')) {
                    params['to'] = '7';
                }
                else {
                    params['to'] = '0';
                }
                $.ajax({
                    "dataType": "json",
                    "type": "post",
                    "url": "/merchant/api/offerCheckOperation/",
                    "data": params,
                    "success": function (data) {
                        $("#up_gif").hide();
                        var oTable = $('#sample_1').dataTable();
                        oTable.fnDraw();

                    },
                    "error": function (xhr, status, error) {
                        alert("发生未知错误");
                    }
                });

            });
            $('.mccannExportBatch').on('click', function (e) {
                e.preventDefault();
                if ($('#sample_1 tbody').find(':checked').size() == 0) {
                    alert('请先选择offer！');
                    return;
                }

                if (confirm("确认此操作吗?") == false) {
                    return;
                }
                $("#up_gif").show();
                var params = {};
                var offer_id_list = new Array();
                $('#sample_1 tbody').find(':checked').each(function () {
                    offer_id_list.push($(this).attr('id'));
                });
                params['offer_id'] = offer_id_list.join(';')
                //params['to'] = '0';
                $.ajax({
                    "dataType": "json",
                    "type": "post",
                    "url": "/merchant/api/mccannExportBatch/",
                    "data": params,
                    "success": function (data) {
                        $("#up_gif").hide();
                        var oTable = $('#sample_1').dataTable();
                        oTable.fnDraw();

                    },
                    "error": function (xhr, status, error) {
                        alert("发生未知错误");
                    }
                });

            });
            $('.mccannExport').on('click', function (e) {
                e.preventDefault();

                if (confirm("确认此操作吗?") == false) {
                    return;
                }
                $("#up_gif").show();
                var params = {};
                params['offer_id'] = $(this).attr('id')
                $.ajax({
                    "dataType": "json",
                    "type": "post",
                    "url": "/merchant/api/mccannExportBatch/",
                    "data": params,
                    "success": function (data) {
                        $("#up_gif").hide();
                        var oTable = $('#sample_1').dataTable();
                        oTable.fnDraw();

                    },
                    "error": function (xhr, status, error) {
                        alert("发生未知错误");
                    }
                });

            });
            $('.legalPass,.legalFail').on('click', function (e) {
                e.preventDefault();

                if (confirm("确认此操作吗?") == false) {
                    return;
                }
                $("#up_gif").show();
                var params = {};
                params['offer_id'] = $(this).attr('id')
                if ($(this).hasClass('legalPass')) {
                    params['to'] = '7';
                }
                else {
                    params['to'] = '0';
                }
                $.ajax({
                    "dataType": "json",
                    "type": "post",
                    "url": "/merchant/api/offerCheckOperation/",
                    "data": params,
                    "success": function (data) {
                        $("#up_gif").hide();
                        var oTable = $('#sample_1').dataTable();
                        oTable.fnDraw();

                    },
                    "error": function (xhr, status, error) {
                        alert("发生未知错误");
                    }
                });

            });
            $('.timeoutRevise').on('click', function (e) {
                e.preventDefault();
                $('#offerId').val($(this).attr('id'));
                $('#edit-modal-form').modal();
            });
            $('#legalTipSubmit').on('click', function (e) {
                e.preventDefault();
                if ($("#form_sample_2").find('textarea').val() == "") {
                    alert('备注内容不能为空!');
                    return;
                }
                if (confirm("确认此操作吗?") == false) {
                    return;
                }
                $("#up_gif").show();
                var params = $("#form_sample_2").formToArray();

                params.push({name: "offer_id", required: false, type: "text", value: $('#offerId').val()});
                params.push({name: "to", required: false, type: "text", value: '10'});
                $.ajax({
                    "dataType": "json",
                    "type": "post",
                    "url": "/merchant/api/offerCheckOperation/",
                    "data": params,
                    "success": function (data) {
                        $("#up_gif").hide();
                        $('#edit-modal-form').modal('hide');
                        var oTable = $('#sample_1').dataTable();
                        oTable.fnDraw();

                    },
                    "error": function (xhr, status, error) {
                        alert("错误");
                    }
                });
            });
            $('#formExportConfirm').on('click', function (e) {
                e.preventDefault();
                var params = $("#form_export").formToArray();
                var offer_id_list = new Array();
                $('#sample_1 tbody').find(':checked').each(function () {
                    offer_id_list.push($(this).attr('id'));
                });
                params.push({name: "offer_id", required: false, type: "text", value: offer_id_list.join(';')});

                $('#formExportConfirm').html('生成中...');
                $('#formExportConfirm').attr('disabled','disabled');

                $.ajax({
                    "dataType": "json",
                    "type": "post",
                    "url": "/merchant/api/exportOfferBatch/",
                    "data": params,
                    "success": function (data) {
                        if (data.ret == 0) {
                            $('#formExportConfirm').html('确认');
                            $('#formExportConfirm').removeAttr('disabled');
                            window.location.href = "/merchant/fileDownload/?name=" + encodeURI(data.message);
                        }
                        if (data.ret == 1) {
                            $('#formExportConfirm').html('确认');
                            $('#formExportConfirm').removeAttr('disabled');
                            window.location.href = "/merchant/fileDownload/?flag=5&filename=" + data.message;
                        }

                    },
                    "error": function (xhr, status, error) {
                        alert("系统繁忙，请稍后再试！");
                    }
                });

            });
            $('.legalTip').on('click', function (e) {
                e.preventDefault();
                $("#up_gif").show();
                var params = {};
                params['offer_id'] = $(this).attr('id');
                params['type'] = 'legal';
                $.ajax({
                    "dataType": "json",
                    "type": "post",
                    "url": "/merchant/api/getReviseTip/",
                    "data": params,
                    "success": function (data) {
                        $("#up_gif").hide();
                        $("#form_sample_2").find('textarea').val(data.msg);
                        $('#edit-modal-form').modal();


                    },
                    "error": function (xhr, status, error) {
                        alert("错误");
                    }
                });

            });
            $('.screeingBatch,.screeingfailBatch').on('click', function (e) {
                e.preventDefault();
                if ($('#sample_1 tbody').find(':checked').size() == 0) {
                    alert('请先选择offer！');
                    return;
                }

                if (confirm("确认此操作吗?") == false) {
                    return;
                }
                $("#up_gif").show();
                var params = {};
                var offer_id_list = new Array();
                $('#sample_1 tbody').find(':checked').each(function () {
                    offer_id_list.push($(this).attr('id'));
                });
                params['offer_id'] = offer_id_list.join(';')
                if ($(this).hasClass('screeingBatch')) {
                    params['to'] = '4';
                }
                else {
                    params['to'] = '3';
                }
                $.ajax({
                    "dataType": "json",
                    "type": "post",
                    "url": "/merchant/api/offerCheckOperation/",
                    "data": params,
                    "success": function (data) {
                        $("#up_gif").hide();
                        var oTable = $('#sample_1').dataTable();
                        oTable.fnDraw();

                    },
                    "error": function (xhr, status, error) {
                        alert("发生未知错误");
                    }
                });

            });
            $('.screeningPass,.screeningFail').on('click', function (e) {
                e.preventDefault();

                if (confirm("确认此操作吗?") == false) {
                    return;
                }
                $("#up_gif").show();
                var params = {};
                params['offer_id'] = $(this).attr('id')
                if ($(this).hasClass('screeningPass')) {
                    params['to'] = '4';
                }
                else {
                    params['to'] = '3';
                }
                $.ajax({
                    "dataType": "json",
                    "type": "post",
                    "url": "/merchant/api/offerCheckOperation/",
                    "data": params,
                    "success": function (data) {
                        $("#up_gif").hide();
                        var oTable = $('#sample_1').dataTable();
                        oTable.fnDraw();

                    },
                    "error": function (xhr, status, error) {
                        alert("发生未知错误");
                    }
                });

            });
            $('.editBatch').on('click', function (e) {
                e.preventDefault();
                if ($('#sample_1 tbody').find(':checked').size() == 0) {
                    alert('请先选择offer！');
                    return;
                }

                if (confirm("确认要批量完成吗?") == false) {
                    return;
                }
                $("#up_gif").show();
                var params = {};
                var offer_id_list = new Array();
                $('#sample_1 tbody').find(':checked').each(function () {
                    offer_id_list.push($(this).attr('id'));
                });
                params['offer_id'] = offer_id_list.join(';')
                params['to'] = 5;
                $.ajax({
                    "dataType": "json",
                    "type": "post",
                    "url": "/merchant/api/offerCheckOperation/",
                    "data": params,
                    "success": function (data) {
                        $("#up_gif").hide();
                        var oTable = $('#sample_1').dataTable();
                        oTable.fnDraw();

                    },
                    "error": function (xhr, status, error) {
                        alert("发生未知错误");
                    }
                });

            });

            $('.editPass').on('click', function (e) {
                e.preventDefault();

                if (confirm("确认此操作吗?") == false) {
                    return;
                }
                $("#up_gif").show();
                var params = {};
                params['offer_id'] = $(this).attr('id');
                params['to'] = '5';
                $.ajax({
                    "dataType": "json",
                    "type": "post",
                    "url": "/merchant/api/offerCheckOperation/",
                    "data": params,
                    "success": function (data) {
                        $("#up_gif").hide();
                        var oTable = $('#sample_1').dataTable();
                        oTable.fnDraw();

                    },
                    "error": function (xhr, status, error) {
                        alert("发生未知错误");
                    }
                });

            });
            $('.weberPass').on('click', function (e) {
                e.preventDefault();

                if (confirm("确认此操作吗?") == false) {
                    return;
                }
                $("#up_gif").show();
                var params = {};
                params['offer_id'] = $(this).attr('id');
                params['to'] = '13';
                $.ajax({
                    "dataType": "json",
                    "type": "post",
                    "url": "/merchant/api/offerCheckOperation/",
                    "data": params,
                    "success": function (data) {
                        $("#up_gif").hide();
                        var oTable = $('#sample_1').dataTable();
                        oTable.fnDraw();

                    },
                    "error": function (xhr, status, error) {
                        alert("发生未知错误");
                    }
                });

            });
            $('.r1Pass').on('click', function (e) {
                e.preventDefault();

                if (confirm("确认此操作吗?") == false) {
                    return;
                }
                $("#up_gif").show();
                var params = {};
                params['offer_id'] = $(this).attr('id');
                params['to'] = '6';
                $.ajax({
                    "dataType": "json",
                    "type": "post",
                    "url": "/merchant/api/offerCheckOperation/",
                    "data": params,
                    "success": function (data) {
                        $("#up_gif").hide();
                        var oTable = $('#sample_1').dataTable();
                        oTable.fnDraw();

                    },
                    "error": function (xhr, status, error) {
                        alert("发生未知错误");
                    }
                });

            });
            $('.r1Batch').on('click', function (e) {
                e.preventDefault();
                if ($('#sample_1 tbody').find(':checked').size() == 0) {
                    alert('请先选择offer！');
                    return;
                }

                if (confirm("确认要批量通过吗?") == false) {
                    return;
                }
                $("#up_gif").show();
                var params = {};
                var offer_id_list = new Array();
                $('#sample_1 tbody').find(':checked').each(function () {
                    offer_id_list.push($(this).attr('id'));
                });
                params['offer_id'] = offer_id_list.join(';')
                params['to'] = 6;
                $.ajax({
                    "dataType": "json",
                    "type": "post",
                    "url": "/merchant/api/offerCheckOperation/",
                    "data": params,
                    "success": function (data) {
                        $("#up_gif").hide();
                        var oTable = $('#sample_1').dataTable();
                        oTable.fnDraw();

                    },
                    "error": function (xhr, status, error) {
                        alert("发生未知错误");
                    }
                });

            });
            $('.r1Revise').on('click', function (e) {
                e.preventDefault();
                $('#offerId').val($(this).attr('id'));
                $('#r1TipSubmit').show();
                $("#form_sample_2").find('textarea').val("");
                $('#edit-modal-form').modal();
            });
            $('#r1TipSubmit').on('click', function (e) {
                e.preventDefault();
                if ($("#form_sample_2").find('textarea').val() == "") {
                    alert('备注内容不能为空!');
                    return;
                }
                if (confirm("确认此操作吗?") == false) {
                    return;
                }
                $("#up_gif").show();
                var params = $("#form_sample_2").formToArray();

                params.push({name: "offer_id", required: false, type: "text", value: $('#offerId').val()});
                params.push({name: "to", required: false, type: "text", value: '4'});
                $.ajax({
                    "dataType": "json",
                    "type": "post",
                    "url": "/merchant/api/offerCheckOperation/",
                    "data": params,
                    "success": function (data) {
                        $("#up_gif").hide();
                        $('#edit-modal-form').modal('hide');
                        var oTable = $('#sample_1').dataTable();
                        oTable.fnDraw();

                    },
                    "error": function (xhr, status, error) {
                        alert("错误");
                    }
                });
            });
            $('.r1Tip').on('click', function (e) {
                e.preventDefault();
                $("#up_gif").show();
                var params = {};
                params['offer_id'] = $(this).attr('id');
                params['type'] = 'r1';
                $.ajax({
                    "dataType": "json",
                    "type": "post",
                    "url": "/merchant/api/getReviseTip/",
                    "data": params,
                    "success": function (data) {
                        $("#up_gif").hide();
                        $("#form_sample_2").find('textarea').val(data.msg);
                        $('#edit-modal-form').modal();


                    },
                    "error": function (xhr, status, error) {
                        alert("错误");
                    }
                });

            });
            $('.seniorPass').on('click', function (e) {
                e.preventDefault();

                if (confirm("确认此操作吗?") == false) {
                    return;
                }
                $("#up_gif").show();
                var params = {};
                params['offer_id'] = $(this).attr('id');
                params['to'] = '7';
                $.ajax({
                    "dataType": "json",
                    "type": "post",
                    "url": "/merchant/api/offerCheckOperation/",
                    "data": params,
                    "success": function (data) {
                        $("#up_gif").hide();
                        var oTable = $('#sample_1').dataTable();
                        oTable.fnDraw();

                    },
                    "error": function (xhr, status, error) {
                        alert("发生未知错误");
                    }
                });

            });
            $('.r2Revise').on('click', function (e) {
                e.preventDefault();
                $('#offerId').val($(this).attr('id'));
                $('#edit-modal-form').find('textarea').val(null);
                $('#edit-modal-form').modal();
            });
            $('#seniorTipSubmit').on('click', function (e) {
                e.preventDefault();
                if ($("#form_sample_2").find('textarea').val() == "") {
                    alert('备注内容不能为空!');
                    return;
                }
                if (confirm("确认此操作吗?") == false) {
                    return;
                }
                $("#up_gif").show();
                var params = $("#form_sample_2").formToArray();

                params.push({name: "offer_id", required: false, type: "text", value: $('#offerId').val()});
                params.push({name: "to", required: false, type: "text", value: $('#to_whom').val()});
                $.ajax({
                    "dataType": "json",
                    "type": "post",
                    "url": "/merchant/api/offerCheckOperation/",
                    "data": params,
                    "success": function (data) {
                        $("#up_gif").hide();
                        $('#edit-modal-form').modal('hide');
                        var oTable = $('#sample_1').dataTable();
                        oTable.fnDraw();

                    },
                    "error": function (xhr, status, error) {
                        alert("错误");
                    }
                });
            });
            $('.r2Tip').on('click', function (e) {
                e.preventDefault();
                $("#up_gif").show();
                var params = {};
                params['offer_id'] = $(this).attr('id');
                params['type'] = 'r2';
                $.ajax({
                    "dataType": "json",
                    "type": "post",
                    "url": "/merchant/api/getReviseTip/",
                    "data": params,
                    "success": function (data) {
                        $("#up_gif").hide();
                        $('#r1TipSubmit').hide();
                        $("#form_sample_2").find('textarea').val(data.msg);
                        $('#edit-modal-form').modal();


                    },
                    "error": function (xhr, status, error) {
                        alert("错误");
                    }
                });

            });
            $('.seniorBatch').on('click', function (e) {
                e.preventDefault();
                if ($('#sample_1 tbody').find(':checked').size() == 0) {
                    alert('请先选择offer！');
                    return;
                }

                if (confirm("确认此操作吗?") == false) {
                    return;
                }
                $("#up_gif").show();
                var params = {};
                var offer_id_list = new Array();
                $('#sample_1 tbody').find(':checked').each(function () {
                    offer_id_list.push($(this).attr('id'));
                });
                params['offer_id'] = offer_id_list.join(';')
                params['to'] = 7;
                $.ajax({
                    "dataType": "json",
                    "type": "post",
                    "url": "/merchant/api/offerCheckOperation/",
                    "data": params,
                    "success": function (data) {
                        $("#up_gif").hide();
                        var oTable = $('#sample_1').dataTable();
                        oTable.fnDraw();

                    },
                    "error": function (xhr, status, error) {
                        alert("发生未知错误");
                    }
                });

            });
            $("#to_eop").on('click', function (e) {
                if ($(this).attr('checked')) {
                    $("#eop_mail").show();
                }
                else {
                    $("#eop_mail").hide();
                }
            });
            $("#to_cq5").on('click', function (e) {
                if ($(this).attr('checked')) {
                    $("#cq5_mail").show();
                }
                else {
                    $("#cq5_mail").hide();
                }
            });
            $('.sendeopBatch').on('click', function (e) {
                e.preventDefault();
                if ($('#sample_1 tbody').find(':checked').size() == 0) {
                    alert('请先选择Offer！');
                }
                else {
                    $('#toUser').html('');
                    $('#sample_1 tbody').find(':checked').each(function () {
                        $('#toUser').html($('#toUser').html() + '<p>' + $(this).parent().next().next().text() + '</p>');
                    });
                    $('#edit-modal-form3').modal();

                }

            });
            $('#sendEOPBtn').on('click', function (e) {
                e.preventDefault();

                if ($("input:checkbox[name='send_to']:checked").size() == 0) {
                    alert('EOP/CQ5至少选择１个!');
                    return;
                }
                //if ($('#eop_mail').val() + $('#cq5_mail').val() == ""){
                //    alert('请填写电子邮箱');
                //    return;
                //}
                if (confirm("确认此操作吗?") == false) {
                    return;
                }
                $("#up_gif").show();
                var params = {}
                var offer_id_list = [];
                $('#sample_1 tbody').find(':checked').each(function () {
                    offer_id_list.push($(this).attr('id'));
                });
                params['offer_id'] = offer_id_list.join(';');
                params['to'] = $('#eop_op').val();
                if ($('#to_eop').attr('checked')) {
                    params['eop_mail'] = $('#eop_mail').val();
                }
                if ($('#to_cq5').attr('checked')) {
                    params['cq5_mail'] = $('#cq5_mail').val();
                }

                $.ajax({
                    "dataType": "json",
                    "type": "post",
                    "url": "/merchant/api/setEOPStatus/",
                    "data": params,
                    "success": function (data) {
                        $("#up_gif").hide();
                        $('#edit-modal-form3').modal('hide');
                        var oTable = $('#sample_1').dataTable();
                        oTable.fnDraw();

                    },
                    "error": function (xhr, status, error) {
                        alert("错误");
                    }
                });
            });

            $('.eopOp,.cq5Op').on('click', function (e) {
                e.preventDefault();
                if (confirm("确认此操作吗?") == false) {
                    return;
                }
                $("#up_gif").show();
                var params = {};
                params['offer_id'] = $(this).attr('id');
                params['to'] = $(this).attr('c_t_status');
                if ($(this).hasClass('eopOp')) {
                    params['type'] = 'eop';
                }
                else if ($(this).hasClass('cq5Op')) {
                    params['type'] = 'cq5';
                }
                $.ajax({
                    "dataType": "json",
                    "type": "post",
                    "url": "/merchant/api/eopOfferOperation/",
                    "data": params,
                    "success": function (data) {
                        $("#up_gif").hide();
                        var oTable = $('#sample_1').dataTable();
                        oTable.fnDraw();

                    },
                    "error": function (xhr, status, error) {
                        alert("错误");
                    }
                });
            });
            $('.publishonline').on('click', function (e) {
                e.preventDefault();

                if (confirm("确认要发布吗?") == false) {
                    return;
                }
                $("#up_gif").show();
                var params = {};
                params['offer_id'] = $(this).attr('id')
                params['to'] = 8;
                $.ajax({
                    "dataType": "json",
                    "type": "post",
                    "url": "/merchant/api/offerCheckOperation/",
                    "data": params,
                    "success": function (data) {
                        $("#up_gif").hide();
                        var oTable = $('#sample_1').dataTable();
                        oTable.fnDraw();

                    },
                    "error": function (xhr, status, error) {
                        alert("发生未知错误");
                    }
                });

            });
            $('.wxonline').on('click', function (e) {
                e.preventDefault();

                if (confirm("确认要微信上线吗?") == false) {
                    return;
                }
                $("#up_gif").show();
                var params = {};
                params['offer_id'] = $(this).attr('id');
                params['op_type'] = 'on';
                $.ajax({
                    "dataType": "json",
                    "type": "post",
                    "url": "/merchant/api/wxOnlineOperation/",
                    "data": params,
                    "success": function (data) {
                        $("#up_gif").hide();
                        var oTable = $('#sample_1').dataTable();
                        oTable.fnDraw();

                    },
                    "error": function (xhr, status, error) {
                        alert("发生未知错误");
                    }
                });

            });
            $('.unwxonline').on('click', function (e) {
                e.preventDefault();

                if (confirm("确认要微信下线吗?") == false) {
                    return;
                }
                $("#up_gif").show();
                var params = {};
                params['offer_id'] = $(this).attr('id');
                params['op_type'] = 'off';
                $.ajax({
                    "dataType": "json",
                    "type": "post",
                    "url": "/merchant/api/wxOnlineOperation/",
                    "data": params,
                    "success": function (data) {
                        $("#up_gif").hide();
                        var oTable = $('#sample_1').dataTable();
                        oTable.fnDraw();

                    },
                    "error": function (xhr, status, error) {
                        alert("发生未知错误");
                    }
                });

            });
            $('.wxonlineBatch').on('click', function (e) {
                e.preventDefault();
                if ($('#sample_1 tbody').find(':checked').size() == 0) {
                    alert('请先选择offer！');
                    return;
                }

                if (confirm("确认此操作吗?") == false) {
                    return;
                }
                $("#up_gif").show();
                var params = {};
                var offer_id_list = new Array();
                $('#sample_1 tbody').find(':checked').each(function () {
                    offer_id_list.push($(this).attr('id'));
                });
                params['offer_id'] = offer_id_list.join(';')
                params['op_type'] = 'on';
                $.ajax({
                    "dataType": "json",
                    "type": "post",
                    "url": "/merchant/api/wxOnlineOperation/",
                    "data": params,
                    "success": function (data) {
                        $("#up_gif").hide();
                        var oTable = $('#sample_1').dataTable();
                        oTable.fnDraw();

                    },
                    "error": function (xhr, status, error) {
                        alert("发生未知错误");
                    }
                });

            });
            $('.unwxonlineBatch').on('click', function (e) {
                e.preventDefault();
                if ($('#sample_1 tbody').find(':checked').size() == 0) {
                    alert('请先选择offer！');
                    return;
                }

                if (confirm("确认此操作吗?") == false) {
                    return;
                }
                $("#up_gif").show();
                var params = {};
                var offer_id_list = new Array();
                $('#sample_1 tbody').find(':checked').each(function () {
                    offer_id_list.push($(this).attr('id'));
                });
                params['offer_id'] = offer_id_list.join(';')
                params['op_type'] = 'off';
                $.ajax({
                    "dataType": "json",
                    "type": "post",
                    "url": "/merchant/api/wxOnlineOperation/",
                    "data": params,
                    "success": function (data) {
                        $("#up_gif").hide();
                        var oTable = $('#sample_1').dataTable();
                        oTable.fnDraw();

                    },
                    "error": function (xhr, status, error) {
                        alert("发生未知错误");
                    }
                });

            });
            $('.publishBatch').on('click', function (e) {
                e.preventDefault();
                if ($('#sample_1 tbody').find(':checked').size() == 0) {
                    alert('请先选择offer！');
                    return;
                }

                if (confirm("确认要批量发布吗?") == false) {
                    return;
                }
                $("#up_gif").show();
                var params = {};
                var offer_id_list = new Array();
                $('#sample_1 tbody').find(':checked').each(function () {
                    offer_id_list.push($(this).attr('id'));
                });
                params['offer_id'] = offer_id_list.join(';')
                params['to'] = 8;
                $.ajax({
                    "dataType": "json",
                    "type": "post",
                    "url": "/merchant/api/offerCheckOperation/",
                    "data": params,
                    "success": function (data) {
                        $("#up_gif").hide();
                        var oTable = $('#sample_1').dataTable();
                        oTable.fnDraw();

                    },
                    "error": function (xhr, status, error) {
                        alert("发生未知错误");
                    }
                });

            });


        },


        editAttrInit: function () {
            $('#addAttrValue').empty();
            item = {};
            item['cat_id'] = $('#category_select').val();
            item['goods_id'] = $('#goodsId').val();
            $('#goodsAttr').attr('cat_id', item['cat_id']);
            $.ajax({
                "dataType": "json",
                "type": "post",
                "url": "/goods/api/queryCatAttr/",
                "data": item,
                "success": function (data) {
                    if (data.length == 0) {
                        alert("该类别还没有添加属性,请返回添加!")
                    }

                    for (i = 0; i < data.length; i++) {
                        str = "<div class='control-group attrclass'>"
                        str += "<label class='control-label'>" + data[i]['attr_name'] + "<span class='required'>*</span></label>"
                        attr_values_list = data[i]['attr_values']
                        divhtml = "<div class='controls'>";
                        for (j = 0; j < attr_values_list.length; j++) {
                            if (attr_values_list[j].indexOf('cHeCkEd') > 0) {
                                var itemstr = attr_values_list[j].split("cHeCkEd")[0]
                                phtml = itemstr + "<input style='margin-right: 10px' class='goodsAttrDynamicCreate' type='checkbox' id='" + data[i]['attr_name'] + "' name='" + data[i]['attr_name'] + "' value='" + itemstr + "'checked=true/>"
                            }
                            else {
                                phtml = attr_values_list[j] + "<input class='goodsAttrDynamicCreate' type='checkbox' id='" + data[i]['attr_name'] + "' name='" + data[i]['attr_name'] + "' value='" + attr_values_list[j] + "'/>"
                            }

                            divhtml = divhtml + phtml
                        }
                        str += divhtml + "</div></div>"
                        $('#addAttrValue').append(str)
                    }

                    var form2 = $('#form_sample_2');
                    var error2 = $('.alert-error', form2);
                    var success2 = $('.alert-success', form2)
                    error2.hide();
                    success2.hide();
                },
                "error": function (xhr, status, error) {
                    alert("请求失败：" + error);
                }

            })

        }

    }
}();

