# -* - coding: utf - 8 -* -
import datetime
import random
import urllib.request

import qrcode
from PIL import Image

from ilg2020 import settings


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
        herdimg="/home/msh/PycharmProjects/gitlab/intelligent/ilgapps/static/image/logo_img.png"
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
        uploadedFileName = str("QRCode" + datetime.datetime.now().strftime("%Y%m%d%H%M%S") + str(random.randrange(0, 100))+'.png')
        destination = str(settings.MEDIA_ROOT + "QRCode/" + uploadedFileName)
        img.save(destination,'JPEG')
        return uploadedFileName


if __name__=="__main__":
    url = "https://qr.alipay.com/bax07392dswogpqschwk8008"
    codeEm = CreateQrCode(url,None)
    img = codeEm.imgCode()