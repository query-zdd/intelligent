/**
 * Created by wangx on 17-4-18.
 */
var search_bq = '<div class="search-bq">\
                    <span class="search-arrow"><img src="/ilgapps/static/image/tag_1.png" alt=""></span>\
                    <span class="search-del"><img src="/ilgapps/static/image/ic_del2.png" alt=""></span>\
                </div>';
//关键字标签删除
$(document).on("click",".search-del",function(){
    $(this).parent().remove();
    var p_ob = convertParmsToObject();
    var tmp = new Array();
    $('.search-result .search-bq').each(function(){
        if (!$(this).text().trim()){
            return true;
        }
        tmp.push($(this).text().trim());
    });
    p_ob['search'] = tmp.join(';')
    window.location.href = window.location.pathname + getUrlParams(p_ob);
});
/*
 页面控件初始化
 */
window.onload = function () {
    //url params convert to object
    var p_ob = convertParmsToObject();
    //select ctrl initialize
    for(var j in p_ob){
        var sel_ob = $('select[page-custom="' + j + '"]');
        if (sel_ob){
            sel_ob.val(p_ob[j])
        }
    }
    //关键字初始化
    kwInit();
    //时间控件初始化
    $('#time_start input').val(p_ob.start);
    $('#time_end input').val(p_ob.end);
}

/*
url参数转换成object
 */
function convertParmsToObject() {
    var search = window.location.search;
    if (search.length == 1 || search.length == 0){
        return {};
    }
    search = search.substring(1,search.length);
    //url params convert to object
    var p_ob = {};
    var equal = search.split('&')
    for(var i in equal){
        var args = equal[i].split('=');
        p_ob[decodeURIComponent(args[0])] = decodeURIComponent(args[1]);
    }
    return p_ob;
}
/*
 获取url中?后边的参数字符串
 */
function getUrlParams(p_ob) {
    var tmp = new Array();
    for(var j in p_ob){
        tmp.push(encodeURIComponent(j) + '=' + encodeURIComponent(p_ob[j]))
    }
    return '?' + tmp.join('&')
}
/*
关键字标签初始化
 */
function kwInit(){
    var p_ob = convertParmsToObject();
    if (!p_ob['search']){
        return;
    }
    var kw_list = p_ob['search'].split(';');
    for (var i in kw_list){
        //var decode_str = decodeURIComponent(kw_list[i]);
        //if (!decode_str){
        //    continue;
        //}
        var clone_node = $(search_bq);
        clone_node.find('.search-arrow').after(kw_list[i]);
        $('.search-result').append(clone_node);
    }
}
/*
 页码点击效果
 */
$('.page-turning li[class="inactive"]').click(function () {
    var p_ob = convertParmsToObject();
    p_ob['page'] = $(this).text();
    window.location.href = window.location.pathname + getUrlParams(p_ob);
})
/*
 第一页
 */
$('li i.icon-step-backward').click(function () {
    var p_ob = convertParmsToObject();
    var now_page = Number($('.page-turning li[class="active"]').text());
    var min_page = Number($('.page-turning ul').attr('min'));
    if (now_page - 5 > min_page){
        p_ob['page'] = now_page - 5;
    }
    else{
        p_ob['page'] = min_page;
    }
    window.location.href = window.location.pathname + getUrlParams(p_ob);
});
/*
 最后一页
 */
$('li i.icon-step-forward').click(function () {
    var p_ob = convertParmsToObject();
    var now_page = Number($('.page-turning li[class="active"]').text());
    var max_page = Number($('.page-turning ul').attr('max'));
    if (now_page + 5 < max_page){
        p_ob['page'] = now_page + 5;
    }
    else{
        p_ob['page'] = max_page;
    }
    window.location.href = window.location.pathname + getUrlParams(p_ob);
});
/*
 前一页,后一页
 */
$('li i.icon-caret-left,li i.icon-caret-right').click(function () {
    var p_ob = convertParmsToObject();
    p_ob['page'] = $(this).attr('to');
    window.location.href = window.location.pathname + getUrlParams(p_ob);
});
/*
 下拉框
 */
$('select[page-custom]').change(function () {
    var p_ob = convertParmsToObject();
    if($(this).val() != ''){
        p_ob[$(this).attr('page-custom')] = $(this).val();
    }
    else{
        delete p_ob[$(this).attr('page-custom')]
    }
    window.location.href = window.location.pathname + getUrlParams(p_ob);
});
/*
 关键字搜索
 */
$('#kw_search').click(function () {
    var kw = $('#keyword').val();
    if(!kw){
        return;
    }
    var reg = /；/g;
    kw = kw.replace(reg,';');
    var kw_list = kw.split(';');
    for (var i in kw_list){
        //var encode_str = encodeURIComponent(kw_list[i]);
        //if (!encode_str){
        //    continue;
        //}
        var clone_node = $(search_bq).clone();
        clone_node.find('.search-arrow').after(kw_list[i]);
        $('.search-result').append(clone_node);
    }
    var p_ob = convertParmsToObject();
    var tmp = new Array();
    $('.search-result .search-bq').each(function(){
        if (!$(this).text().trim()){
            return true;
        }
        tmp.push($(this).text().trim());
    });
    p_ob['search'] = tmp.join(';')
    window.location.href = window.location.pathname + getUrlParams(p_ob);
});
/*
 关键字搜索
 */
$('#kw_search_one').click(function () {
    var kw = $('#keyword').val();
    if(!kw){
        return;
    }
    window.location.href = window.location.pathname +'?search='+kw;
});
/*
页码跳页
 */
$('#page_jump').click(function(){
    var page = $('#to_page').val();
    if (page > 0 && page <= Number($('.page-turning ul').attr('max'))){
        var p_ob = convertParmsToObject();
        p_ob['page'] = page;
        window.location.href = window.location.pathname + getUrlParams(p_ob);
    }
    else{
        alert('页码范围1~'+ $('.page-turning ul').attr('max'));
    }

    return;

});
/*
时间搜索
 */
$('button.search-btn').click(function(){
    var p_ob = convertParmsToObject();
    if($('#time_start input').val()){
        p_ob['start'] = $('#time_start input').val()
    }
    else{
        delete p_ob['start']
    }
    if($('#time_end input').val()){
        p_ob['end'] = $('#time_end input').val()
    }
    else{
        delete p_ob['end']
    }
    window.location.href = window.location.pathname + getUrlParams(p_ob);
});