#-*- coding:utf-8 -*-
import datetime
import urllib

from django.http import HttpResponseRedirect, HttpResponse
from django.contrib.auth.decorators import login_required
from alipay import *
from django.shortcuts import render

from ilgapps.alipay.zalipay import *
from ilgapps.utils import k8Logger
from ilgapps.models import *
from django.http import HttpResponse, HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt
import logging
from django.conf import settings
import xml.etree.ElementTree as ET

logger1 = logging.getLogger(__name__)
logger1.setLevel(logging.INFO)
logger1.addHandler (logging.FileHandler('alipay.log'))





@csrf_exempt
def notify_url_handler(request):
    """
    Handler for notify_url for asynchronous updating billing information.
    Logging the information.
    """
    k8Logger.info('>>notify url handler start...')
    if request.method == 'POST':
        if notify_verify(request.POST):
            k8Logger.info('pass verification...')
            order_sn = request.POST.get('out_trade_no')
            k8Logger.info('--order_sn--'+order_sn)
            trade_status = request.POST.get('trade_status')
            k8Logger.info('--trade_status--'+trade_status)
            if trade_status and (trade_status=="TRADE_FINISHED" or trade_status=="TRADE_SUCCESS"):
                #1.处理订单状态 已付款、待发货、以及付款时间
                orderObj = Order.objects.get(order_sn=order_sn)
                orderObj.pay_status = 2 #付款状态 已付款

                orderObj.pay_time =datetime.now()
                if orderObj.pay_id !=3:
                    orderObj.order_status = 1 #订单状态 ：已确认
                    orderObj.shipping_status = 0 #发货状态 ：待发货
                    orderObj.pay_id = 2
                    orderObj.pay_name = u'支付宝支付'
                orderObj.save()

                return HttpResponse ("success")
            else:
                return HttpResponse("success：")
    return HttpResponse(u"fail")


def payment_success(request):

     return render(request,"alipay/success.html")

def payment_error(request):

    return render(request,"alipay/error.html")



