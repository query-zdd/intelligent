# -*- coding: utf-8 -*-
import shutil
import time

from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
import base64
from ilgapps.utils import *
from .consumers import VideoConsumer
import datetime

from ilgapps.alipay.get_pay_code import *
from ilgapps.alipay.alipy_sample import *


def showAdmin(request):
    # 更改状态
    config = Config.objects.get(id=1)
    config.c_start_push_flag = 0
    config.save()
    return render(request,"webapp/admin.html",locals())

def showOrderPay(request):
    order_sn=request.GET.get("ordersn")
    orderObj = Order.objects.get(order_sn=order_sn)
    orderLine = OrderLine.objects.filter(order_id=orderObj.order_id)
    status, img = getPayCode(order_sn, str(orderObj.order_amount))
    return render(request,"webapp/order_pay.html",locals())


@csrf_exempt
def editData(request):
    num = request.POST.get('num')
    goods = request.POST.get('goods')
    use_time = request.POST.get('use_time')
    order = {}
    class_dic = {
        "d1": ["米饭", 1], "d2": ["豆角炒茄子", 5], "d3": ["辣椒炒肉", 6], "d4": ["梅菜扣肉", 12], "d5": ["花生米", 5], "d6": ["红烧肉", 13],
        "d7": ["玉米火腿炒豌豆", 6], "d8": ["糖醋里脊", 10],
        "d9": ["冬瓜炒肉片", 8], "d10": ["辣子鸡丁", 7], "d11": ["凉拌豆皮", 3], "d12": ["芹菜豆干", 4], "d13": ["炒土豆丝", 3],
        "d14": ["炒豆角", 3], "d15": ["娃娃菜", 5],
        "d16": ["鸡蛋火腿", 8], "d17": ["鱼香肉丝", 10], "d18": ["土豆牛肉", 15], "d19": ["西红柿炒鸡蛋", 6], "d20": ["肉末茄子", 8],
        "d21": ["炒竹笋", 5]
    }

    #创建订单
    now = time.strftime('%Y%m%d')
    o_last = Order.objects.all().last()
    if o_last:
        sn_last = o_last.order_sn
        sn_date = sn_last[1:9]

        # 取sn中的日期部分
        if (str(sn_date) == now):
            n = int(sn_last[9:14]) + 1
            n_s = "%0*d" % (5, n)
            sn_new = "M" + sn_date + n_s
        else:
            sn_new = "M" + now + "00001"
    else:
        sn_new = "M" + now + "00001"
    ordersn = sn_new
    # 图片保存
    try:
        sorceF = str(settings.MEDIA_ROOT + "bannerPic/" + str(int(num)) + ".jpg")
        targetF = str(settings.MEDIA_ROOT + "orderImg/" + ordersn + ".jpg")
        if not os.path.exists(targetF) and os.path.exists(sorceF):
            open(targetF, "wb").write(open(sorceF, "rb").read())
    except:
        pass
    orderObj = Order()
    orderObj.order_sn = ordersn
    orderObj.create_time = datetime.datetime.now()
    orderObj.member_id = 0
    orderObj.status = 0
    orderObj.merchant_id = 0
    orderObj.merchant_name = "苏研院"
    orderObj.order_img = "/upload/orderImg/" + ordersn + ".jpg"
    orderObj.save()
    orderOne = Order.objects.get(order_sn=ordersn)

    goodsinfo = []
    price = 0
    goodsName =''
    if goods:
        goods = json.loads(goods)
        for one in goods:
            orderlineObj = OrderLine()
            one_dic = {}
            key_c = "d"+str(one)
            price += class_dic[key_c][1]
            one_dic['name'] =  class_dic[key_c][0]
            one_dic['price'] = class_dic[key_c][1]
            goodsName +=class_dic[key_c][0]+";"
            goodsinfo.append(one_dic)
            goodsObj = Goods.objects.filter(goods_name= class_dic[key_c][0])
            orderlineObj.order_id = orderOne.order_id
            orderlineObj.goods_name = class_dic[key_c][0]
            orderlineObj.goods_price = class_dic[key_c][1]
            orderlineObj.goods_number = 1
            if goodsObj.count()>0:
                orderlineObj.goods_id= goodsObj[0].goods_id
            else:
                orderlineObj.goods_id = 0
            orderlineObj.save()
        orderOne.goods_amount = price
        orderOne.order_amount = price
        orderOne.goods_name_all = goodsName
        orderOne.save()
    order['goodsinfo'] = goodsinfo
    order['price'] = price
    order['use_time'] = use_time
    order['order_sn'] = ordersn
    order['order_img'] = orderOne.order_img
    # #清空文件夹
    # del_file("/home/msh/PycharmProjects/intelligent/ilgapps/upload/bannerPic/")
    try:
        post_result = "{\"data\":" + json_encode(order) + "}"
    except:
            ret = "\"0\""
            msg = "系统繁忙！"
            post_result="{\"ret\":" + ret + ", \"message\":\"" + msg + "\"}"
    return HttpResponse(post_result)

def del_file(filepath):
    """
    删除某一目录下的所有文件或文件夹
    :param filepath: 路径
    :return:
    """
    del_list = os.listdir(filepath)
    for f in del_list:
        file_path = os.path.join(filepath, f)
        if os.path.isfile(file_path):
            os.remove(file_path)
        elif os.path.isdir(file_path):
            shutil.rmtree(file_path)


@csrf_exempt
def getPayResult(request):
    order_sn = request.POST.get('order_sn')
    result = getResult(order_sn)
    if result==1:
        config = Config.objects.get(id=1)
        config.c_start_push_flag = 0
        config.save()
        orderObj = Order.objects.get(order_sn=order_sn)
        orderObj.status = 1
        orderObj.pay_time = datetime.datetime.now()
        orderObj.save()
        ret = "\"1\""
        msg = "支付成功！"
        post_result = "{\"ret\":" + ret + ", \"message\":\"" + msg + "\"}"

    else:
        ret = "\"0\""
        msg = "系统繁忙！"
        post_result = "{\"ret\":" + ret + ", \"message\":\"" + msg + "\"}"
    return HttpResponse(post_result)
