$(".edit").on('click', function (e) {
    $(".pop-box").fadeIn();
    e.preventDefault();

    var id = $(this).attr('id');
    window.location = "/offer/showOfferEdit/?id="+id;
});

$(".remove").on('click', function (e) {
    params = {};
    params['id'] = $(this).attr('id');
    params['operationcode'] = "remove";
    $.ajax({
        "dataType": "json",
        "type": "post",
        "url": "/offer/api/BannerOperation/",
        "data": params,
        "success": function (data) {
            alert("删除成功");
            window.location.href = "/offer/showSearchBanner/"
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
