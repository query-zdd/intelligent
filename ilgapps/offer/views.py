# -*- coding: utf-8 -*-
from django.db.models import Q

from ilgapps.models import *

from ilgapps.utils import *
from ilgapps.paginatorlib import *

from datetime import *

import traceback
import datetime
import shutil
import os
from django.db.models import Avg,Count,Min,Max,Sum
from ilgapps.offer.time_now import current_time
def showOfferSample(request):
    return render(request, "offer/offer-search.html",locals())


def showVideoSample(request):
    return render(request,"offer/video-search.html",locals())


def showOfferEdit(request):
    ban_id = request.GET.get('id')
    obj = Banner.objects.get(id=ban_id)
    # 处理结果
    fx_des = "分析说明计划"
    return render(request,'offer/offer_edit.html',locals())

def showOfferOne(request):
    ban_id = request.GET.get('id')
    obj = Banner.objects.get(id=ban_id)
    # 处理结果
    fx_des = "分析说明计划"
    return render(request,'offer/offer-one.html',locals())


def getdate(date ):
    __s_date = datetime.date(1899, 12, 31).toordinal() - 1
    if isinstance(date, float):
        date = int(date )
    d = datetime.date.fromordinal(__s_date + date)
    return d.strftime("%Y-%m-%d")

# 获取数组最大值 #
def maxInt(intArray):
    max = 0
    for i in intArray:
        if max < i:
            max = i
    return max

@csrf_exempt
def fileUploadOfferImg(request):
    try:
        if request.method == "POST":
            try:
                file = request.FILES['file']
            except:
                ret = "\"0\""
                msg = "导入失败"
                post_result = "{\"ret\":" + ret + ", \"message\":\"" + msg + "\"}"
                return HttpResponse(post_result)
            flag = request.POST.get('flag')
            if flag=='1':
                uploadedFileName = str("JPG_" + datetime.datetime.now().strftime("%Y%m%d%H%M%S") + ".jpg")
            if flag == '2':
                uploadedFileName = "demo.mp4"
            destination = open(str(settings.MEDIA_ROOT + "temp/" + uploadedFileName), 'wb')
            for chunk in file.chunks():
                destination.write(chunk)
            destination.close()

            #save
            try:
                sorceF = str(settings.MEDIA_ROOT + "temp/" + str(uploadedFileName))
                targetF = str(settings.MEDIA_ROOT + "bannerPic/" + str(uploadedFileName))
                if not os.path.exists(targetF) and os.path.exists(sorceF):
                    open(targetF, "wb").write(open(sorceF, "rb").read())
            except:
                pass
            # save
            try:
                sorceF = str(settings.MEDIA_ROOT + "temp/" + str(uploadedFileName))
                targetF = str("/home/msh/PycharmProjects/intelligent/ilgapps/upload/bannerPic/" + str(uploadedFileName))
                if not os.path.exists(targetF) and os.path.exists(sorceF):
                    open(targetF, "wb").write(open(sorceF, "rb").read())
                    os.remove(sorceF)  # 删除临时图片文件
            except:
                pass

            if flag == '1':
                target_path, labels, ilg_time = start_img(targetF)
                try:
                    re_img_name = uploadedFileName[:-4]+"_det.jpg"
                    sorceF = target_path
                    targetF = str(settings.MEDIA_ROOT + "picImg/" + str(re_img_name))

                    if not os.path.exists(targetF) and os.path.exists(sorceF):
                        open(targetF, "wb").write(open(sorceF, "rb").read())
                except:
                    pass

                class_dic = {
                    "d1": ["米饭", 1], "d2": ["豆角炒茄子", 5], "d3": ["辣椒炒肉", 6], "d4": ["梅菜扣肉", 12], "d5": ["花生米", 5],
                    "d6": ["红烧肉", 13],
                    "d7": ["玉米火腿炒豌豆", 6], "d8": ["糖醋里脊", 10],
                    "d9": ["冬瓜炒肉片", 8], "d10": ["辣子鸡丁", 7], "d11": ["凉拌豆皮", 3], "d12": ["芹菜豆干", 4], "d13": ["炒土豆丝", 3],
                    "d14": ["炒豆角", 3], "d15": ["娃娃菜", 5],
                    "d16": ["鸡蛋火腿", 8], "d17": ["鱼香肉丝", 10], "d18": ["土豆牛肉", 15], "d19": ["西红柿炒鸡蛋", 6],
                    "d20": ["肉末茄子", 8],
                    "d21": ["炒竹笋", 5]
                }
                goods = labels.tolist()
                goodsinfo = []
                price = 0
                goods_str = ''
                if goods:
                    for one in goods:
                        one_dic = {}
                        key_c = "d" + str(one)
                        goods_str +=str(one)+","
                        price += class_dic[key_c][1]
                        one_dic['name'] = class_dic[key_c][0]
                        one_dic['price'] = class_dic[key_c][1]
                        goodsinfo.append(one_dic)

                banner = Banner()
                banner.description = "演示用例"
                banner.position = "测试用例智能分析总金额"
                banner.to_url = '/upload/picImg/'+ re_img_name
                banner.is_valid = 1
                banner.use_time = ilg_time
                banner.price = price
                banner.goods =  goods_str
                banner.pic =  '/upload/picImg/'+ re_img_name
                banner.save()

                ret = "\"0\""
                msg_id  = Banner.objects.last().id
                post_result = "{\"ret\":" + ret + ", \"message\":\"" + str(msg_id) + "\", \"itemToDbSuccess\":\"" + str(
                    destination) + "\"}"
                return HttpResponse(post_result)
            if flag == '2':
                ret = "\"0\""
                msg_id =0
                post_result = "{\"ret\":" + ret + ", \"message\":\"" + str(msg_id) + "\", \"itemToDbSuccess\":\"" + str(
                    destination) + "\"}"
                return HttpResponse(post_result)
    except Exception as e:
        exstr = traceback.format_exc()
        ret = "\"1\""
        msg = "导入失败"
        post_result = "{\"ret\":" + ret + ", \"message\":\"" + msg + "\"}"
        return HttpResponse(post_result)


def showSearchBanner(request):
    banner=Banner.objects.filter(is_valid=1)
    page = request.GET.get('page',1)
    step = request.GET.get('step',10)
    page_conf = PageConf(banner,page,step)
    paginator = page_conf.getData()
    page_num_list = page_conf.getPageList()
    min_item, max_item = page_conf.getIndexRange()
    return render(request,'offer/offer_search_banner.html',locals())

@csrf_exempt
def saveBanner(request):
    try:
        banner_id = request.POST.get('banner_id')
        if banner_id:
            banner = Banner.objects.get(id = banner_id)
        else:
            banner = Banner()
            banner.description = request.POST.get('name')
            banner.position = request.POST.get('pos')
            bannerPicName = request.POST.get('bannerPicName')
            banner.position = request.POST.get('pos').strip()
            if request.POST.get('bannerUrl'):
                banner.to_url = request.POST.get('bannerUrl').strip()
            banner.is_valid = 1
            try:
                targetF = str(settings.MEDIA_ROOT + "bannerPic/" + str(bannerPicName))
                sourceF = str(settings.MEDIA_ROOT + "temp/" + str(bannerPicName))
                if not os.path.exists(targetF) and os.path.exists(sourceF):
                    open(targetF, "wb").write(open(sourceF, "rb").read())
                    os.remove(sourceF)  # 删除临时图片文件
            except:
                pass
            if bannerPicName:
                banner.pic = '/upload/bannerPic/'+ bannerPicName
            else:
                banner.pic = None

        banner.save()
        ret = "0"
        post_result = "{\"ret\":" + ret + "}"
        return HttpResponse(post_result)
    except:
        traceback.print_exc()


@csrf_exempt
def BannerOperation(request):
    id = request.POST.get('id')
    operationCode=request.POST.get('operationcode')
    if operationCode=="query":
        banner = Banner.objects.get(id = id)
        post_result = "{\"msg\":" + json_encode(banner) + "}"
    else:
        try:
            banner = Banner.objects.get(id = id)
            banner.is_valid=0
            banner.save()
            ret = "\"0\""
            msg = "删除成功！"
            post_result="{\"ret\":" + ret + ", \"message\":\"" + msg + "\"}"
        except Exception as e:
            print(e)
    return HttpResponse(post_result)


def showGoods(request):
    goods=Goods.objects.filter(is_del=0)
    page = request.GET.get('page',1)
    step = request.GET.get('step',10)
    page_conf = PageConf(goods,page,step)
    paginator = page_conf.getData()
    page_num_list = page_conf.getPageList()
    min_item, max_item = page_conf.getIndexRange()
    # return render_to_response('offer/offer_goods.html',locals())
    return render(request, 'offer/offer_goods.html', locals())

@csrf_exempt
def saveGoods(request):
    try:
        goods_id = request.POST.get('goods_id')
        if goods_id:
            goods = Goods.objects.get(goods_id = goods_id)
        else:
            goods = Goods()
        goods.goods_name = request.POST.get('goods_name')
        goods.goods_content = request.POST.get('goods_content')
        goods.goods_info =  request.POST.get('goods_info')
        goods.goods_sn = request.POST.get('goods_sn')
        goods.goods_price = request.POST.get('price')
        goods.is_del = 0
        bannerPicName = request.POST.get('bannerPicName')
        if request.POST.get('bannerUrl'):
            goods.goods_img = request.POST.get('bannerUrl').strip()
        try:
            targetF = str(settings.MEDIA_ROOT + "goods/" + str(bannerPicName))
            sourceF = str(settings.MEDIA_ROOT + "temp/" + str(bannerPicName))
            if not os.path.exists(targetF) and os.path.exists(sourceF):
                open(targetF, "wb").write(open(sourceF, "rb").read())
                os.remove(sourceF)  # 删除临时图片文件
        except:
            pass
        if bannerPicName:
            goods.goods_img ='/upload/goods/'+ bannerPicName
        else:
            goods.goods_img = bannerPicName

        goods.save()
        ret = "0"
        post_result = "{\"ret\":" + ret + "}"
        return HttpResponse(post_result)
    except:
        traceback.print_exc()

@csrf_exempt
def goodsOperation(request):
    id = request.POST.get('id')
    operationCode=request.POST.get('operationcode')
    if operationCode=="query":
        if id:
            goodsObj = Goods.objects.get(goods_id = id)
        else:
            goodsObj = Goods.objects.all()
        post_result = "{\"msg\":" + json_encode(goodsObj) + "}"
    else:
        try:
            goodsOne = Goods.objects.get(goods_id = id)
            goodsOne.is_del=1
            goodsOne.save()
            ret = "\"0\""
            msg = "删除成功！"
            post_result="{\"ret\":" + ret + ", \"message\":\"" + msg + "\"}"
        except Exception as e:
            print(e)
    return HttpResponse(post_result)

@csrf_exempt
def queryGoods(request):
    ll = 1
    data = request.POST.get("flag")
    print(data)
    flag = 1
    if flag==0:
        goodsObj = Goods.objects.get(goods_id = id)
    else:
        goodsObj = Goods.objects.all()
    post_result = "{\"msg\":" + json_encode(goodsObj) + "}"
    return HttpResponse(post_result)

def showMember(request):
    member=Person.objects.filter(is_del=0)
    page = request.GET.get('page',1)
    step = request.GET.get('step',10)
    page_conf = PageConf(member,page,step)
    paginator = page_conf.getData()
    page_num_list = page_conf.getPageList()
    min_item, max_item = page_conf.getIndexRange()
    return render(request,'offer/offer_member.html',locals())

@csrf_exempt
def saveMember(request):
    try:
        person_id = request.POST.get('person_id')
        if person_id:
            person = Person.objects.get(person_id = person_id)
        else:
            person = Person()
        person.member_name = request.POST.get('member_name')
        person.card = request.POST.get('card')
        person.age = request.POST.get('age')
        person.address = request.POST.get('address')
        person.email = request.POST.get('email')
        person.password = request.POST.get('password')
        person.is_del = 0
        bannerPicName = request.POST.get('bannerPicName')
        if request.POST.get('bannerUrl'):
            person.image = request.POST.get('bannerUrl').strip()
        try:
            targetF = str(settings.MEDIA_ROOT + "bannerPic/" + str(bannerPicName))
            sourceF = str(settings.MEDIA_ROOT + "temp/" + str(bannerPicName))
            if not os.path.exists(targetF) and os.path.exists(sourceF):
                open(targetF, "wb").write(open(sourceF, "rb").read())
                os.remove(sourceF)  # 删除临时图片文件
        except:
            pass
        if bannerPicName:
            person.image = '/upload/bannerPic/'+ bannerPicName
        else:
            person.image = None

        person.save()
        ret = "0"
        post_result = "{\"ret\":" + ret + "}"
        return HttpResponse(post_result)
    except:
        traceback.print_exc()

@csrf_exempt
def memberOperation(request):
    id = request.POST.get('id')
    operationCode=request.POST.get('operationcode')
    if operationCode=="query":
        memberObj = Person.objects.get(person_id = id)
        post_result = "{\"msg\":" + json_encode(memberObj) + "}"
    else:
        try:
            memberOne = Person.objects.get(person_id = id)
            memberOne.is_del=1
            memberOne.save()
            ret = "\"0\""
            msg = "删除成功！"
            post_result="{\"ret\":" + ret + ", \"message\":\"" + msg + "\"}"
        except Exception as e:
            print(e)
    return HttpResponse(post_result)




def showOrder(request):
    OrderObj=Order.objects.filter()
    page = request.GET.get('page',1)
    step = request.GET.get('step',10)
    page_conf = PageConf(OrderObj,page,step)
    paginator = page_conf.getData()
    page_num_list = page_conf.getPageList()
    min_item, max_item = page_conf.getIndexRange()
    # return render_to_response('offer/offer_goods.html',locals())
    return render(request, 'offer/offer_order.html', locals())

@csrf_exempt
def saveOrder(request):
    try:
        order_id = request.POST.get('order_id')
        if order_id:
            orderOne = Order.objects.get(order_id = order_id)
        else:
            orderOne = Order()
        orderOne.order_amount = request.POST.get('price')

        orderOne.save()
        ret = "0"
        post_result = "{\"ret\":" + ret + "}"
        return HttpResponse(post_result)
    except:
        traceback.print_exc()

@csrf_exempt
def orderOperation(request):
    id = request.POST.get('id')
    operationCode=request.POST.get('operationcode')
    if operationCode=="query":
        orderOne = Order.objects.get(order_id = id)
        post_result = "{\"msg\":" + json_encode(orderOne) + "}"
    else:
        try:
            orderOne = Order.objects.get(order_id = id)
            orderOne.is_del=1
            orderOne.save()
            ret = "\"0\""
            msg = "删除成功！"
            post_result="{\"ret\":" + ret + ", \"message\":\"" + msg + "\"}"
        except Exception as e:
            print(e)
    return HttpResponse(post_result)


def showOrderStatistics(request):
    now = datetime.datetime.now()
    today_0 = current_time("sub_time", 0)
    # 当天数据
    t_order_obj = Order.objects.filter(create_time__gte=today_0,create_time__lte=now,status=1)
    t_order_amount = t_order_obj.aggregate(nums=Sum('order_amount'))
    t_order_num = t_order_obj.count()

    # 总数据
    all_order_obj = Order.objects.filter(create_time__lte=now,status=1)
    all_order_amount = all_order_obj.aggregate(nums=Sum('order_amount'))
    all_order_num = all_order_obj.count()

    return render(request, "offer/statistic.html",locals())

@csrf_exempt
def getOrderStatic(request):
    try:
        data = {}
        d_list =[]
        for i in range(1,8,1):
            samp={}
            temp=[]
            num = 7+i*(-1)
            start = current_time("sub_time", num)
            end = current_time("sub_time", num-1)
            orderObj = Order.objects.filter(create_time__gte=start, create_time__lt=end, status=1)
            amount = orderObj.aggregate(nums=Sum('order_amount'))
            num = orderObj.count()
            temp.append(i)
            temp.append(num)
            d_list.append(temp)
            key_str = str(i)
            samp['num'] = num
            if not amount["nums"]:
                samp['amount'] = 0.00
            else:
                samp['amount'] = amount['nums']

            samp['date'] = start.date()
            data[key_str] = samp
        data['d_list'] = d_list
        data=json_encode(data)
        ret = "\"0\""
        msg = "检索成功！"
        post_result="{\"ret\":" + ret + ", \"message\":\"" + msg+ "\", \"data\":" + data + "}"
    except Exception as e:
        print(e)
    return HttpResponse(post_result)



def showGoodsStatistics(request):
    now = datetime.datetime.now()
    today_0 = current_time("sub_time", 1)
    # 当天数据
    t_order_obj = Order.objects.filter(create_time__gte=today_0,create_time__lte=now,status=1)
    ids = [one.order_id for one in t_order_obj]
    orderLine = OrderLine.objects.filter(order_id__in=ids).values("goods_name").annotate(c=Count("goods_name"))
    num = orderLine.count()
    c=0
    goods_name = "米饭"
    for one in orderLine:
        if one['c']>c:
            c=one['c']
            goods_name = one["goods_name"]


    return render(request, "offer/goods_statistic.html",locals())

@csrf_exempt
def getGoodsStatic(request):
    try:
        now = datetime.datetime.now()
        today_0 = current_time("sub_time", 7)
        t_order_obj = Order.objects.filter(create_time__gte=today_0, create_time__lte=now, status=1)
        ids = [one.order_id for one in t_order_obj]
        orderLine = OrderLine.objects.filter(order_id__in=ids).values("goods_name").annotate(c=Count("goods_name"))
        data=json_encode(orderLine)
        ret = "\"0\""
        msg = "检索成功！"
        post_result="{\"ret\":" + ret + ", \"message\":\"" + msg+ "\", \"data\":" + data + "}"
    except Exception as e:
        print(e)
    return HttpResponse(post_result)



def showGoodsFeature(request):
    goodsObj=GoodsFeature.objects.filter(is_del=0)
    page = request.GET.get('page',1)
    step = request.GET.get('step',10)
    page_conf = PageConf(goodsObj,page,step)
    paginator = page_conf.getData()
    page_num_list = page_conf.getPageList()
    min_item, max_item = page_conf.getIndexRange()
    # return render_to_response('offer/offer_goods.html',locals())
    return render(request, 'offer/offer_goods_feature.html', locals())


@csrf_exempt
def fileUploadOfferVideo(request):
    try:
        if request.method == "POST":
            uploadedFileURI = ''  # 上传后文件路径
            uploadedFileName = ''  # 上传后文件名
            if request.method == 'POST':
                msg = "form.is_valid() =false"
                file = request.FILES['resource']
                uploadedFileName = str("newvideo" + datetime.datetime.now().strftime("%Y%m%d%H%M%S") + os.path.splitext(file.name)[1])
                destinationPath = str(settings.MEDIA_ROOT + "temp/" + uploadedFileName)
                destination = open(destinationPath, 'wb')
                uploadedFileURI = str(settings.DOMAIN_URL + 'upload/temp/' + uploadedFileName)
                for chunk in file.chunks():
                    destination.write(chunk)
                destination.close()
                msg = "destination.close()"
            ret = "0"
            post_result = "{\"ret\":" + ret + ", \"message\":\"" + msg + "\",\"fileuri\":\"" + uploadedFileURI + "\", \"filename\":\"" + uploadedFileName + "\", \"destinationPath\":\"" + destinationPath + "\"}"
            return HttpResponse(post_result)
    except Exception as e:
        exstr = traceback.format_exc()
        ret = "\"1\""
        msg = "导入失败"
        post_result = "{\"ret\":" + ret + ", \"message\":\"" + msg + "\"}"
        return HttpResponse(post_result)


@csrf_exempt
def saveGoodsFeature(request):
    try:
        goods_id = request.POST.get('goods_id')
        if goods_id:
            goods = GoodsFeature.objects.get(id = goods_id)
        else:
            goods = GoodsFeature()
        goods.goods_name = request.POST.get('goods_name')
        goods.goods_content = request.POST.get('goods_content')
        goods.goods_info =  request.POST.get('goods_info')
        goods.goods_lable = request.POST.get('goods_sn')
        goods.goods_price = request.POST.get('price')
        goods.is_del = 0

        bannerPicName = request.POST.get('bannerPicName')
        bannerUrl = request.POST.get('bannerUrl')
        if bannerPicName != bannerUrl:
            try:
                targetF = str(settings.MEDIA_ROOT + "goods/" + str(bannerPicName))
                sourceF = str(settings.MEDIA_ROOT + "temp/" + str(bannerPicName))
                if not os.path.exists(targetF) and os.path.exists(sourceF):
                    open(targetF, "wb").write(open(sourceF, "rb").read())
                    os.remove(sourceF)  # 删除临时图片文件
            except:
                pass
            goods.goods_img = '/upload/goods/' + bannerPicName

        goods_feature_url = request.POST.get('goods_feature_url')
        bannerVideoUrl = request.POST.get('bannerVideoUrl')
        if goods_feature_url != bannerVideoUrl:
            try:
                targetF = str(settings.MEDIA_ROOT + "goods_video/" + str(goods_feature_url))
                sourceF = str(settings.MEDIA_ROOT + "temp/" + str(goods_feature_url))
                if not os.path.exists(targetF) and os.path.exists(sourceF):
                    open(targetF, "wb").write(open(sourceF, "rb").read())
                    os.remove(sourceF)  # 删除临时图片文件
            except:
                pass
            goods.goods_feature_url = '/upload/goods/' + goods_feature_url

        goods.save()
        ret = "0"
        post_result = "{\"ret\":" + ret + "}"
        return HttpResponse(post_result)
    except:
        traceback.print_exc()

@csrf_exempt
def goodsVideoOperation(request):
    id = request.POST.get('id')
    operationCode=request.POST.get('operationcode')
    if operationCode=="query":
        goodsObj = GoodsFeature.objects.get(id = id)
        post_result = "{\"msg\":" + json_encode(goodsObj) + "}"
    else:
        try:
            goodsOne = GoodsFeature.objects.get(id = id)
            goodsOne.is_del=1
            goodsOne.save()
            ret = "\"0\""
            msg = "删除成功！"
            post_result="{\"ret\":" + ret + ", \"message\":\"" + msg + "\"}"
        except Exception as e:
            print(e)
    return HttpResponse(post_result)