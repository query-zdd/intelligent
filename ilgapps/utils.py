# -*- coding:UTF-8 -*-
import logging
import types

import django
import qrcode
from django.db import models
# from django.utils import simplejson as json
from decimal import *
from django.db.models.base import ModelState
from datetime import datetime, date

from django.forms import model_to_dict
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse,HttpResponseRedirect
from django.shortcuts import  render
from django.conf import settings
from ilgapps.models import *
import urllib
import os
import json
from PIL import Image,ImageDraw,ImageFont
import random
import functools
os.environ.setdefault('DJANGO_SETTING_MODULE', 'ilg2020.settings')
django.setup()

def clearData(s):
    dirty_stuff = ["\"", "\\", "/", "*", "'", "=", "-", "#", ";", "<", ">", "+", "%"]
    dirty_stuff.extend(["select","SELECT","DROP","drop","delete","DELETE","update","UPDATE","INESRT","insert","CREATE","create"])
    for stuff in dirty_stuff:
        s = s.replace(stuff,"")
    return s


def percentage(count, total):
    if total == 0:
        return "0%"

    rate = float(count) / float(total)
    percent = int(rate * 100)
    return "%d%%" % percent


def json_encode(data):
    """
    The main issues with django's default json serializer is that properties that
    had been added to a object dynamically are being ignored (and it also has 
    problems with some models).
    """

    def _any(data):
        ret = None
        if type(data) is list:
            ret = _list(data)
        elif type(data) is dict:
            ret = _dict(data)
        elif isinstance(data, Decimal):
            # json.dumps() cant handle Decimal
            ret = str(data)
        elif isinstance(data, models.query.QuerySet):
            # Actually its the same as a list ...
            ret = _list(data)
        elif isinstance(data, models.Model):
            ret = _model(data)
        elif isinstance(data, ModelState):
            ret = None
        elif isinstance(data, datetime):
            ret = data.strftime('%Y-%m-%d %H:%M:%S')
        elif isinstance(data, date):
            ret = data.strftime('%Y-%m-%d')
        # elif isinstance(data, django.db.models_old.fields.related.RelatedManager):
        #    ret = _list(data.all())
        else:
            ret = data
        return ret

    def _model(data):
        # ret = {}
        # # If we only have a model, we only want to encode the fields.
        # for f in data._meta.fields:
        #     ret[f.attname] = _any(getattr(data, f.attname))
        # # And additionally encode arbitrary properties that had been added.
        # fields = dir(data.__class__) + ret.keys()
        # add_ons = [k for k in dir(data) if k not in fields]
        # for k in add_ons:
        #     ret[k] = _any(getattr(data, k))
        ret = model_to_dict(data)
        ret = _dict(ret)
        return ret

    def _list(data):
        ret = []
        for v in data:
            ret.append(_any(v))
        return ret

    def _dict(data):
        ret = {}
        for k, v in data.items():
            ret[k] = _any(v)
        return ret

    ret = _any(data)
    return json.dumps(ret,ensure_ascii=False)

def checkPicScale(picfile,width,height):
    if width:
        if Image.open(picfile).size == (int(width),int(height)):
            return True
        else:
            return False
    w,h = Image.open(picfile).size
    if w == h:
        return True
    else:
        return False


@csrf_exempt
def upload_file(request):
    ret = "0"
    # tmpIm = cStringIO.StringIO(request.FILES['resource'])
    uploadedFileURI = ''  # 上传后文件路径
    uploadedFileName = ''  # 上传后文件名
    if request.method == 'POST':
        msg = "form.is_valid() =false"
        f = request.FILES['resource']
        uploadedFileName = str("newpic" + datetime.now().strftime("%Y%m%d%H%M%S") + os.path.splitext(f.name)[1])
        destinationPath = str(settings.MEDIA_ROOT + "temp/" + uploadedFileName)
        destination = open(destinationPath, 'wb')
        uploadedFileURI = str(settings.DOMAIN_URL + 'upload/temp/' + uploadedFileName)
        for chunk in f.chunks():
            destination.write(chunk)
        destination.close()
        msg = "destination.close()"
    post_result = "{\"ret\":" + ret + ", \"message\":\"" + msg + "\",\"fileuri\":\"" + uploadedFileURI + "\", \"filename\":\"" + uploadedFileName + "\", \"destinationPath\":\"" + destinationPath +"\"}"
    return HttpResponse(post_result)


class k8Logger(object):
    @staticmethod
    def basicConfig():
        # 判断当天日志文件是否存在，如果存在就保存至今日的日志文件，否则。。。
        strNow = datetime.now().strftime("%Y%m%d")
        logFilePath = settings.PROJECT_PATH + '/log/log' + strNow + '.log'
        if not os.path.isfile(logFilePath):
            logging.basicConfig(filename=logFilePath, level=logging.INFO)  # StreamHandler

    @staticmethod
    def info(logMessage):
        k8Logger.basicConfig()
        strNow = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        logging.info('--logtime:' + strNow + '--' + logMessage)

    @staticmethod
    def error(logMessage):
        k8Logger.basicConfig()
        strNow = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        logging.error('--logtime:' + strNow + '--' + logMessage)




class CreateQrCode(object):
    """创建二维码图片"""

    def __init__(self,hrefstr,headhref):
        """初始化配置信息"""
        self.version = 1
        self.error_correction = qrcode.constants.ERROR_CORRECT_H
        self.box_size = 10
        self.border = 1
        self.hrefstr= hrefstr
        self.headhref=headhref

    def getImg(self):
        """下载微信头像"""
        url = self.headhref
        uploadedFileName = str("wxheadimg" + datetime.now().strftime("%Y%m%d%H%M%S") + str(random.randrange(0, 100)))
        destination = str(settings.MEDIA_ROOT + "headimg/" + uploadedFileName)
        #保存文件时候注意类型要匹配，如要保存的图片为jpg，则打开的文件的名称必须是jpg格式，否则会产生无效图片
        conn = urllib.urlopen(url).read()
        f = open(destination,'wb')
        f.write(conn)
        f.close()
        return destination

    def freeCollarCode(self,merchantMouldImg):
        qr = qrcode.QRCode(
            version=self.version,
            error_correction=self.error_correction,
            box_size=self.box_size,
            border=self.border
        )
        qr.add_data(self.hrefstr)
        qr.make(fit=True)
        img = qr.make_image()
        img = img.resize((194,194), Image.ANTIALIAS)
        backImg = Image.open(merchantMouldImg)
        backImg.paste(img, (43, 803))
        uploadedFileName = str("free" + datetime.now().strftime("%Y%m%d%H%M%S") + str(random.randrange(0, 100))+'.jpg')
        destination = str(settings.MEDIA_ROOT + "freeCollar/" + uploadedFileName)
        backImg.save(destination)
        return uploadedFileName

    def onlyCode(self):
        """二维码图片"""
        qr = qrcode.QRCode(
            version=self.version,
            error_correction=self.error_correction,
            box_size=self.box_size,
            border=self.border
        )
        qr.add_data(self.hrefstr)
        qr.make(fit=True)
        img = qr.make_image()
        uploadedFileName = str("QRCode" + datetime.now().strftime("%Y%m%d%H%M%S") + str(random.randrange(0, 1000))+'.jpg')
        destination = str(settings.MEDIA_ROOT + "QRCode/" + uploadedFileName)
        img.save(destination,'JPEG')
        return uploadedFileName

    def groupSnCode(self,groupSn,name,price,pic):
        """二维码图片"""
        #字体加载
        font_price = ImageFont.truetype("/usr/share/fonts/truetype/simsun.ttf",30)
        font_name = ImageFont.truetype("/usr/share/fonts/truetype/simsun.ttf",20)
        #商品图片加载
        good_pic = Image.open(settings.MEDIA_ROOT + "goods/" + pic)
        good_pic = good_pic.resize((160,160),Image.ANTIALIAS)
        #二维码加载
        qr = qrcode.QRCode(
            version=self.version,
            error_correction=self.error_correction,
            box_size=self.box_size,
            border=self.border
        )
        qr.add_data(self.hrefstr)
        qr.make(fit=True)
        code = qr.make_image()
        code = code.resize((280,280),Image.ANTIALIAS)
        #图片粘贴
        img = Image.new("RGBA",(480,640),(255,255,255))
        img.paste(good_pic, (40, 40))
        img.paste(code, (100, 340))
        #图片加字
        draw = ImageDraw.Draw(img)
        lineCount = 0
        while(len(name) > 0):
            #为防止商品名太长,每行写10个字符
            text = name[:10]
            draw.text((240,60 + lineCount * 40), text,(0,0,0),font=font_name)
            name = name[len(text):]
            lineCount += 1
        draw.text( (240,60 + lineCount * 40), price,(0,0,0),font=font_price)
        uploadedFileName = str("QRCode" + groupSn +'.jpg')
        destination = str(settings.MEDIA_ROOT + "QRCode/" + uploadedFileName)
        img.save(destination,'JPEG')
        return uploadedFileName

    def memInfoCode(self):
        """个人信息二维码图片"""
        qr = qrcode.QRCode(
            version=self.version,
            error_correction=self.error_correction,
            box_size=self.box_size,
            border=self.border
        )
        qr.add_data(self.hrefstr)
        qr.make(fit=True)
        img = qr.make_image()
        uploadedFileName = str("QRMember" + datetime.now().strftime("%Y%m%d%H%M%S") + str(random.randrange(0, 100))+'.jpg')
        destination = str(settings.MEDIA_ROOT + "QRCode/" + uploadedFileName)
        img.save(destination,'JPEG')
        return uploadedFileName


    def imgCode(self):
        """加图片的二维码图片"""
        qr = qrcode.QRCode(
            version=self.version,
            error_correction=self.error_correction,
            box_size=self.box_size,
            border=self.border
        )
        qr.add_data(self.hrefstr)
        qr.make(fit=True)

        img = qr.make_image()
        img = img.convert("RGB")
        herdimg=self.getImg()
        icon = Image.open(herdimg)

        img_w, img_h = img.size
        factor = 4
        size_w = int(img_w / factor)
        size_h = int(img_h / factor)

        icon_w, icon_h = icon.size
        if icon_w > size_w:
            icon_w = size_w
        if icon_h > size_h:
            icon_h = size_h
        icon = icon.resize((icon_w, icon_h), Image.ANTIALIAS)

        w = int((img_w - icon_w) / 2)
        h = int((img_h - icon_h) / 2)
        img.paste(icon, (w, h))
        uploadedFileName = str("QRCode" + datetime.now().strftime("%Y%m%d%H%M%S") + str(random.randrange(0, 100))+'.jpg')
        destination = str(settings.MEDIA_ROOT + "QRCode/" + uploadedFileName)
        img.save(destination,'JPEG')
        return uploadedFileName

@csrf_exempt
def uploadDescImg(request):
    if request.method == 'POST':
        try:
            callback = request.GET.get('CKEditorFuncNum')
            f = request.FILES['upload']
            uploadedFileName = str("newpic" + datetime.now().strftime("%Y%m%d%H%M%S") + os.path.splitext(f.name)[1])
            destination = open(str(settings.MEDIA_ROOT + "productLine/productstory/" + uploadedFileName), 'wb')
            uploadedFileURI = str(settings.DOMAIN_URL + 'upload/productLine/productstory/' + uploadedFileName)
            for chunk in f.chunks():
                destination.write(chunk)
            destination.close()
            retval = "<script>window.parent.CKEDITOR.tools.callFunction("+callback+",'"+'/upload/productLine/productstory/' + uploadedFileName+"', '');</script>"
            return HttpResponse("<script>window.parent.CKEDITOR.tools.callFunction("+callback+",'"+'/upload/productLine/productstory/' + uploadedFileName+"', '');</script>")
        except:
            callback = request.GET.get('CKEditorFuncNum')
            return HttpResponse("<script>window.parent.CKEDITOR.tools.callFunction(" + callback
                    + ",''," + "'上传失败');</script>")





def checkPrivilege(request):
    url = request.path
    try:
        sysuser_id = request.COOKIES['sysuser_id']
    except:
        sysuser_id = request.session['sysuser_id']
    sys_user = SysUser.objects.get(sysuser_id=sysuser_id)
    privilege = Privilege.objects.get(url=url)
    if privilege.priv_id in getStaffPriviID(sys_user):
        return True
    else:
        return False

def getStaffPriviID(sys_user):
    listResult = []
    rolePrivilege = Role.objects.get(role_id=sys_user.user_role).privileges
    if rolePrivilege == 'total':
        tmp = Privilege.objects.values_list('priv_id')
        for i in tmp:
            listResult.append(i[0])
        return listResult
    listPrivID = [x for x in rolePrivilege.split(';') if x != ''] if rolePrivilege else []
    listResult.extend(analyzeStaffPriviID(listPrivID))
    extra_priv = sys_user.extra_privilege
    if extra_priv:
        listPrivID = [x for x in extra_priv.split(';') if x != '']
        listResult.extend(analyzeStaffPriviID(listPrivID))
    return listResult

def analyzeStaffPriviID(obj):
    ret = []
    for item in obj:
        if item.isdigit():
            ret.append(int(item))
        else:
            elements = item.split('-')
            ret.extend(range(int(elements[0]),int(elements[1])+1))
    return ret

def getPageCtrlPermArray(request,url=None):
    dictPermArray = {}
    if not url:
        url = request.path
    sysuser_id = request.COOKIES['sysuser_id']
    sys_user = SysUser.objects.get(sysuser_id=sysuser_id)
    privilege = Privilege.objects.get(url=url)
    try:
        ctrlPriv  = Privilege.objects.filter(priv_id__in=[x for x in privilege.child_priv.split(';') if x != ''])
        for cp in ctrlPriv:
            if cp.priv_id in getStaffPriviID(sys_user):
                dictPermArray[cp.url.split('/')[-2]] = True
            else:
                dictPermArray[cp.url.split('/')[-2]] = False
    except:
        pass
    return dictPermArray


def checkPermission(type):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(request):
            if type == 'page':
                if not 'sysuser_id' in request.COOKIES:
                    response = HttpResponseRedirect('/?srcurl=' + request.path)
                    return response
                if checkPrivilege(request):
                    return func(request)
                else:
                    return render_to_response('permissionDeny.html')
            elif type == 'api':
                if not 'sysuser_id' in request.COOKIES:
                    ret = "\"1\""
                    msg = "请先登陆！"
                    post_result = "{\"ret\":" + ret + ", \"message\":\"" + msg + "\"}"
                    return HttpResponse(post_result)
                if checkPrivilege(request):
                    return func(request)
                else:
                    ret = "\"2\""
                    msg = "您无该操作权限！请联系商户管理员!"
                    post_result = "{\"ret\":" + ret + ", \"message\":\"" + msg + "\"}"
                    return HttpResponse(post_result)
            # elif type == 'custom':
            #     url = request[0]
            #     sysuser_id = request[1]
            #     sys_user = SysUser.objects.get(sysuser_id=sysuser_id)
            #     privilege = Privilege.objects.get(url=url)
            #     if privilege.priv_id in getStaffPriviID(sys_user):
            #         return True
            #     else:
            #         return False
        return wrapper
    return decorator

@csrf_exempt
def getModuleAccess(request):
    sysuser_id = request.session['sysuser_id']
    sys_user = SysUser.objects.get(sysuser_id = sysuser_id)
    login_name = sys_user.user_name if sys_user.user_name else sys_user.login_name
    post_result = "{\"ret\":" + sysuser_id + ",\"login_name\":\"" + login_name +"\"}"
    return HttpResponse(post_result)


def checkPermission(type):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(request):
            if type == 'page':
                if not 'sysuser_id' in request.COOKIES:
                    response = HttpResponseRedirect('/?srcurl=' + request.path)
                    return response
                if checkPrivilege(request):
                    return func(request)
                else:
                    return render_to_response('permissionDeny.html')
            elif type == 'api':
                if not 'sysuser_id' in request.COOKIES:
                    ret = "\"1\""
                    msg = "请先登陆！"
                    post_result = "{\"ret\":" + ret + ", \"message\":\"" + msg + "\"}"
                    return HttpResponse(post_result)
                if checkPrivilege(request):
                    return func(request)
                else:
                    ret = "\"2\""
                    msg = "您无该操作权限！请联系商户管理员!"
                    post_result = "{\"ret\":" + ret + ", \"message\":\"" + msg + "\"}"
                    return HttpResponse(post_result)
            # elif type == 'custom':
            #     url = request[0]
            #     sysuser_id = request[1]
            #     sys_user = SysUser.objects.get(sysuser_id=sysuser_id)
            #     privilege = Privilege.objects.get(url=url)
            #     if privilege.priv_id in getStaffPriviID(sys_user):
            #         return True
            #     else:
            #         return False
        return wrapper
    return decorator

def getPageList(data):
    ###分页页码预处理start######
    page_num_list = []
    more_page = 0
    for i in range(-2,3):
        if data.number + i > 0 and data.number + i <= data.paginator.num_pages:
            if i == 0:
                page_num_list.append((data.number + i,True))
            else:
                page_num_list.append((data.number + i,False))
        else:
            more_page += -i/abs(i)
    if more_page > 0 :
        for _ in range(0,more_page):
            if page_num_list[-1][0] + 1 <= data.paginator.num_pages:
                page_num_list.append((page_num_list[-1][0] + 1,False))
    elif more_page < 0:
        for _ in range(more_page,0):
            if page_num_list[0][0] - 1 > 0:
                page_num_list.insert(0,(page_num_list[0][0] - 1,False))
    ###分页页码预处理end######
    return page_num_list

import traceback

def resizePic(src,dst,t_size):
    try:
        if os.path.isfile(src):
            src_pic = Image.open(src)
            src_pic.resize(t_size, Image.ANTIALIAS).save(dst)
            return True
        else:
            return False
    except:
        traceback.print_exc()
        return False